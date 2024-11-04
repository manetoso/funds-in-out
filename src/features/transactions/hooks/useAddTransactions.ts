import { useMutation, useQueryClient } from "react-query";

import { addTransaction } from "@/src/api/resources";

export const useAddTransactions = () => {
  const queryClient = useQueryClient();
  const addTransactionMutation = useMutation(addTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });

  return { addTransactionMutation };
};
