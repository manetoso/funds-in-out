import { Months } from "@/app/types/date";

export type FetchMonthlyTransactions = {
  month: Months;
  type: TransactionType;
};

export enum TransactionType {
  Income = "income",
  Expense = "expense",
}

export type Transactions = TransactionRecord[] | undefined;

export type TransactionRecord = {
  id: number | null;
  date: string | null;
  description: string | null;
  amount: number | null;
  type: string | null;
  category_name: string | null;
};
