import { useState } from "react";
import { Keyboard, View } from "react-native";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Chip, Divider, Menu, Text, TextInput, TextInputProps, useTheme } from "react-native-paper";

type ControlSelectInputProps<T extends FieldValues> = TextInputProps & {
  control: Control<T, any>;
  data: {
    id: number | string;
    name: string;
  }[];
  error: boolean;
  label: string;
  multiline?: boolean;
  name: keyof T;
  placeholder?: string;
  required?: boolean;
};

export function ControlSelectInput<T extends FieldValues>({
  control,
  data,
  error,
  label,
  name,
  placeholder,
  multiline = false,
  required = false,
  ...props
}: ControlSelectInputProps<T>) {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
    Keyboard.dismiss();
  };
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Menu
            visible={isMenuOpen}
            onDismiss={closeMenu}
            anchor={
              <TextInput
                error={error}
                label={label}
                multiline={multiline}
                onBlur={onBlur}
                onFocus={openMenu}
                placeholder={placeholder}
                value={value}
                {...props}
              />
            }>
            <Chip onPress={closeMenu}>{value}</Chip>
            <Divider />
            {data.map(record => (
              <Menu.Item
                key={record.id}
                onPress={() => {
                  closeMenu();
                  onChange(record.name);
                }}
                title={record.name}
                dense
              />
            ))}
          </Menu>
        )}
        name={name as Path<T>}
      />
      {error && (
        <Text variant="labelSmall" style={{ color: theme.colors.error }}>
          This field cannot be empty.
        </Text>
      )}
    </View>
  );
}
