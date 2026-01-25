import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Keyboard,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { config } from "@/config/config";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { analyzeSave } from "@/services/analyze/analyzeSave";

const { width } = Dimensions.get("window");

export default function ResultScreen() {
  const router = useRouter();
  const { token } = useAuth();

  const { data: dataParam, sensory: sensoryParam } = useLocalSearchParams<{
    data?: string;
    sensory?: string;
  }>();
  const result = dataParam ? JSON.parse(dataParam) : null;
  const sensory = sensoryParam ? JSON.parse(sensoryParam) : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // save prediction results
  const savePredictionResult = async (isSave = true) => {
    if (!result) {
      return;
    }

    // check for access token
    if (!token) {
      setError("No access token found");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const saveData: any = await analyzeSave(
        token,
        Number(result.imageId),
        result.grade,
        Number(result.gradeConfidence),
        Number(result.category),
        Number(result.categoryConfidence),
        result.model,
      );

      if (isSave) {
        // go to home screen on cancel
        router.replace({
          pathname: "/(tabs)",
          params: {
            message: "Analysis results have been saved successfully!",
          },
        });
      } else {
        // parse data to be passed to feedback screen
        const data = {
          predictionId: saveData.data.id,
          grade: saveData.data.predictedGrade,
          category: saveData.data.predictedCategory,
          aroma: sensory.aroma,
          color: sensory.color,
          taste: sensory.taste,
          afterTaste: sensory.afterTaste,
          acceptability: sensory.acceptability,
        };

        // go to feedback page
        router.replace({
          pathname: "/feedback",
          params: {
            data: JSON.stringify(data),
            message: "Analysis results have been saved successfully!",
          },
        });
      }
    } catch (error: any) {
      setError(error.message || "Failed to save analyze data");
    } finally {
      setLoading(false);
    }
  };

  // retry
  const tryAgain = async () => {
    router.replace("/(tabs)/camera");
  };

  // loading
  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <ThemedText style={styles.loadingText}>
          Saving analyzed data...
        </ThemedText>
      </View>
    );
  }

  // on error
  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
        <TouchableOpacity style={styles.retryButton} onPress={tryAgain}>
          <ThemedText style={styles.retryText}>Try Again</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* gap - top */}
        <View style={styles.topSpacer} />

        {/* result frame */}
        <View style={styles.resultSection}>
          <View style={styles.resultFrame}>
            {/* result details */}
            {result && (
              <View style={styles.resultContent}>
                {/* image */}
                <Image
                  source={{ uri: `${config.API_URL}/${result.image}` }}
                  style={styles.resultImage}
                  resizeMode="cover"
                />

                {/* grade */}
                <ThemedText style={styles.resultText}>
                  Grade: {result.grade}{" "}
                  <ThemedText style={styles.confidenceText}>
                    ({(result.gradeConfidence * 100).toFixed(1)}%)
                  </ThemedText>
                </ThemedText>

                {/* category */}
                <ThemedText style={styles.resultText}>
                  Category: {result.category}{" "}
                  <ThemedText style={styles.confidenceText}>
                    ({(result.categoryConfidence * 100).toFixed(1)}%)
                  </ThemedText>
                </ThemedText>

                {/* model version */}
                <ThemedText style={styles.modelText}>
                  Model version: {result.model}
                </ThemedText>
              </View>
            )}

            {/* buttons */}
            <View style={styles.buttonRow}>
              {/* feedback */}
              <TouchableOpacity
                style={[styles.button, styles.feedbackButton]}
                onPress={() => savePredictionResult(false)}
              >
                <ThemedText style={styles.feedbackText}>
                  Provide Feedback
                </ThemedText>
              </TouchableOpacity>

              {/* confirm */}
              <TouchableOpacity
                style={[styles.button, styles.okButton]}
                onPress={() => savePredictionResult()}
              >
                <ThemedText style={styles.okText}>Confirm</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* instructions section */}
        <View style={styles.instructionsSection}>
          {/* step */}
          <ThemedText style={styles.step}>STEP 04</ThemedText>

          {/* guide */}
          <ThemedText style={styles.text}>
            Your result is ready! Press 'Confirm' to confirm or provide
            feedback.
          </ThemedText>
        </View>

        {/* gap - bottom */}
        <View style={styles.bottomSpacer} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // space bar
  topSpacer: {
    flex: 1,
  },
  bottomSpacer: {
    height: 86,
  },

  // result display
  resultSection: {
    flex: 7,
    justifyContent: "center",
  },
  resultFrame: {
    marginHorizontal: 16,
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#4CAF50",
    padding: 16,
    justifyContent: "flex-start",
  },

  // result content
  resultContent: {
    alignItems: "center",
    marginTop: 8,
  },
  resultImage: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 12,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 31,
    color: "#333333",
    marginBottom: 3,
  },
  confidenceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  modelText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500",
    color: "#000000",
  },

  // action buttons
  buttonRow: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  // feedback
  feedbackButton: {
    backgroundColor: "#2196F3",
  },
  feedbackText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  // confirm
  okButton: {
    backgroundColor: "#4CAF50",
  },
  okText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  // instructions
  instructionsSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  step: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 8,
    letterSpacing: 1,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#555555",
  },

  // loading
  centeredContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: "#555555",
  },

  // on error
  errorText: {
    fontSize: 18,
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
