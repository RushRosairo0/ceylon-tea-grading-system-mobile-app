import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState, useEffect } from "react";
import { userRegister } from "@/services/user/userRegister";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // pre-load the show/hide icons
  useEffect(() => {
    Asset.loadAsync([
      require("@/assets/icons/show.png"),
      require("@/assets/icons/hide.png"),
    ]);
  }, []);

  // handle user register
  const handleRegister = async () => {
    if (isDisabled) return;

    try {
      const data = await userRegister(name, email, experience, password);

      if (data && data.user) {
        // alert user
        Alert.alert(
          "Registration Successful",
          "Your account has been created successfully. Please log in.",
          [
            {
              text: "OK",
              onPress: () =>
                // send user to login
                router.replace({
                  pathname: "/login",
                  params: { email },
                }),
            },
          ],
          { cancelable: false },
        );
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  // disable register button if details are empty
  const isDisabled =
    name.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    confirmPassword.trim() === "" ||
    password.length < 6 ||
    password !== confirmPassword;

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
          Register
        </ThemedText>

        {/* input fields */}
        <View style={styles.inputContainer}>
          {/* name */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#374151"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

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

          {/* experience */}
          <TextInput
            style={styles.input}
            placeholder="Years of Experience"
            placeholderTextColor="#374151"
            value={experience}
            onChangeText={setExperience}
            keyboardType="number-pad"
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

          {/* confirm password */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor="#374151"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />

            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeButton}
            >
              <Image
                source={
                  showConfirmPassword
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
          style={[
            styles.registerButton,
            isDisabled && styles.registerButtonDisabled,
          ]}
          onPress={handleRegister}
          disabled={isDisabled} // disables touch
        >
          <ThemedText type="link" style={styles.registerButtonText}>
            Register
          </ThemedText>
        </TouchableOpacity>

        {/* go to register */}
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <ThemedText type="subtitle" style={styles.registerText}>
            Already have an account? Login
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

  // register button
  registerButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonDisabled: {
    backgroundColor: "#90CAF9",
  },
  registerButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },

  // go to register
  registerText: {
    color: "#2196F3",
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
