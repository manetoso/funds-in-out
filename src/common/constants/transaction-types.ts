import { TransactionType } from "@/src/api/resources/transactions/types/types";

export const TRANSACTION_TYPES = [
  TransactionType.Expense.charAt(0).toUpperCase() + TransactionType.Expense.slice(1),
  TransactionType.Income.charAt(0).toUpperCase() + TransactionType.Income.slice(1),
];
