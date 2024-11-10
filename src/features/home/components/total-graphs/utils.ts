import { TransactionTotals } from "@/src/api/resources/transactions/types/types";

export type PieGraphData = {
  x: string;
  y: number;
};

export const mapBalanceToGraph = (totals: TransactionTotals): PieGraphData[] => {
  if (totals.total_expense === 0 && totals.total_income === 0) return [];
  return [
    { x: "Expenses", y: totals.total_expense },
    { x: "Income", y: totals.total_income },
  ];
};
