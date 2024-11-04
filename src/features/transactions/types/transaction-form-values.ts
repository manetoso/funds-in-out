import { AddTransaction } from "@/src/api/resources/transactions/types/types";

export type TransactionFormValues = Pick<AddTransaction, "description"> & {
  amount: string;
  category: string;
  date: Date;
  type: string;
};
