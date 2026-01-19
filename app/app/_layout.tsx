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
        <Stack.Screen name="index" options={{ gestureEnabled: false }} />
        <Stack.Screen name="next" options={{ gestureEnabled: false }} />
        <Stack.Screen name="login" options={{ gestureEnabled: false }} />
        <Stack.Screen name="register" options={{ gestureEnabled: false }} />

        <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      </Stack>
    </AuthProvider>
  );
}
