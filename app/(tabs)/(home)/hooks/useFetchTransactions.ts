import { useQuery } from "react-query";

import { fetchMonthlyTransactions } from "@/app/api/resources";
import { TransactionType } from "@/app/api/resources/transactions/types/types";
import { Months } from "@/app/types/date";

export const useFetchTransactions = (selectedMonth: Months) => {
  const { data: incomeData, isLoading: incomeIsLoading } = useQuery(
    [selectedMonth, TransactionType.Income, "transactions"],
    fetchMonthlyTransactions({ month: selectedMonth, type: TransactionType.Income }),
  );
  const { data: expenseData, isLoading: expenseIsLoading } = useQuery(
    [selectedMonth, TransactionType.Expense, "transactions"],
    fetchMonthlyTransactions({ month: selectedMonth, type: TransactionType.Expense }),
  );

  return {
    incomeData,
    incomeIsLoading,
    expenseData,
    expenseIsLoading,
  };
};
