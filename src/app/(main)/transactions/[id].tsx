import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Button, FAB, Text } from "react-native-paper";
import { useForm, SubmitHandler } from "react-hook-form";
import { parseISO } from "date-fns";

import { useFetchCategories } from "@/src/features/categories/hooks/useFetchCategories";
import { useMutateTransactions } from "@/src/features/transactions/hooks";
import { MapTransactionFormToAPI } from "@/src/features/transactions/utils/map-transaction-form-to-api";
import {
  ControlDateInput,
  ControlSelectInput,
  ControlTextInput,
  Switch,
} from "@/src/common/components";
import {
  TransactionFormError,
  TransactionFormNoCategories,
  TransactionLoader,
} from "@/src/features/transactions/components";
import { TransactionType } from "@/src/api/resources/transactions/types/types";
import { type TransactionFormValues } from "@/src/features/transactions/types/transaction-form-values";
import { useSnackbarStore } from "@/src/stores/useSnackbarStore";
import { useCategoryStore } from "@/src/stores";

type SingleTransactionScreenParams = {
  id?: string;
  queryAmount?: string;
  queryCategory?: string;
  queryDate?: string;
  queryDescription?: string;
  queryType?: string;
};

const TRNSACTION_TYPES = [
  {
    id: TransactionType.Expense,
    name: TransactionType.Expense.charAt(0).toUpperCase() + TransactionType.Expense.slice(1),
  },
  {
    id: TransactionType.Income,
    name: TransactionType.Income.charAt(0).toUpperCase() + TransactionType.Income.slice(1),
  },
];

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
        contentContainerStyle={[
          styles.padding32,
          styles.gap16,
          isLoadingCategories && styles.flexGrow1,
        ]}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always">
        <Text variant="headlineMedium">Transaction Info</Text>

        <Switch>
          <Switch.Case condition={isLoadingCategories}>
            <TransactionLoader />
          </Switch.Case>
          <Switch.Case condition={isErrorCategories}>
            <TransactionFormError />
          </Switch.Case>
          <Switch.Case condition={typeof categories === "undefined"}>
            <TransactionFormNoCategories />
          </Switch.Case>
          <Switch.Default>
            <ControlTextInput<TransactionFormValues>
              control={control}
              disabled={isAnyMutationLoading}
              error={!!errors.amount}
              keyboardType="numeric"
              label="Amount"
              name="amount"
              placeholder="150"
              required
            />
            <ControlTextInput<TransactionFormValues>
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
            <ControlDateInput<TransactionFormValues>
              control={control}
              disabled={isAnyMutationLoading}
              error={!!errors.date}
              label="Date"
              name="date"
              required
            />
            <ControlTextInput<TransactionFormValues>
              control={control}
              disabled={isAnyMutationLoading}
              error={!!errors.description}
              label="Source"
              multiline
              name="description"
              placeholder="Lunch"
              required
            />
            <ControlSelectInput<TransactionFormValues>
              control={control}
              data={TRNSACTION_TYPES}
              disabled={isAnyMutationLoading}
              error={!!errors.type}
              label="Tag"
              name="type"
              required
            />
            <Button
              loading={isLoadingCategories || isAnyMutationLoading}
              disabled={isLoadingCategories || isAnyMutationLoading}
              onPress={handleSubmit(handleFormSubmit)}
              mode="contained">
              {transactionId !== 0 ? "Update" : "Add"}
            </Button>
          </Switch.Default>
        </Switch>
      </ScrollView>

      {transactionId !== 0 &&
        !isLoadingCategories &&
        !isErrorCategories &&
        typeof categories !== "undefined" && (
          <FAB
            icon="delete"
            size="small"
            style={styles.fab}
            onPress={handleDelete}
            loading={isAnyMutationLoading}
            disabled={isAnyMutationLoading}
          />
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
