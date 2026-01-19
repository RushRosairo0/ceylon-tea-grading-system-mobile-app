import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: add login logic
    console.log("Logging in with", email, password);
    // router.replace("/(tabs)/home") // navigate to main app on success
  };

  // disable login button if email or password is empty
  const isDisabled = email.trim() === "" || password.trim() === "";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView style={styles.container}>
        {/* Go Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()} // go to previous screen
        >
          <ThemedText type="subtitle" style={styles.backButtonText}>
            ← Back
          </ThemedText>
        </TouchableOpacity>

        {/* title */}
        <ThemedText type="title" style={styles.title}>
          Log In
        </ThemedText>

        {/* input fields */}
        <View style={styles.inputContainer}>
          {/* email */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* password */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* login button */}
        <TouchableOpacity
          style={[styles.loginButton, isDisabled && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isDisabled} // disables touch
        >
          <ThemedText type="link" style={styles.loginButtonText}>
            Log In
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
        //   onPress={() => router.push("/register")}
        >
          <ThemedText type="subtitle" style={styles.registerText}>
            Don’t have an account? Register
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 20,
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: "#2196F3",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#555555",
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  registerText: {
    color: "#2196F3",
    textAlign: "center",
    fontSize: 16,
  },
});
