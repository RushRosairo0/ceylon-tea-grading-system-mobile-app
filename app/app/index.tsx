import { StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
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

  return (
    <ThemedView style={styles.container}>
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
        Your smart tea assistant. Assess leaves with images and sensory inputs
        for top quality.
      </ThemedText>

      {/* continue button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/next")}
      >
        <ThemedText type="link" style={styles.buttonText}>
          Continue
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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

  // continue button
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});
