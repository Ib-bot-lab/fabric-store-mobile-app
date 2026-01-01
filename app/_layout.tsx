import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { RecipesProvider } from "./src/context/RecipesContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Add your custom fonts here if needed
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <RecipesProvider>
            <StatusBar style="auto" />
            <AppNavigator />
          </RecipesProvider>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
