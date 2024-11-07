import { Text } from "react-native-paper";

import { Switch } from "@/src/common/components";
import { TransactionTotals } from "@/src/api/resources/transactions/types/types";
import { MonthTotalsCard } from "./MonthTotalsCard";

type MonthsTotalsProps = {
  isError: boolean;
  isLoading: boolean;
  totals: TransactionTotals | null | undefined;
};

// TODO: Add loader

export const MonthTotal = ({ isError, isLoading, totals }: MonthsTotalsProps) => {
  return (
    <Switch>
      <Switch.Case condition={isLoading}>
        <Text>Loading...</Text>
      </Switch.Case>
      <Switch.Case condition={isError}>
        <MonthTotalsCard balance={0} total_expense={0} total_income={0} />
      </Switch.Case>
      <Switch.Default>
        <MonthTotalsCard
          balance={totals?.balance ?? 0}
          total_expense={totals?.total_expense ?? 0}
          total_income={totals?.total_income ?? 0}
        />
      </Switch.Default>
    </Switch>
  );
};
