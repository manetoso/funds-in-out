import { log } from "@/src/common/utils/logger";
import { supabase } from "../../supabase-client";
import { MapMonthDates } from "./utils/map-month-dates";
import type { TransactionTotals, FetchMonthlyTransactions } from "./types/types";

export const fetchTransactionsTotalsByMonth = ({
  month,
}: Pick<FetchMonthlyTransactions, "month">): (() => Promise<TransactionTotals | null>) => {
  return async () => {
    const { endDate, startDate } = MapMonthDates(month);
    const { data, error, status } = await supabase.rpc("get_transaction_totals_by_month", {
      start_date: startDate,
      end_date: endDate,
    });
    if (error) {
      log.error(`Error fetching ${month} transactions totals`, {
        status,
        error,
        message: `Error fetching ${month} transactions totals`,
        data: { startDate, endDate },
      });
      return null;
    }
    return data[0];
  };
};
