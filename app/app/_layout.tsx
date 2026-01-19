import { AuthProvider } from "@/context/auth-context";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="next" />
        <Stack.Screen name="login" />
      </Stack>
    </AuthProvider>
  );
}
