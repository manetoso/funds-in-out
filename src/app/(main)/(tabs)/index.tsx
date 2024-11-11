import { StyleSheet } from "react-native";

import { useDashboardStore } from "@/src/stores";
import { useFetchTransactionTotal } from "@/src/features/transactions/hooks";
import { MonthSelector, MonthTransactions } from "@/src/features/home/components/months-grid";
import { MonthTotal } from "@/src/features/home/components/month-totals";
// import { TotalGraphs } from "@/src/features/home/components/total-graphs";
import { Layout } from "@ui-kitten/components";

export default function HomeScreen() {
  const { selectedMonth } = useDashboardStore();
  const {
    data: tansactionsTotals,
    isFetching: isLoadingTansactionsTotals,
    isError: isErrorTansactionsTotals,
  } = useFetchTransactionTotal(selectedMonth);
  return (
    <Layout level="1" style={[styles.padding24, styles.gap16, styles.mT20, styles.flex1]}>
      <MonthSelector />
      <MonthTotal
        isError={isErrorTansactionsTotals}
        isLoading={isLoadingTansactionsTotals}
        totals={tansactionsTotals}
      />
      {/* <TotalGraphs
        isError={isErrorTansactionsTotals}
        isLoading={isLoadingTansactionsTotals}
        totals={tansactionsTotals}
      /> */}
      <MonthTransactions />
    </Layout>
  );
}

const styles = StyleSheet.create({
  padding24: {
    padding: 24,
  },
  gap16: {
    gap: 16,
  },
  mT20: {
    marginTop: 20,
  },
  flex1: {
    flex: 1,
  },
});
