import { View } from "react-native";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Input, Text, type InputProps } from "@ui-kitten/components";
import { ReactElement } from "react";

type ControledInputProps<T extends FieldValues> = InputProps & {
  control: Control<T, any>;
  error: boolean;
  label: string;
  name: keyof T;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
};

export function ControledInput<T extends FieldValues>({
  control,
  error,
  label,
  name,
  placeholder,
  multiline = false,
  required = false,
  ...props
}: ControledInputProps<T>) {
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
            caption={renderCaption}
            label={label}
            multiline={multiline}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={placeholder}
            status={error ? "danger" : "basic"}
            value={value}
            {...props}
          />
        )}
      />
    </View>
  );
}
