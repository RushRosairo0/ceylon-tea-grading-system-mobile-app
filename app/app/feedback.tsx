import { ThemedText } from "@/components/themed-text";
import { useAuth } from "@/context/auth-context";
import { saveFeedback } from "@/services/feedback/saveFeedback";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// dropdown options
const GRADES = ["OP", "OP1", "OPA"];

export default function FeedbackScreen() {
  const router = useRouter();
  const { token } = useAuth();

  const { data: dataParam, message } = useLocalSearchParams<{
    data?: string;
    message?: string;
  }>();
  const feedbackData = dataParam ? JSON.parse(dataParam) : null;

  const [agree, setAgree] = useState<boolean>(true);
  const [grade, setGrade] = useState<string>(feedbackData?.grade || GRADES[0]);
  const [comment, setComment] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // check for messages
  useEffect(() => {
    if (message) {
      Alert.alert(message, undefined, [{ text: "OK" }]);
    }
  }, [message, router]);

  // handle cancel button click
  const handleCancel = async () => {
    router.replace("/(tabs)");
  };

  // save feedback
  const handleSaveFeedback = async () => {
    if (!feedbackData) {
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
      const feedbackResult: any = await saveFeedback(
        token,
        feedbackData.predictionId,
        agree,
        grade,
        comment,
        feedbackData.aroma,
        feedbackData.color,
        feedbackData.taste,
        feedbackData.afterTaste,
        feedbackData.acceptability,
      );

      // go to home page
      router.replace({
        pathname: "/(tabs)",
        params: {
          message: "Feedback have been saved successfully!",
        },
      });
    } catch (error: any) {
      setError(error.message || "Failed to save feedback");
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
        <ThemedText style={styles.loadingText}>Saving feedback...</ThemedText>
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

        {/* feedback frame */}
        <View style={styles.feedbackSection}>
          <View style={styles.feedbackFrame}>
            {/* prediction info */}
            <View style={styles.predictionSection}>
              <ThemedText style={styles.resultText}>
                {feedbackData.grade} (category {feedbackData.category})
              </ThemedText>
            </View>

            {/* feedback section */}
            <View style={styles.inputSection}>
              {/* agreement */}
              <ThemedText style={styles.inputLabel}>
                Do you agree with the result?
              </ThemedText>
              <View style={styles.agreementButtonRow}>
                {/* no */}
                <TouchableOpacity
                  style={[
                    styles.agreementButton,
                    agree === false && styles.disagreeSelected,
                  ]}
                  onPress={() => setAgree(false)}
                >
                  <ThemedText
                    style={
                      agree === true
                        ? styles.buttonText
                        : styles.buttonActiveText
                    }
                  >
                    No
                  </ThemedText>
                </TouchableOpacity>

                {/* yes */}
                <TouchableOpacity
                  style={[
                    styles.agreementButton,
                    agree === true && styles.agreeSelected,
                  ]}
                  onPress={() => setAgree(true)}
                >
                  <ThemedText
                    style={
                      agree === true
                        ? styles.buttonActiveText
                        : styles.buttonText
                    }
                  >
                    Yes
                  </ThemedText>
                </TouchableOpacity>
              </View>

              {/* grade selection */}
              <ThemedText style={styles.inputLabel}>
                Give a grade based on your taste
              </ThemedText>

              {/*  current grade */}
              <TouchableOpacity
                style={styles.gradeButton}
                onPress={() => setDropdownVisible(true)}
              >
                <ThemedText style={styles.gradeText}>{grade}</ThemedText>
              </TouchableOpacity>

              {/* grade selection modal */}
              <Modal
                visible={dropdownVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setDropdownVisible(false)}
              >
                <TouchableWithoutFeedback
                  onPress={() => setDropdownVisible(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      {/* modal selection */}
                      <FlatList
                        data={GRADES}
                        keyExtractor={(item) => item}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            style={[
                              styles.modalItem,
                              index === GRADES.length - 1 && {
                                borderBottomWidth: 0,
                              }, // remove bottom border for last item
                            ]}
                            onPress={() => {
                              setGrade(item);
                              setDropdownVisible(false);
                            }}
                          >
                            <ThemedText style={styles.gradeText}>
                              {item}
                            </ThemedText>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>

              {/* comment */}
              <ThemedText style={styles.inputLabel}>
                Share your thoughts (optional)
              </ThemedText>
              <TextInput
                style={styles.commentInput}
                placeholder="Comment"
                value={comment}
                onChangeText={setComment}
                multiline
              />
            </View>

            {/* buttons */}
            <View style={styles.buttonRow}>
              {/* cancel */}
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <ThemedText style={styles.cancelText}>Cancel</ThemedText>
              </TouchableOpacity>

              {/* confirm */}
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveFeedback}
              >
                <ThemedText style={styles.saveText}>Save Feedback</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* instructions section */}
        <View style={styles.instructionsSection}>
          {/* step */}
          <ThemedText style={styles.step}>STEP 05</ThemedText>

          {/* guide */}
          <ThemedText style={styles.text}>
            We’d love to hear your feedback on this result.
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

  // feedback display
  feedbackSection: {
    flex: 7,
    justifyContent: "center",
  },
  feedbackFrame: {
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

  // prediction info
  predictionSection: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  resultText: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 31,
    color: "#333333",
    marginBottom: 3,
  },

  // inputs
  inputSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputLabel: {
    color: "#000000",
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "500",
  },
  agreementButtonRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },

  // agreement button
  buttonText: {
    fontSize: 14,
    color: "#374151",
  },
  buttonActiveText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  agreementButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#374151",
  },
  agreeSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  disagreeSelected: {
    backgroundColor: "#FF3B30",
    borderColor: "#E53935",
  },

  // grade selection
  gradeButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 8,
    width: 120,
    alignItems: "center",
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: 200,
    maxHeight: 200,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  gradeText: {
    color: "#000000",
  },

  // comment
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
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

  // cancel
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  cancelText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  // save
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  saveText: {
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
