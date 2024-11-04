import { useMutation, useQueryClient } from "react-query";

import { deleteTransaction } from "@/src/api/resources";

export const useDeleteTransactions = () => {
  const queryClient = useQueryClient();
  const deleteTransactionMutation = useMutation(deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });

  return { deleteTransactionMutation };
};
