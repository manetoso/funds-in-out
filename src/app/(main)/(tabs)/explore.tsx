import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

export default function TabTwoScreen() {
  return (
    <Layout level="1" style={[styles.padding24, styles.gap16, styles.mT20, styles.flex1]}>
      <Text category="h1">Explore</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  padding24: {
    padding: 24,
  },
  gap16: {
    gap: 16,
  },
  mT20: {
    marginTop: 20,
  },
  flex1: {
    flex: 1,
  },
});
