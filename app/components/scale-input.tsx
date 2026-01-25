import { View, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";

// input props
type Props = {
  label: string;
  value: number | null;
  onChange: (v: number) => void;
};

export function ScaleInput({ label, value, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      {/* field label */}
      <ThemedText style={styles.label}>{label}</ThemedText>

      {/* scale buttons */}
      <View style={styles.scaleRow}>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          // button
          <Pressable
            key={num}
            onPress={() => onChange(num)}
            style={[styles.square, value === num && styles.activeCircle]}
          >
            {/* scale number */}
            <ThemedText
              style={[styles.number, value === num && styles.activeNumber]}
            >
              {num}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },

  // label
  label: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  scaleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // option button
  square: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  activeCircle: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  number: {
    fontSize: 14,
    color: "#374151",
  },
  activeNumber: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
