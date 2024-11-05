import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import { useAsyncStorage } from "@/src/common/hooks/useAsyncStorage";
import { useFetchTransactions } from "@/src/features/transactions/hooks/useFetchTransactions";
import { MonthAccordion, MonthSelector } from "@/src/features/home/components/months-grid";
import { TransactionsTable } from "@/src/features/transactions/components";
import { Months } from "@/src/common/types/date";
import { TransactionType } from "@/src/api/resources/transactions/types/types";

export default function HomeScreen() {
  const [selectedMonth, setSelectedMonth] = useState(Months.January);
  const {
    expenseData,
    expenseIsLoading,
    incomeData,
    incomeIsLoading,
    refetchExpense,
    refetchIncome,
  } = useFetchTransactions(selectedMonth);
  const { getItem } = useAsyncStorage();
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  // RE-FETCH FROM router.back() but not working 100% of the time
  // useFocusEffect(
  //   useCallback(() => {
  //     refetchExpense();
  //     refetchIncome();
  //   }, [refetchExpense, refetchIncome]),
  // );
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
