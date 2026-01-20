import { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Asset } from "expo-asset";
import { useFocusEffect, useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/auth-context";
import { userGet } from "@/services/user/userGet";

export default function SettingsPage() {
  const { token, user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState(authUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { logout } = useAuth();

  // pre load edit icon
  useEffect(() => {
    Asset.loadAsync([require("@/assets/icons/edit.png")]);
  }, []);

  // check if access token is expired
  useEffect(() => {
    if (error === "Authentication failed!") {
      router.replace({
        pathname: "/login",
        params: {
          message: "Please login again!",
        },
      });
    }
  }, [error, router]);

  // fetch user details when page loads
  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        // check for access token
        if (!token) {
          setError("No access token found");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        try {
          // fetch and set user
          const data = await userGet(token);

          setUser(data.user);
        } catch (error: any) {
          setError(error.message || "Failed to load user");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, [token]),
  );

  // handle logout
  const handleLogout = () => {
    // clear user context and auth context
    logout();

    // go to login
    router.replace({
      pathname: "/login",
      params: {
        message: "You have logged out successfully!",
      },
    });
  };

  // loading
  if (authLoading || loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <ThemedText style={styles.loadingText}>Uploading image...</ThemedText>
      </View>
    );
  }

  // on error
  if (error && error !== "Authentication failed!") {
    return (
      <View style={styles.centeredContainer}>
        <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
      </View>
    );
  }

  // if user not found
  if (!user)
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.subtitle}>No user found.</ThemedText>
      </ThemedView>
    );

  // get user initials
  const getInitials = (fullName: string) => {
    if (!fullName) return "?";
    const names = fullName.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  const initials = getInitials(user.name);

  return (
    <ThemedView style={styles.container}>
      {/* avatar + edit */}
      <View style={styles.avatarWrapper}>
        {/* avatar */}
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText}>{initials}</ThemedText>
        </View>

        {/* edit */}
        <View style={styles.editIconWrapper}>
          <Image
            source={require("@/assets/icons/edit.png")}
            style={styles.editIcon}
          />
        </View>
      </View>

      {/* full name + active dot */}
      <View style={styles.nameWrapper}>
        {/* name */}
        <ThemedText style={styles.name}>{user.name}</ThemedText>

        {/* dot */}
        <View style={styles.activeDot} />
      </View>

      {/* email */}
      <View>
        <ThemedText style={styles.detail}>{user.email}</ThemedText>
      </View>

      {/* experience */}
      <View>
        <ThemedText style={styles.detail}>
          {user.experience} years of experience
        </ThemedText>
      </View>

      {/* logout button */}
      <View style={styles.logoutWrapper}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleLogout()}
        >
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
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
    paddingLeft: 20,
    paddingRight: 20,
  },

  // user avatar
  avatarWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 58,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 120,
  },

  // edit icon
  editIconWrapper: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 45,
    height: 45,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  editIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  // user name
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000000",
    lineHeight: 34,
  },

  // active dot
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    marginLeft: 8,
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

  // user details
  detail: {
    fontWeight: "300",
    fontSize: 20,
    color: "#000000",
  },

  // logout button
  logoutWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
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
});
