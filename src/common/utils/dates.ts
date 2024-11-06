import { Months } from "../types/date";

export const getMonthFromDate = (date: Date): Months => {
  const monthIndex = date.getMonth();
  return Object.values(Months)[monthIndex];
};
