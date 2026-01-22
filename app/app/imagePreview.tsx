import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/context/auth-context";
import { imageUpload } from "@/services/image/imageUpload";
import { useState } from "react";

export default function ImagePreviewScreen() {
  const { token } = useAuth();
  const router = useRouter();

  const { uri } = useLocalSearchParams<{ uri: string }>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // go to camera
  const retakeImage = async () => {
    router.back();
  };

  // upload image
  const uploadCapturedImage = async () => {
    // check for access token
    if (!token) {
      setError("No access token found");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await imageUpload(token, decodeURIComponent(uri));

      router.replace({
        pathname: "/sensoryInput",
        params: {
          imageId: data.image.id,
        },
      });
    } catch (error: any) {
      setError(error.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  // retry
  const tryAgain = async () => {
    router.replace("/(tabs)/camera");
  };

  // if no photo found
  if (!uri) {
    return (
      <View style={styles.centeredContainer}>
        <ThemedText>No image to preview</ThemedText>
      </View>
    );
  }

  // loading
  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <ThemedText style={styles.loadingText}>Uploading image...</ThemedText>
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
    <View style={styles.container}>
      {/* gap - top */}
      <View style={styles.topSpacer} />

      {/* image section */}
      <View style={styles.imageSection}>
        <View style={styles.imageFrame}>
          {/* image */}
          <Image
            source={{ uri: decodeURIComponent(uri) }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* image buttons */}
          <View style={styles.imageOverlay}>
            {/* retake */}
            <TouchableOpacity style={styles.sideButton} onPress={retakeImage}>
              <IconSymbol name="arrow.uturn.left" size={22} color="#fff" />
            </TouchableOpacity>

            {/* next */}
            <TouchableOpacity
              style={styles.sideButton}
              onPress={uploadCapturedImage}
            >
              <IconSymbol name="arrow.right" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* instructions section */}
      <View style={styles.instructionsSection}>
        {/* step */}
        <ThemedText style={styles.step}>STEP 02</ThemedText>

        {/* guide */}
        <ThemedText style={styles.text}>
          Retake or upload the captured picture to continue
        </ThemedText>
      </View>

      {/* gap - bottom */}
      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  // space bar
  topSpacer: {
    flex: 1,
  },
  bottomSpacer: {
    height: 86,
  },

  // image
  imageSection: {
    flex: 7,
    justifyContent: "center",
  },
  imageFrame: {
    marginHorizontal: 16,
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: {
    ...StyleSheet.absoluteFillObject, // fills the frame with image
  },
  imageOverlay: {
    position: "absolute",
    bottom: 24,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },

  // image buttons
  sideButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
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
