import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function ImagePreviewPage() {
  const router = useRouter();
  const { uri } = useLocalSearchParams<{ uri: string }>();

  // go to camera
  const retakeImage = async () => {
    router.back();
  };

  // if no photo found
  if (!uri) {
    return <ThemedText>No image to preview</ThemedText>;
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
              onPress={() => router.back()}
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
          Retake or upload the captured image to continue
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
  topSpacer: { flex: 1 },
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
});
