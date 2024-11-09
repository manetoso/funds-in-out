import { useMutation, useQueryClient } from "react-query";

import { addTransaction, deleteTransaction, updateTransaction } from "@/src/api/resources";
import { getMonthFromDate } from "@/src/common/utils";

export const useMutateTransactions = () => {
  const queryClient = useQueryClient();

  const addTransactionMutation = useMutation(addTransaction, {
    onSuccess: (_, variables) => {
      const month = getMonthFromDate(variables.date);
      queryClient.invalidateQueries([month, variables.type, "transactions"]);
      queryClient.invalidateQueries([month, "transactions-totals"]);
    },
  });
  const deleteTransactionMutation = useMutation(deleteTransaction, {
    onSuccess: data => {
      const month = getMonthFromDate(new Date(data!.date).toISOString().split("T")[0]);
      queryClient.invalidateQueries([month, data!.type, "transactions"]);
      queryClient.invalidateQueries([month, "transactions-totals"]);
    },
  });
  const updateTransactionMutation = useMutation(updateTransaction, {
    onSuccess: (_, variables) => {
      const month = getMonthFromDate(variables.data.date);
      queryClient.invalidateQueries([month, variables.data.type, "transactions"]);
      queryClient.invalidateQueries([month, "transactions-totals"]);
    },
  });

  return { addTransactionMutation, deleteTransactionMutation, updateTransactionMutation };
};
