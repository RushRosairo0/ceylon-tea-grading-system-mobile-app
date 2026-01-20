import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Asset } from "expo-asset";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState, useEffect } from "react";
import { userLogin } from "@/services/user/userLogin";
import { useAuth } from "@/context/auth-context";

export default function LoginScreen() {
  const router = useRouter();
  const { email: emailParam, message } = useLocalSearchParams<{
    email?: string;
    message?: string;
  }>();

  const [email, setEmail] = useState(emailParam ?? "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  // pre-load the show/hide icons
  useEffect(() => {
    Asset.loadAsync([
      require("@/assets/icons/show.png"),
      require("@/assets/icons/hide.png"),
    ]);
  }, []);

  // check for user email
  useEffect(() => {
    if (emailParam && typeof emailParam === "string") {
      setEmail(emailParam);
    }
  }, [emailParam]);

  // check for messages
  useEffect(() => {
    if (message) {
      Alert.alert(message, undefined, [{ text: "OK" }]);

      // remove the message by re-rendering
      router.replace("/login");
    }
  }, [message, router]);

  // handle user login
  const handleLogin = async () => {
    if (isDisabled) return;

    try {
      const data = await userLogin(email, password);

      // store user details in the session
      await login(data.token || "", data.user);

      // go to main app
      router.replace("/(tabs)");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // disable login button if email or password is empty
  const isDisabled =
    email.trim() === "" || password.trim() === "" || password.length < 6;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView style={styles.container}>
        {/* back button */}
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
            placeholderTextColor="#374151"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* password */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#374151"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Image
                source={
                  showPassword
                    ? require("@/assets/icons/hide.png")
                    : require("@/assets/icons/show.png")
                }
                style={styles.eyeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
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

        {/* go to register */}
        <TouchableOpacity onPress={() => router.replace("/register")}>
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

  // go back
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

  // title and description
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#000000",
  },

  // input fields
  inputContainer: {
    marginBottom: 10,
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

  // login button
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

  // go to register
  registerText: {
    color: "#4CAF50",
    textAlign: "center",
    fontSize: 16,
  },

  // password field
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeButton: {
    padding: 6,
  },
  eyeIcon: {
    width: 22,
    height: 22,
  },
});
