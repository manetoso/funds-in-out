import { Months } from "@/src/common/types/date";

export type FetchMonthlyTransactions = {
  month: Months;
  type: TransactionType;
};

export type AddTransaction = {
  amount: number;
  categoryId: number;
  date: string;
  description: string;
  type: TransactionType;
};

export type UpdateTransaction = {
  id: number;
  data: AddTransaction;
};

export enum TransactionType {
  Expense = "expense",
  Income = "income",
}

export type TransactionTotals = {
  total_income: number;
  total_expense: number;
  balance: number;
};

export type Transactions = TransactionRecord[] | undefined;

export type TransactionRecord = {
  amount: number | null;
  category_color: string | null;
  category_name: string | null;
  date: string | null;
  description: string | null;
  id: number | null;
  type: string | null;
};
