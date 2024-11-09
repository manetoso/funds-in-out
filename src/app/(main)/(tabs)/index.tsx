import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import { useDashboardStore } from "@/src/stores";
import { useFetchTransactionTotal, useFetchTransactions } from "@/src/features/transactions/hooks";
import { MonthAccordion, MonthSelector } from "@/src/features/home/components/months-grid";
import { MonthTotal } from "@/src/features/home/components/month-totals";
import { TransactionsTable } from "@/src/features/transactions/components";
import { TransactionType } from "@/src/api/resources/transactions/types/types";

export default function HomeScreen() {
  const { selectedMonth } = useDashboardStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    expenseData,
    expenseIsLoading,
    incomeData,
    incomeIsLoading,
    refetchExpense,
    refetchIncome,
  } = useFetchTransactions(selectedMonth);
  const {
    data: tansactionsTotals,
    isFetching: isLoadingTansactionsTotals,
    isError: isErrorTansactionsTotals,
    refetch: refetchTansactionsTotals,
  } = useFetchTransactionTotal(selectedMonth);

  const handleRefreshControl = async () => {
    setIsRefreshing(true);
    await refetchTansactionsTotals();
    await refetchExpense();
    await refetchIncome();
    setIsRefreshing(false);
  };
  return (
    <ScrollView
      contentContainerStyle={[styles.padding32, styles.gap16, styles.mT20]}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefreshControl} />
      }>
      <MonthSelector />
      <MonthTotal
        isError={isErrorTansactionsTotals}
        isLoading={isLoadingTansactionsTotals}
        totals={tansactionsTotals}
      />
      <MonthAccordion
        selectedMonth={selectedMonth}
        title="Income"
        totalRecords={incomeIsLoading ? undefined : (incomeData?.length ?? 0)}>
        <TransactionsTable
          isLoading={incomeIsLoading}
          transactions={incomeData}
          type={TransactionType.Income}
        />
      </MonthAccordion>
      <MonthAccordion
        selectedMonth={selectedMonth}
        title="Expenses"
        totalRecords={expenseIsLoading ? undefined : (expenseData?.length ?? 0)}>
        <TransactionsTable
          isLoading={expenseIsLoading}
          transactions={expenseData}
          type={TransactionType.Expense}
        />
      </MonthAccordion>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  padding32: {
    padding: 32,
  },
  gap16: {
    gap: 16,
  },
  mT20: {
    marginTop: 20,
  },
});
