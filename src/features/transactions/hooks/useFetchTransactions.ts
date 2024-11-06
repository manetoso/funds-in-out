import { useQuery } from "react-query";

import { fetchMonthlyTransactions } from "@/src/api/resources";
import { TransactionType } from "@/src/api/resources/transactions/types/types";
import { Months } from "@/src/common/types/date";

export const useFetchTransactions = (selectedMonth: Months) => {
  const {
    data: incomeData,
    isFetching: incomeIsLoading,
    refetch: refetchIncome,
  } = useQuery({
    queryKey: [selectedMonth, TransactionType.Income, "transactions"],
    queryFn: fetchMonthlyTransactions({ month: selectedMonth, type: TransactionType.Income }),
    cacheTime: 7200000,
    staleTime: 7200000,
  });
  const {
    data: expenseData,
    isFetching: expenseIsLoading,
    refetch: refetchExpense,
  } = useQuery({
    queryKey: [selectedMonth, TransactionType.Expense, "transactions"],
    queryFn: fetchMonthlyTransactions({ month: selectedMonth, type: TransactionType.Expense }),
    cacheTime: 7200000,
    staleTime: 7200000,
  });

  return {
    incomeData,
    incomeIsLoading,
    expenseData,
    expenseIsLoading,
    refetchIncome,
    refetchExpense,
  };
};
