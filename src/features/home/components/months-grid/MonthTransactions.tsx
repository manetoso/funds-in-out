import { useState } from "react";
import { View, RefreshControl } from "react-native";
import { Href, router } from "expo-router";
import { Button, List, Spinner, Text } from "@ui-kitten/components";

import { useDashboardStore } from "@/src/stores";
import { Switch } from "@/src/common/components";
import { MonthTransactionControls } from "./MonthTransactionControls";
import { MonthTransactionItem } from "./MonthTransactionItem";
import { TransactionType } from "@/src/api/resources/transactions/types/types";
import { useFetchTransactionTotal, useFetchTransactions } from "@/src/features/transactions/hooks";

export const MonthTransactions = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [transactionsType, setTransactionsType] = useState(TransactionType.Income);
  const { selectedMonth } = useDashboardStore();
  const {
    expenseData,
    expenseIsLoading,
    incomeData,
    incomeIsLoading,
    refetchExpense,
    refetchIncome,
  } = useFetchTransactions(selectedMonth);
  const { refetch: refetchTansactionsTotals } = useFetchTransactionTotal(selectedMonth);

  const handleAddTransaction = () => {
    const URL = `/(main)/transactions/0?queryType=${transactionsType}` as Href<string>;
    router.push(URL);
  };

  const handleRefreshControl = async () => {
    setIsRefreshing(true);
    await Promise.all([refetchExpense(), refetchIncome(), refetchTansactionsTotals()]);
    setIsRefreshing(false);
  };
  return (
    <>
      <MonthTransactionControls
        setTransactionsType={setTransactionsType}
        transactionsType={transactionsType}
        isLoading={expenseIsLoading || incomeIsLoading}
      />
      <View style={{ flex: 1 }}>
        <Switch>
          <Switch.Case
            condition={
              transactionsType === TransactionType.Expense ? expenseIsLoading : incomeIsLoading
            }>
            <View
              style={{
                flex: 1,
                padding: 8,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F7F9FC",
              }}>
              <Spinner size="giant" />
            </View>
          </Switch.Case>
          <Switch.Case
            condition={
              transactionsType === TransactionType.Expense
                ? !expenseData || expenseData.length === 0
                : !incomeData || incomeData.length === 0
            }>
            <View
              style={{
                flex: 1,
                padding: 8,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F7F9FC",
              }}>
              <Text category="c2" numberOfLines={1}>
                No transactions found for this month
              </Text>
            </View>
          </Switch.Case>
          <Switch.Default>
            <List
              contentContainerStyle={{ gap: 8 }}
              data={transactionsType === TransactionType.Expense ? expenseData : incomeData}
              refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={handleRefreshControl} />
              }
              renderItem={({ item }) => <MonthTransactionItem {...item} />}
              style={{ borderRadius: 16 }}
              snapToInterval={65.5 + 8}
            />
            <Button style={{ marginTop: 8 }} onPress={handleAddTransaction}>
              Add one
            </Button>
          </Switch.Default>
        </Switch>
      </View>
    </>
  );
};
