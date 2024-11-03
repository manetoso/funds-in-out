import { Months } from "@/src/common/types/date";

export const MapMonthDates = (month: Months) => {
  const CURRENT_YEAR = new Date().getFullYear();
  const monthIndex = Object.values(Months).indexOf(month);
  const startDate = new Date(CURRENT_YEAR, monthIndex, 1).toISOString().split("T")[0];
  const endDate = new Date(CURRENT_YEAR, monthIndex + 1, 0).toISOString().split("T")[0];
  return { startDate, endDate };
};
