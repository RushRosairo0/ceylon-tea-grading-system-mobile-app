import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { ScaleInput } from "@/components/scale-input";
import { useAuth } from "@/context/auth-context";
import { analyze } from "@/services/analyze/analyze";

export default function SensoryInputScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const { imageId: imageIdParam } = useLocalSearchParams<{
    imageId?: string;
  }>();

  const [aroma, setAroma] = useState<number | null>(null);
  const [color, setColor] = useState<number | null>(null);
  const [taste, setTaste] = useState<number | null>(null);
  const [afterTaste, setAfterTaste] = useState<number | null>(null);
  const [acceptability, setAcceptability] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [forceLoading, setForceLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // reset input fields
  const resetSensoryInputs = () => {
    setAroma(null);
    setColor(null);
    setTaste(null);
    setAfterTaste(null);
    setAcceptability(null);
  };

  const submitSensoryInput = async () => {
    if (
      aroma === null ||
      color === null ||
      taste === null ||
      afterTaste === null ||
      acceptability === null
    ) {
      return;
    }

    // check for access token
    if (!token) {
      setError("No access token found");
      setLoading(false);
      setForceLoading(false);
      return;
    }

    setLoading(true);
    setForceLoading(true);
    setError(null);

    // force loade for 4 seconds
    setTimeout(() => setForceLoading(false), 4000);

    try {
      const data = await analyze(
        token!,
        Number(imageIdParam),
        aroma!,
        color!,
        taste!,
        afterTaste!,
        acceptability!,
      );

      // go to result screen
      router.replace({
        pathname: "/result",
        params: {
          data: JSON.stringify(data.data),
        },
      });
    } catch (error: any) {
      setError(error.message || "Failed to analyze data");
    } finally {
      setLoading(false);
    }
  };

  // disable analyze button if inputs are empty
  const isAnalyzeDisabled =
    aroma === null ||
    color === null ||
    taste === null ||
    afterTaste === null ||
    acceptability === null;

  // disable reset button if all inputs are empty
  const isResetDisabled =
    aroma === null &&
    color === null &&
    taste === null &&
    afterTaste === null &&
    acceptability === null;

  // retry
  const tryAgain = async () => {
    router.replace("/(tabs)/camera");
  };

  // loading
  if (loading || forceLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <ThemedText style={styles.loadingText}>
          Evaluating your tea sample...
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

        {/* input frame */}
        <View style={styles.inputSection}>
          <View style={styles.inputFrame}>
            {/* user inputs */}
            <View style={styles.inputsContainer}>
              {/* aroma */}
              <ScaleInput
                label="Aroma Intensity"
                value={aroma}
                onChange={setAroma}
              />

              {/* color */}
              <ScaleInput
                label="Liquor Color"
                value={color}
                onChange={setColor}
              />

              {/* taste */}
              <ScaleInput
                label="Taste Quality"
                value={taste}
                onChange={setTaste}
              />

              {/* after taste */}
              <ScaleInput
                label="Aftertaste Persistence"
                value={afterTaste}
                onChange={setAfterTaste}
              />

              {/* acceptability */}
              <ScaleInput
                label="Overall Acceptability"
                value={acceptability}
                onChange={setAcceptability}
              />
            </View>

            {/* buttons */}
            <View style={styles.buttonRow}>
              {/* reset */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.resetButton,
                  isResetDisabled && styles.resetButtonDisabled,
                ]}
                onPress={resetSensoryInputs}
                disabled={isResetDisabled}
              >
                <ThemedText style={styles.resetText}>Reset</ThemedText>
              </TouchableOpacity>

              {/* analyze */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.analyzeButton,
                  isAnalyzeDisabled && styles.analyzeButtonDisabled,
                ]}
                onPress={submitSensoryInput}
                disabled={isAnalyzeDisabled}
              >
                <ThemedText style={styles.analyzeText}>Analyze</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* instructions section */}
        <View style={styles.instructionsSection}>
          {/* step */}
          <ThemedText style={styles.step}>STEP 03</ThemedText>

          {/* guide */}
          <ThemedText style={styles.text}>
            Please fill in according to your taste and perception
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

  // input
  inputSection: {
    flex: 7,
    justifyContent: "center",
  },
  inputFrame: {
    marginHorizontal: 16,
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#4CAF50",
    padding: 16,
    justifyContent: "center",
  },
  inputsContainer: {
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
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

  // reset
  resetButton: {
    backgroundColor: "#FF3B30",
  },
  resetButtonDisabled: {
    backgroundColor: "#F2A6A3",
  },
  resetText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  // analyze
  analyzeButton: {
    backgroundColor: "#4CAF50",
  },
  analyzeButtonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  analyzeText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
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
