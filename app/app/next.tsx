import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function NextScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      {/* title */}
      <ThemedText type="title" style={styles.title}>
        Welcome to LeafMetric!
      </ThemedText>

      {/* description */}
      <ThemedText type="subtitle" style={styles.subtitle}>
        Are you already registered with us, or a new user?
      </ThemedText>

      {/* buttons */}
      <View style={styles.buttonContainer}>
        {/* login button */}
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => router.push("/login")}
        >
          <ThemedText type="link" style={styles.buttonText}>
            Log In
          </ThemedText>
        </TouchableOpacity>

        {/* register button */}
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          //   onPress={() => router.push("/register")}
        >
          <ThemedText type="link" style={styles.buttonText}>
            Register
          </ThemedText>
        </TouchableOpacity>
      </View>
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
    marginBottom: 30,
  },

  // buttons
  buttonContainer: {
    flexDirection: "column",
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
  },
  registerButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});
