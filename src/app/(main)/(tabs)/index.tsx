import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import { useAsyncStorage } from "@/src/common/hooks";
import { useFetchTransactions } from "@/src/features/transactions/hooks/useFetchTransactions";
import { MonthAccordion, MonthSelector } from "@/src/features/home/components/months-grid";
import { TransactionsTable } from "@/src/features/transactions/components";
import { Months } from "@/src/common/types/date";
import { TransactionType } from "@/src/api/resources/transactions/types/types";

export default function HomeScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(Months.January);
  const { getItem } = useAsyncStorage();
  const {
    expenseData,
    expenseIsLoading,
    incomeData,
    incomeIsLoading,
    refetchExpense,
    refetchIncome,
  } = useFetchTransactions(selectedMonth);

  const getSelectedMonth = useCallback(async () => {
    const sotredSelectedMonth = await getItem("selectedMonth");
    if (sotredSelectedMonth) setSelectedMonth(sotredSelectedMonth as Months);
  }, [getItem]);

  const handleRefreshControl = async () => {
    setIsRefreshing(true);
    await refetchExpense();
    await refetchIncome();
    setIsRefreshing(false);
  };

  useEffect(() => {
    getSelectedMonth();
  }, [getSelectedMonth]);
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefreshControl} />}
      contentContainerStyle={[styles.padding32, styles.gap16, styles.mT20]}>
      <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
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
