import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export const TransactionFormNoCategories = () => (
  <View style={[styles.flex1, styles.alignCenter, styles.justifyCenter]}>
    <Text>Please add a category first.</Text>
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
