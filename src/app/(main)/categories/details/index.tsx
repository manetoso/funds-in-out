import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { List, Text } from "react-native-paper";
import { SubmitHandler, useForm } from "react-hook-form";

import { ControlTextInput } from "@/src/common/components";
import { useMutateCategories } from "@/src/features/categories/hooks";
import { useCategoryStore, useSnackbarStore } from "@/src/stores";

type CategoryDetailsScreenParams = {
  queryId?: string;
  queryName?: string;
};

export default function CategoryDetailsScreen() {
  const { queryId, queryName } = useLocalSearchParams<CategoryDetailsScreenParams>();
  const { addCategoryMutation, deleteCategoryMutation, updateCategoryMutation } =
    useMutateCategories();
  const { currentCategory, setCurrentCategory } = useCategoryStore();
  const { showSnackbar } = useSnackbarStore();
  const [categoryId] = useState(Number(queryId));
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: {
      name: queryName ?? "",
    },
  });

  const handleFormSubmit: SubmitHandler<{ name: string }> = async ({ name }) => {
    if (categoryId === 0) {
      await addCategoryMutation.mutateAsync({ name });
      showSnackbar("Tag added successfully");
    } else {
      await updateCategoryMutation.mutateAsync({ id: categoryId, name });
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.flex1]}>
      <ControlTextInput<{ name: string }>
        control={control}
        error={!!errors.name}
        label="Tag Name"
        name="name"
        required
        onSubmitEditing={handleSubmit(handleFormSubmit)}
      />
      <Text variant="labelSmall">Options</Text>
      <List.Section>
        <List.Item
          title="Delete Category"
          left={props => <List.Icon {...props} icon="delete" />}
          onPress={handleDelete}
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
  justifyCenter: {
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
