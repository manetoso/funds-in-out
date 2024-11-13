import { ReactElement, useState } from "react";
import { View } from "react-native";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { IndexPath, Select, SelectItem, SelectProps, Text } from "@ui-kitten/components";

type ControledSelectProps<T extends FieldValues> = SelectProps & {
  control: Control<T, any>;
  data: string[];
  error: boolean;
  label: string;
  name: keyof T;
  placeholder?: string;
  required?: boolean;
};

export function ControledSelect<T extends FieldValues>({
  control,
  data,
  error,
  label,
  name,
  placeholder,
  required = false,
  ...props
}: ControledSelectProps<T>) {
  const { field } = useController({ name: name as Path<T>, control });
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(data.indexOf(field.value)),
  );

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
          <Select
            label={label}
            caption={renderCaption}
            selectedIndex={selectedIndex}
            status={error ? "danger" : "basic"}
            onBlur={onBlur}
            onSelect={index => {
              setSelectedIndex(index as IndexPath);
              onChange(data[(index as IndexPath).row]);
            }}
            value={value}
            {...props}>
            {data.map(element => (
              <SelectItem key={element} title={element} />
            ))}
          </Select>
        )}
      />
    </View>
  );
}
