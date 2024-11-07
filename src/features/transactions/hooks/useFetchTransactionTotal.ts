import { useQuery } from "react-query";
import { Months } from "@/src/common/types/date";
import { fetchTransactionsTotalsByMonth } from "@/src/api/resources/transactions/fetch-transaction-totals-by-month";

export const useFetchTransactionTotal = (selectedMonth: Months) => {
  return useQuery({
    queryKey: [selectedMonth, "transactions-totals"],
    queryFn: fetchTransactionsTotalsByMonth({ month: selectedMonth }),
    cacheTime: 7200000,
    staleTime: 7200000,
  });
};
