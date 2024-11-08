import { parseISO } from "date-fns";
import { Months } from "../types/date";

export const getMonthFromDate = (dateString: string): Months => {
  const monthIndex = parseISO(dateString).getMonth();
  return Object.values(Months)[monthIndex];
};
