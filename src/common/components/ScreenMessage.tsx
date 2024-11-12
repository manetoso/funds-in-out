import { View } from "react-native";
import { Text } from "@ui-kitten/components";

type ScreenMessageProps = {
  message: string;
};

export const ScreenMessage = ({ message }: ScreenMessageProps) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="label">{message}</Text>
  </View>
);
