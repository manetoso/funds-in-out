import { useEffect } from "react";
import { Platform } from "react-native";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import "react-native-reanimated";

import { ContolSnackBar } from "@/src/common/components/ContolSnackBar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
registerTranslation("en-GB", enGB);

/*
  TODO LIST:
  - Use BottomNavigation from react-native-paper
  - Use Appbar from react-native-paper
*/

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DefaultTheme}>
        <PaperProvider>
          <Stack>
            <Stack.Screen name="(main)/(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(main)/transactions/[id]"
              options={{
                title: "Transaction",
                headerBackTitle: "Back",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <ContolSnackBar />
        </PaperProvider>
      </ThemeProvider>
      {Platform.OS === "web" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
