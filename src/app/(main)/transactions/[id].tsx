import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Button, Text, Layout } from "@ui-kitten/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { parseISO } from "date-fns";

import { useCategoryStore, useSnackbarStore } from "@/src/stores";
import { useMutateTransactions } from "@/src/features/transactions/hooks";
import { useFetchCategories } from "@/src/features/categories/hooks/useFetchCategories";
import { MapTransactionFormToAPI } from "@/src/features/transactions/utils/map-transaction-form-to-api";
import {
  ControledDatepicker,
  ControledInput,
  ControledSelect,
  FAB,
  ScreenMessage,
  ScreenSpinner,
  Switch,
} from "@/src/common/components";
import { TRANSACTION_TYPES } from "@/src/common/constants";
import { type TransactionFormValues } from "@/src/features/transactions/types/transaction-form-values";

type SingleTransactionScreenParams = {
  id?: string;
  queryAmount?: string;
  queryCategory?: string;
  queryDate?: string;
  queryDescription?: string;
  queryType?: string;
};

export default function SingleTransactionScreen() {
  const { id, queryAmount, queryCategory, queryDate, queryDescription, queryType } =
    useLocalSearchParams<SingleTransactionScreenParams>();
  const navigation = useNavigation();
  const {
    data: categories,
    isError: isErrorCategories,
    isFetching: isLoadingCategories,
  } = useFetchCategories();
  const { addTransactionMutation, deleteTransactionMutation, updateTransactionMutation } =
    useMutateTransactions();
  const [isAnyMutationLoading, setIsAnyMutationLoading] = useState(false);
  const { currentCategory, setCurrentCategory } = useCategoryStore();
  const { showSnackbar } = useSnackbarStore();
  const [transactionId] = useState(Number(id));
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TransactionFormValues>({
    defaultValues: {
      category: queryCategory ?? currentCategory,
      date: queryDate ? parseISO(queryDate) : new Date(),
      description: queryDescription ?? "",
      type: queryType ? queryType.charAt(0).toUpperCase() + queryType.slice(1) : "",
      ...(queryAmount && { amount: queryAmount }),
    },
  });

  const handleFormSubmit: SubmitHandler<TransactionFormValues> = async data => {
    const dataToAPI = MapTransactionFormToAPI(data, categories!);
    if (transactionId === 0) {
      await addTransactionMutation.mutateAsync(dataToAPI);
      showSnackbar("Transaction added successfully");
    } else {
      await updateTransactionMutation.mutateAsync({ id: transactionId, data: dataToAPI });
      showSnackbar("Transaction updated successfully");
    }
    setCurrentCategory("");
    router.back();
  };

  const handleDelete = async () => {
    await deleteTransactionMutation.mutateAsync({ id: transactionId });
    showSnackbar("Transaction deleted successfully");
    setCurrentCategory("");
    router.back();
  };

  useEffect(() => {
    const isLoading =
      addTransactionMutation.isLoading ||
      deleteTransactionMutation.isLoading ||
      updateTransactionMutation.isLoading;

    setIsAnyMutationLoading(isLoading);
  }, [
    addTransactionMutation.isLoading,
    deleteTransactionMutation.isLoading,
    updateTransactionMutation.isLoading,
  ]);

  useEffect(() => {
    if (currentCategory) setValue("category", currentCategory);
  }, [currentCategory, setValue]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", e => {
      setCurrentCategory("");
    });

    return unsubscribe;
  }, [currentCategory, navigation, setCurrentCategory]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.flex1]}>
      <ScrollView
        contentContainerStyle={styles.flexGrow1}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always">
        <Layout level="1" style={{ flex: 1, padding: 24, gap: 16 }}>
          <Text category="h3">Transaction Info</Text>

          <Switch>
            <Switch.Case condition={isLoadingCategories}>
              <ScreenSpinner />
            </Switch.Case>
            <Switch.Case condition={isErrorCategories}>
              <ScreenMessage message="Failed to load categories, try again later." />
            </Switch.Case>
            <Switch.Default>
              <ControledInput<TransactionFormValues>
                control={control}
                disabled={isAnyMutationLoading}
                error={!!errors.amount}
                keyboardType="numeric"
                label="Amount"
                name="amount"
                placeholder="150"
                required
              />
              <ControledInput<TransactionFormValues>
                control={control}
                disabled={isAnyMutationLoading}
                error={!!errors.category}
                label="Category"
                name="category"
                onPress={() => {
                  router.push("/(main)/categories");
                }}
                required
              />
              <ControledDatepicker<TransactionFormValues>
                control={control}
                disabled={isAnyMutationLoading}
                error={!!errors.date}
                label="Date"
                name="date"
                required
              />
              <ControledInput<TransactionFormValues>
                control={control}
                disabled={isAnyMutationLoading}
                error={!!errors.description}
                label="Source"
                multiline
                name="description"
                placeholder="Lunch"
                required
              />
              <ControledSelect<TransactionFormValues>
                control={control}
                data={TRANSACTION_TYPES}
                disabled={isAnyMutationLoading}
                error={!!errors.type}
                label="Tag"
                name="type"
                required
              />
              <Button
                disabled={isLoadingCategories || isAnyMutationLoading}
                onPress={handleSubmit(handleFormSubmit)}>
                {transactionId !== 0 ? "Update" : "Add"}
              </Button>
            </Switch.Default>
          </Switch>
        </Layout>
      </ScrollView>

      {transactionId !== 0 &&
        !isLoadingCategories &&
        !isErrorCategories &&
        typeof categories !== "undefined" && (
          <FAB icon="trash" onPress={handleDelete} disabled={isAnyMutationLoading} />
        )}
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
});
