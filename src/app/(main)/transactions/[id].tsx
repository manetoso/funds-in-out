import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Button, Text } from "react-native-paper";
import { useForm, SubmitHandler } from "react-hook-form";

import { ControlDateInput, ControlSelectInput, ControlTextInput } from "@/src/common/components";
import { useFetchCategories } from "@/src/features/categories/hooks/useFetchCategories";
import { useAddTransactions } from "@/src/features/transactions/hooks/useAddTransactions";
import { TransactionType, type AddTransaction } from "@/src/api/resources/transactions/types/types";
import { TransactionLoader } from "@/src/features/transactions/components/TransactionLoader";

type TransactionFormValues = Omit<AddTransaction, "categoryId" | "type" | "date"> & {
  category: string;
  date: Date;
  type: string;
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
  const { categories, isLoadingCategories } = useFetchCategories();
  const { addTrnsactionMutation } = useAddTransactions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    defaultValues: {
      category: "",
      description: "",
      type: "",
    },
  });

  const onSubmit: SubmitHandler<TransactionFormValues> = data => {
    addTrnsactionMutation.mutate({
      amount: Number(data.amount),
      categoryId: categories!.find(category => category.name === data.category)!.id,
      date: data.date.toISOString().split("T")[0],
      description: data.description,
      type: data.type.toLowerCase() as TransactionType,
    });
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
          Submit
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
