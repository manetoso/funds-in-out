import { Months } from "@/app/types/date";

export type FetchMonthlyTransactions = {
  month: Months;
  type: TransactionType;
};

export enum TransactionType {
  Income = "income",
  Expense = "expense",
}
