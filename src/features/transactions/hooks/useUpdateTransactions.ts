import { useMutation, useQueryClient } from "react-query";

import { updateTransaction } from "@/src/api/resources";

export const useUpdateTransactions = () => {
  const queryClient = useQueryClient();
  const updateTransactionMutation = useMutation(updateTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });

  return { updateTransactionMutation };
};
