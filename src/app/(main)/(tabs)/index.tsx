import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { useFetchTransactions } from "@/src/features/transactions/hooks/useFetchTransactions";
import {
  MonthAccordion,
  MonthSelector,
  TransactionsTable,
} from "@/src/features/home/components/months-grid";
import { Months } from "@/src/common/types/date";
import { Link } from "expo-router";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  const [selectedMonth, setSelectedMonth] = useState(Months.January);
  const { expenseData, expenseIsLoading, incomeData, incomeIsLoading } =
    useFetchTransactions(selectedMonth);
  return (
    <ScrollView contentContainerStyle={[styles.padding32, styles.gap16, styles.mT20]}>
      <Link href="/(main)/transactions/1">
        <Text variant="bodyLarge">Go to transactions</Text>
      </Link>
      <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <MonthAccordion
        selectedMonth={selectedMonth}
        title="Income"
        totalRecords={incomeIsLoading ? undefined : (incomeData?.length ?? 0)}>
        <TransactionsTable transactions={incomeData} />
      </MonthAccordion>
      <MonthAccordion
        selectedMonth={selectedMonth}
        title="Expenses"
        totalRecords={expenseIsLoading ? undefined : (expenseData?.length ?? 0)}>
        <TransactionsTable transactions={expenseData} />
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
