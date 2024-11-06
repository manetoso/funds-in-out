import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { List, Text } from "react-native-paper";
import { SubmitHandler, useForm } from "react-hook-form";
import ColorPicker, {
  Panel1,
  Preview,
  HueCircular,
  type returnedResults,
} from "reanimated-color-picker";

import { ControlColorPicker, ControlTextInput } from "@/src/common/components";
import { useMutateCategories } from "@/src/features/categories/hooks";
import { useCategoryStore, useSnackbarStore } from "@/src/stores";
import { type Category } from "@/src/api/resources/categories/types/types";

type CategoryDetailsScreenParams = {
  queryId?: string;
  queryName?: string;
  queryColor?: string;
};

export default function CategoryDetailsScreen() {
  const { queryId, queryName, queryColor } = useLocalSearchParams<CategoryDetailsScreenParams>();
  const { addCategoryMutation, deleteCategoryMutation, updateCategoryMutation } =
    useMutateCategories();
  const [isAnyMutationLoading, setIsAnyMutationLoading] = useState(false);
  const { currentCategory, setCurrentCategory } = useCategoryStore();
  const { showSnackbar } = useSnackbarStore();
  const [categoryId] = useState(Number(queryId));
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Category, "id">>({
    defaultValues: {
      name: queryName ?? "",
      color: queryColor ?? "",
    },
  });

  const handleFormSubmit: SubmitHandler<Omit<Category, "id">> = async ({ name, color }) => {
    if (categoryId === 0) {
      await addCategoryMutation.mutateAsync({ name, color });
      showSnackbar("Tag added successfully");
    } else {
      await updateCategoryMutation.mutateAsync({ id: categoryId, name, color });
      showSnackbar("Tag updated successfully");
    }
    setCurrentCategory("");
    router.back();
  };

  const handleDelete = async () => {
    await deleteCategoryMutation.mutateAsync({ id: categoryId });
    if (currentCategory === queryName) {
      setCurrentCategory("");
    }
    showSnackbar("Tag deleted successfully");
    router.back();
  };

  useEffect(() => {
    const isLoading =
      addCategoryMutation.isLoading ||
      deleteCategoryMutation.isLoading ||
      updateCategoryMutation.isLoading;

    setIsAnyMutationLoading(isLoading);
  }, [
    addCategoryMutation.isLoading,
    deleteCategoryMutation.isLoading,
    updateCategoryMutation.isLoading,
  ]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.flex1]}>
      <ControlTextInput<Omit<Category, "id">>
        control={control}
        error={!!errors.name}
        label="Tag Name"
        name="name"
        required
        onSubmitEditing={handleSubmit(handleFormSubmit)}
        disabled={isAnyMutationLoading}
      />
      <ControlColorPicker<Omit<Category, "id">>
        control={control}
        error={!!errors.color}
        label="Tag Color"
        name="color"
        required
        onSubmitEditing={handleSubmit(handleFormSubmit)}
        disabled={isAnyMutationLoading}
      />
      <Text variant="labelSmall">Options</Text>
      <List.Section>
        <List.Item
          title="Delete Category"
          left={props => <List.Icon {...props} icon="delete" />}
          onPress={handleDelete}
          disabled={isAnyMutationLoading}
        />
      </List.Section>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  padding32: {
    padding: 32,
  },
  gap16: {
    gap: 16,
  },
  alignCenter: {
    alignItems: "center",
  },
});
