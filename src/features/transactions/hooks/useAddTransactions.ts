import { useMutation, useQueryClient } from "react-query";

import { addTransaction } from "@/src/api/resources";

export const useAddTransactions = () => {
  const queryClient = useQueryClient();
  const addTrnsactionMutation = useMutation(addTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });

  return { addTrnsactionMutation };
};
