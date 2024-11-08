import { useMutation, useQueryClient } from "react-query";

import { addTransaction, deleteTransaction, updateTransaction } from "@/src/api/resources";
import { getMonthFromDate, log } from "@/src/common/utils";

export const useMutateTransactions = () => {
  const queryClient = useQueryClient();

  const addTransactionMutation = useMutation(addTransaction, {
    onSuccess: (_, variables) => {
      const month = getMonthFromDate(new Date(variables.date));
      log.info("onSuccess addTransactionMutation", {
        variables,
        month,
        query: [month, variables.type, "transactions", "transactions-totals"],
      });
      queryClient.invalidateQueries([month, variables.type, "transactions"]);
      queryClient.invalidateQueries([month, "transactions-totals"]);
    },
  });
  const deleteTransactionMutation = useMutation(deleteTransaction, {
    onSuccess: data => {
      const month = getMonthFromDate(new Date(data!.date));
      log.info("onSuccess deleteTransactionMutation", {
        data,
        month,
        query: [month, data!.type, "transactions", "transactions-totals"],
      });
      queryClient.invalidateQueries([month, data!.type, "transactions"]);
      queryClient.invalidateQueries([month, "transactions-totals"]);
    },
  });
  const updateTransactionMutation = useMutation(updateTransaction, {
    onSuccess: (_, variables) => {
      const month = getMonthFromDate(new Date(variables.data.date));
      log.info("onSuccess updateTransactionMutation", {
        variables,
        month,
        query: [month, variables.data.type, "transactions", "transactions-totals"],
      });
      queryClient.invalidateQueries([month, variables.data.type, "transactions"]);
      queryClient.invalidateQueries([month, "transactions-totals"]);
    },
  });

  return { addTransactionMutation, deleteTransactionMutation, updateTransactionMutation };
};
