import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Text } from "react-native-paper";
import { useForm, SubmitHandler } from "react-hook-form";

import { useFetchCategories } from "@/src/features/categories/hooks/useFetchCategories";
import { useAddTransactions, useUpdateTransactions } from "@/src/features/transactions/hooks";
import { MapTransactionFormToAPI } from "@/src/features/transactions/utils/map-transaction-form-to-api";
import { ControlDateInput, ControlSelectInput, ControlTextInput } from "@/src/common/components";
import { TransactionLoader } from "@/src/features/transactions/components/TransactionLoader";
import { TransactionType } from "@/src/api/resources/transactions/types/types";
import { type TransactionFormValues } from "@/src/features/transactions/types/transaction-form-values";

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
  const { categories, isLoadingCategories } = useFetchCategories();
  const { addTransactionMutation } = useAddTransactions();
  const { updateTransactionMutation } = useUpdateTransactions();
  const [transactionId] = useState(Number(id));
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    defaultValues: {
      category: queryCategory ?? "",
      date: queryDate ? new Date(queryDate) : new Date(),
      description: queryDescription ?? "",
      type: queryType ? queryType.charAt(0).toUpperCase() + queryType.slice(1) : "",
      ...(queryAmount && { amount: queryAmount }),
    },
  });

  const onSubmit: SubmitHandler<TransactionFormValues> = data => {
    const dataToAPI = MapTransactionFormToAPI(data, categories!);
    if (transactionId === 0) {
      addTransactionMutation.mutate(dataToAPI);
    } else {
      updateTransactionMutation.mutate({ id: transactionId, data: dataToAPI });
    }
    router.replace("/(main)/(tabs)");
  };
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
        {/* TODO: SHOW ERROR WHEN CATEGORIES ARE UNDEFINED */}
        {isLoadingCategories || typeof categories === "undefined" ? (
          <TransactionLoader />
        ) : (
          <>
            <ControlTextInput<TransactionFormValues>
              control={control}
              error={!!errors.amount}
              keyboardType="numeric"
              label="Amount"
              name="amount"
              placeholder="150"
              required
            />
            <ControlSelectInput<TransactionFormValues>
              control={control}
              data={categories}
              error={!!errors.category}
              label="Category"
              name="category"
              required
            />
            <ControlDateInput<TransactionFormValues>
              control={control}
              error={!!errors.date}
              label="Date"
              name="date"
              required
            />
            <ControlTextInput<TransactionFormValues>
              control={control}
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
              error={!!errors.type}
              label="Tag"
              name="type"
              required
            />
          </>
        )}
        <Button loading={isLoadingCategories} onPress={handleSubmit(onSubmit)} mode="contained">
          {id ? "Update" : "Add"}
        </Button>
      </ScrollView>
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
});
