import { useMutation, useQueryClient } from "react-query";

import { addTransaction, deleteTransaction, updateTransaction } from "@/src/api/resources";
import { getMonthFromDate } from "@/src/common/utils";

export const useMutateTransactions = () => {
  const queryClient = useQueryClient();

  const addTransactionMutation = useMutation(addTransaction, {
    onSuccess: (_, variables) => {
      const month = getMonthFromDate(new Date(variables.date));
      queryClient.invalidateQueries([month, variables.type, "transactions"]);
    },
  });
  const deleteTransactionMutation = useMutation(deleteTransaction, {
    onSuccess: data => {
      const month = getMonthFromDate(new Date(data!.date));
      queryClient.invalidateQueries([month, data!.type, "transactions"]);
    },
  });
  const updateTransactionMutation = useMutation(updateTransaction, {
    onSuccess: (_, variables) => {
      const month = getMonthFromDate(new Date(variables.data.date));
      queryClient.invalidateQueries([month, variables.data.type, "transactions"]);
    },
  });

  return { addTransactionMutation, deleteTransactionMutation, updateTransactionMutation };
};
