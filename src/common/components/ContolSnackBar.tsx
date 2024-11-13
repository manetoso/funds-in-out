import { useSnackbarStore } from "@/src/stores/useSnackbarStore";
import { Layout, Text } from "@ui-kitten/components";
import { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export const ContolSnackBar = () => {
  const { isOpen, message } = useSnackbarStore();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.75);

  useEffect(() => {
    if (isOpen) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withTiming(1, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      scale.value = withTiming(0.75, { duration: 300 });
    }
  }, [isOpen, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: "100%",
          paddingHorizontal: 16,
          bottom: 24,
        },
        animatedStyle,
      ]}>
      <Layout
        level="2"
        style={{
          alignItems: "center",
          borderColor: "#ececec",
          borderRadius: 8,
          borderWidth: 1,
          flexDirection: "row",
          gap: 8,
          padding: 8,
          width: "100%",
        }}>
        <Text category="s1">{message}</Text>
      </Layout>
    </Animated.View>
  );
};
