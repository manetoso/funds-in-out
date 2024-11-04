import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { View } from "react-native";
import { Text, TextInput, TextInputProps, useTheme } from "react-native-paper";

type ControlTextInputProps<T extends FieldValues> = TextInputProps & {
  control: Control<T, any>;
  error: boolean;
  label: string;
  name: keyof T;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
};

export function ControlTextInput<T extends FieldValues>({
  control,
  error,
  label,
  name,
  placeholder,
  multiline = false,
  required = false,
  ...props
}: ControlTextInputProps<T>) {
  const theme = useTheme();

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            error={error}
            label={label}
            multiline={multiline}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={placeholder}
            value={value}
            {...props}
          />
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
