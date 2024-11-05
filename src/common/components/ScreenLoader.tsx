import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const ScreenLoader = () => (
  <View style={[styles.flex1, styles.alignCenter, styles.justifyCenter]}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  alignCenter: {
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
});
