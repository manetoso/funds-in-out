import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export const TransactionFormError = () => (
  <View style={[styles.flex1, styles.alignCenter, styles.justifyCenter]}>
    <Text>Failed to load categories, try again later.</Text>
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
