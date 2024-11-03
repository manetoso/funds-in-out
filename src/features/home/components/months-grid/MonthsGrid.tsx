import { useState } from "react";

import { MonthAccordion } from "./MonthAccordion";
import { MonthSelector } from "./MonthSelector";
import { TransactionsTable } from "./TransactionsTable";
import { useFetchTransactions } from "../../hooks/useFetchTransactions";
import { Months } from "@/src/common/types/date";

// TODO: Move to home index
export const MonthsGrid = () => {
  const [selectedMonth, setSelectedMonth] = useState(Months.January);
  const { expenseData, expenseIsLoading, incomeData, incomeIsLoading } =
    useFetchTransactions(selectedMonth);

  return (
    <>
      <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <MonthAccordion
        selectedMonth={selectedMonth}
        title="Income"
        totalRecords={incomeIsLoading ? undefined : (incomeData?.length ?? 0)}>
        <TransactionsTable transactions={incomeData} />
      </MonthAccordion>
      <MonthAccordion
        selectedMonth={selectedMonth}
        title="Expenses"
        totalRecords={expenseIsLoading ? undefined : (expenseData?.length ?? 0)}>
        <TransactionsTable transactions={expenseData} />
      </MonthAccordion>
    </>
  );
};
