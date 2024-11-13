import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Button, ButtonProps, Icon } from "@ui-kitten/components";

type FABProps = ButtonProps & {
  onPress: () => void;
  icon?: string;
  containerStyle?: StyleProp<ViewStyle>;
  status?: "primary" | "success" | "info" | "warning" | "danger" | "basic";
  style?: StyleProp<ViewStyle>;
};

export const FAB = ({
  containerStyle,
  onPress,
  icon = "plus",
  status = "primary",
  style,
  ...props
}: FABProps) => (
  <View style={[styles.fabContainer, containerStyle]}>
    <Button
      accessoryLeft={props => <Icon {...props} name={icon} />}
      onPress={onPress}
      status={status}
      style={[styles.fab, style]}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab: {
    borderRadius: 50,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 50,
  },
});
