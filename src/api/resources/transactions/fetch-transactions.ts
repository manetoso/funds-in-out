import { log } from "@/src/common/utils/logger";
import { supabase } from "../../supabase-client";
import { MapMonthDates } from "./utils/map-month-dates";
import { type FetchMonthlyTransactions } from "./types/types";

export const fetchMonthlyTransactions = ({ month, type }: FetchMonthlyTransactions) => {
  return async () => {
    const { endDate, startDate } = MapMonthDates(month);
    const { data, error, status } = await supabase.rpc(
      type === "income" ? "get_income_transactions" : "get_expense_transactions",
      {
        start_date: startDate,
        end_date: endDate,
      },
    );
    if (error) {
      log.error(`Error fetching ${month} ${type} transactions`, {
        status,
        error,
        message: `Error fetching ${month} ${type} transactions`,
      });
      return [];
    }
    return data;
  };
};
