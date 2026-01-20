import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function CameraPage() {
  const router = useRouter();

  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");

  // ask permissions
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  // capture image
  const captureImage = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    goToPreview(photo.uri);
  };

  // upload image
  const uploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      await goToPreview(result.assets[0].uri);
    }
  };

  // go to next screen
  const goToPreview = async (uri: string) => {
    router.push({
      pathname: "../imagePreview",
      params: {
        uri: encodeURIComponent(uri),
      },
    });
  };

  // loading
  if (!permission) {
    return <ThemedText>Loading camera...</ThemedText>;
  }

  // if not allowed
  if (!permission.granted) {
    return <ThemedText>Camera access is required</ThemedText>;
  }

  return (
    <View style={styles.container}>
      {/* gap - top */}
      <View style={styles.topSpacer} />

      {/* camera section */}
      <View style={styles.cameraSection}>
        <View style={styles.cameraFrame}>
          {/* camera */}
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing={facing}
            flash={flash}
          />

          {/* camera buttons */}
          <View style={styles.cameraOverlay}>
            {/* open gallery */}
            <TouchableOpacity onPress={uploadImage} style={styles.sideButton}>
              <IconSymbol name="photo.fill" size={22} color="#fff" />
            </TouchableOpacity>

            {/* capture */}
            <TouchableOpacity
              onPress={captureImage}
              style={styles.captureButton}
            >
              <View style={styles.innerCircle} />
            </TouchableOpacity>

            {/* flash light */}
            <TouchableOpacity
              onPress={() =>
                setFlash((prev) => (prev === "off" ? "on" : "off"))
              }
              style={styles.sideButton}
            >
              <IconSymbol
                name={flash === "on" ? "bolt.fill" : "bolt.slash.fill"}
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* instructions section */}
      <View style={styles.instructionsSection}>
        {/* step */}
        <ThemedText style={styles.step}>STEP 01</ThemedText>

        {/* guide */}
        <ThemedText style={styles.text}>
          Capture or upload a clear picture of tea leaves
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  // top space bar
  topSpacer: {
    flex: 1,
  },

  // camera
  cameraSection: {
    flex: 7,
    justifyContent: "center",
  },
  cameraFrame: {
    marginHorizontal: 16,
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },

  // camera buttons
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ffffff",
  },
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
