import { type AddTransaction, TransactionType } from "@/src/api/resources/transactions/types/types";
import { type TransactionFormValues } from "../types/transaction-form-values";

export const MapTransactionFormToAPI = (
  data: TransactionFormValues,
  categories: {
    id: number;
    name: string;
  }[],
): AddTransaction => ({
  amount: Number(data.amount),
  categoryId: categories.find(category => category.name === data.category)!.id,
  date: data.date.toISOString().split("T")[0],
  description: data.description,
  type: data.type.toLowerCase() as TransactionType,
});
