import { useEffect } from "react";
import { Platform } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import "react-native-reanimated";

import { ContolSnackBar } from "@/src/common/components/ContolSnackBar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

/*
  TODO LIST:
  - Shift to UI Kitten
  - Simplier Home (last or month expenses)
  - Actual home as history/balance/statistics screen
    - Add graphs
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
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
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
          <Stack.Screen
            name="(main)/categories/index"
            options={{
              title: "Tags",
              headerBackTitle: "Back",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="(main)/categories/details/index"
            options={{
              title: "Tag",
              headerBackTitle: "Back",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <ContolSnackBar />
      </ApplicationProvider>
      {Platform.OS === "web" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
