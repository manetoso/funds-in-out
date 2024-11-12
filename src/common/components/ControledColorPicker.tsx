import { ReactElement, useState } from "react";
import { Modal, View, StyleSheet, Pressable } from "react-native";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import {
  Button,
  Divider,
  Icon,
  Input,
  type InputProps,
  useTheme,
  Text,
} from "@ui-kitten/components";
import ColorPicker, {
  HueCircular,
  Panel1,
  Preview,
  returnedResults,
} from "reanimated-color-picker";

type ControledColorPickerProps<T extends FieldValues> = InputProps & {
  control: Control<T, any>;
  error: boolean;
  label: string;
  name: keyof T;
  required?: boolean;
};

export function ControledColorPicker<T extends FieldValues>({
  control,
  error,
  label,
  name,
  placeholder,
  required = false,
  ...props
}: ControledColorPickerProps<T>) {
  const theme = useTheme();
  const { field } = useController({ name: name as Path<T>, control });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedColor = useSharedValue(field.value || theme["color-primary-500"]);
  const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: selectedColor.value }));

  const showModal = () => {
    selectedColor.value = field.value || theme["color-primary-500"];
    setTimeout(() => {
      setIsModalOpen(true);
    }, 100);
  };
  const hideModal = () => setIsModalOpen(false);

  const onColorChange = (color: returnedResults) => {
    "worklet";
    selectedColor.value = color.hex;
  };
  const onColorSelected = () => {
    field.onChange(selectedColor.value.toUpperCase());
    hideModal();
  };
  const renderCaption = (): ReactElement => {
    if (error)
      return (
        <Text category="label" status="danger">
          This field cannot be empty.
        </Text>
      );
    return <></>;
  };
  return (
    <View>
      <Controller
        control={control}
        name={name as Path<T>}
        rules={{
          required,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            accessoryRight={accessoryProps => (
              <Pressable onPress={showModal}>
                <Icon {...accessoryProps} name="color-palette" />
              </Pressable>
            )}
            caption={renderCaption}
            label={label}
            onBlur={onBlur}
            onChangeText={value => onChange(value.toUpperCase())}
            placeholder={placeholder}
            status={error ? "danger" : "basic"}
            value={value}
            {...props}
          />
        )}
      />
      <Modal onRequestClose={hideModal} visible={isModalOpen} animationType="slide">
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          <View style={styles.pickerContainer}>
            <ColorPicker
              value={selectedColor.value}
              sliderThickness={25}
              thumbSize={24}
              thumbShape="circle"
              onChange={onColorChange}
              boundedThumb>
              <Preview />
              <HueCircular containerStyle={styles.hueContainer} thumbShape="pill">
                <Panel1 style={styles.panelStyle} />
              </HueCircular>
            </ColorPicker>
            <Divider />
            <Button appearance="filled" onPress={onColorSelected}>
              Done
            </Button>
            <Button appearance="ghost" onPress={hideModal}>
              Cancel
            </Button>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  pickerContainer: {
    alignSelf: "center",
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    gap: 20,
  },
  panelStyle: {
    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: "70%",
    height: "70%",
    alignSelf: "center",
  },
  hueContainer: {
    justifyContent: "center",
  },
});
