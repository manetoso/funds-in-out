import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { View } from "react-native";
import { Text, TextInputProps, useTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

type ControlDateInputProps<T extends FieldValues> = TextInputProps & {
  control: Control<T, any>;
  error: boolean;
  label: string;
  name: keyof T;
  placeholder?: string;
  required?: boolean;
};

export function ControlDateInput<T extends FieldValues>({
  control,
  error,
  label,
  name,
  placeholder,
  required = false,
  ...props
}: ControlDateInputProps<T>) {
  const theme = useTheme();

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <DatePickerInput
            hasError={!!error}
            inputMode="start"
            label={label}
            locale="en-GB"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
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
