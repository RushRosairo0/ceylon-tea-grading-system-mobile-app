import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomePage() {
  const router = useRouter();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // infinite up-down animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -15, // move up by 10px
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0, // move back down
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // pre-load the tea bag image
  useEffect(() => {
    Asset.loadAsync([require("@/assets/images/tea-bag.png")]);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* top image with animation */}
        <Animated.Image
          source={require("@/assets/images/tea-bag.png")}
          style={[styles.image, { transform: [{ translateY: bounceAnim }] }]}
          resizeMode="contain"
        />

        {/* title */}
        <ThemedText type="title" style={styles.title}>
          LeafMetric
        </ThemedText>

        {/* description */}
        <ThemedText type="subtitle" style={styles.subtitle}>
          An AI-powered tea grading and prediction app that analyzes tea based
          on images and manual sensory inputs, predicts quality, and helps
          optimize production.
        </ThemedText>

        {/* hr */}
        <View style={styles.hr} />

        {/* steps */}
        <View style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            How to Use
          </ThemedText>

          {/* step 01 */}
          <View style={styles.step}>
            <ThemedText type="subtitle" style={styles.stepNumber}>
              1.
            </ThemedText>
            <ThemedText type="subtitle" style={styles.stepText}>
              Register or log in to your account.
            </ThemedText>
          </View>

          {/* step 02 */}
          <View style={styles.step}>
            <ThemedText type="subtitle" style={styles.stepNumber}>
              2.
            </ThemedText>
            <ThemedText type="subtitle" style={styles.stepText}>
              Upload a photo of the processed tea leaves.
            </ThemedText>
          </View>

          {/* step 03 */}
          <View style={styles.step}>
            <ThemedText type="subtitle" style={styles.stepNumber}>
              3.
            </ThemedText>
            <ThemedText type="subtitle" style={styles.stepText}>
              Manually enter sensory evaluation data for color, aroma, taste,
              aftertaste, and overall acceptability based on your assessment.
            </ThemedText>
          </View>

          {/* step 04 */}
          <View style={styles.step}>
            <ThemedText type="subtitle" style={styles.stepNumber}>
              4.
            </ThemedText>
            <ThemedText type="subtitle" style={styles.stepText}>
              Get AI-based grading and prediction results for your tea sample.
            </ThemedText>
          </View>

          {/* step 05 */}
          <View style={styles.step}>
            <ThemedText type="subtitle" style={styles.stepNumber}>
              5.
            </ThemedText>
            <ThemedText type="subtitle" style={styles.stepText}>
              Review the results and optionally provide feedback.
            </ThemedText>
          </View>

          {/* step 06 */}
          <View style={styles.step}>
            <ThemedText type="subtitle" style={styles.stepNumber}>
              6.
            </ThemedText>
            <ThemedText type="subtitle" style={styles.stepText}>
              Download a detailed report for your records.
            </ThemedText>
          </View>

          {/* analyze button */}
          <TouchableOpacity
            style={[styles.button, styles.analyzeButton]}
            // onPress={() => router.push("/login")}
          >
            <ThemedText type="link" style={styles.buttonText}>
              Analyze Now
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* hr */}
        <View style={styles.hr} />

        {/* credits */}
        <View style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Credits
          </ThemedText>

          {/* Rushmi */}
          <ThemedText type="subtitle" style={styles.creditName}>
            H. R. T. Rosairo (UWU/IIT/21/033)
          </ThemedText>
          <View style={styles.creditList}>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Backend API development
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - AI model integration
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Database design and management
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Server-side logic and validation
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - API documentation
            </ThemedText>
          </View>

          {/* Akeesha */}
          <ThemedText type="subtitle" style={styles.creditName}>
            W. G. A. M. Widanage (UWU/IIT/21/101)
          </ThemedText>
          <View style={styles.creditList}>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Mobile app development
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - UI/UX design and improvements
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - App navigation and routing
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Frontend state management
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Integrating APIs with mobile app
            </ThemedText>
          </View>

          {/* Nimesha */}
          <ThemedText type="subtitle" style={styles.creditName}>
            G. A. N. Kumari (UWU/IIT/21/077)
          </ThemedText>
          <View style={styles.creditList}>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Data preprocessing for AI training
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Training AI prediction models
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Creating AI prediction pipeline
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Model evaluation and testing
            </ThemedText>
            <ThemedText type="subtitle" style={styles.creditItem}>
              - Performance optimization of AI model
            </ThemedText>
          </View>
        </View>

        {/* hr */}
        <View style={styles.hr} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 100,
  },

  // image
  image: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },

  // title and description
  title: {
    color: "#000000",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#555555",
    marginBottom: 40,
  },

  // horizontal line
  hr: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 30,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },

  // sections
  section: {
    marginBottom: 24,
    width: "100%",
    maxWidth: 500,
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },

  // steps
  step: {
    flexDirection: "row",
    marginBottom: 8,
  },
  stepNumber: {
    color: "#555555",
    fontWeight: "semibold",
    marginRight: 8,
  },
  stepText: {
    color: "#555555",
    fontWeight: "semibold",
    flex: 1,
  },

  // button
  button: {
    marginTop: 10,
    width: 200,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  analyzeButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },

  // credit
  creditName: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
    textAlign: "left",
  },
  creditList: {
    paddingLeft: 16,
    marginBottom: 12,
  },
  creditItem: {
    fontSize: 16,
    marginBottom: 2,
    color: "#555555",
    fontWeight: "semibold",
  },
});
