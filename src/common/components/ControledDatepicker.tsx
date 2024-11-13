import { View } from "react-native";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Text, Datepicker, Icon, type DatepickerProps } from "@ui-kitten/components";
import { ReactElement } from "react";

type ControledDatepickerProps<T extends FieldValues> = DatepickerProps & {
  control: Control<T, any>;
  error: boolean;
  label: string;
  name: keyof T;
  placeholder?: string;
  required?: boolean;
};

export function ControledDatepicker<T extends FieldValues>({
  control,
  error,
  label,
  name,
  placeholder,
  required = false,
  ...props
}: ControledDatepickerProps<T>) {
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
          <Datepicker
            accessoryRight={props => <Icon {...props} name="calendar" />}
            caption={renderCaption}
            date={value}
            label={label}
            onBlur={onBlur}
            onSelect={onChange}
            placeholder={placeholder}
            status={error ? "danger" : "basic"}
            {...props}
          />
        )}
      />
    </View>
  );
}
