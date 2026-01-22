import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams } from "expo-router";
import {
  Keyboard,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import { config } from "@/config/config";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = width * 0.75;

export default function ResultScreen() {
  const { data: dataParam } = useLocalSearchParams<{ data?: string }>();
  const result = dataParam ? JSON.parse(dataParam) : null;

  console.log(result);

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

                {/* quality */}
                <ThemedText style={styles.resultText}>
                  Quality: {result.quality}{" "}
                  <ThemedText style={styles.confidenceText}>
                    ({(result.qualityConfidence * 100).toFixed(1)}%)
                  </ThemedText>
                </ThemedText>
              </View>
            )}

            {/* buttons */}
            <View style={styles.buttonRow}>
              {/* feedback */}
              <TouchableOpacity
                style={[styles.button, styles.feedbackButton]}
                // onPress={resetSensoryInputs}
              >
                <ThemedText style={styles.feedbackText}>
                  Provide Feedback
                </ThemedText>
              </TouchableOpacity>

              {/* ok */}
              <TouchableOpacity
                style={[styles.button, styles.okButton]}
                // onPress={submitSensoryInput}
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

        {/* bottom gap */}
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
    lineHeight: 31,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 3,
  },
  confidenceText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#4CAF50",
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

  // ok
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
});
