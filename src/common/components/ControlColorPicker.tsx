import { useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Button, Divider, TextInput, TextInputProps } from "react-native-paper";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import ColorPicker, {
  HueCircular,
  Panel1,
  Preview,
  returnedResults,
} from "reanimated-color-picker";

type ControlColorPickerProps<T extends FieldValues> = TextInputProps & {
  control: Control<T, any>;
  error: boolean;
  label: string;
  name: keyof T;
  required?: boolean;
};

export function ControlColorPicker<T extends FieldValues>({
  control,
  error,
  label,
  name,
  placeholder,
  multiline = false,
  required = false,
  ...props
}: ControlColorPickerProps<T>) {
  const { field } = useController({ name: name as Path<T>, control });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedColor = useSharedValue(field.value || "#8B8B8B");
  const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: selectedColor.value }));

  const showModal = () => {
    selectedColor.value = field.value || "#8B8B8B";
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
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              error={error}
              label={label}
              multiline={multiline}
              onBlur={onBlur}
              onChangeText={value => onChange(value.toUpperCase())}
              placeholder={placeholder}
              value={value}
              right={<TextInput.Icon icon="palette" onPress={showModal} />}
              {...props}
            />
          </>
        )}
        name={name as Path<T>}
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
            <Button mode="contained" onPress={onColorSelected}>
              Done
            </Button>
            <Button mode="text" onPress={hideModal}>
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
