import { Skeleton, Switch } from "@/src/common/components";
import { MonthTotalsCard } from "./MonthTotalsCard";
import { type TransactionTotals } from "@/src/api/resources/transactions/types/types";

type MonthsTotalsProps = {
  isError: boolean;
  isLoading: boolean;
  totals: TransactionTotals | null | undefined;
};

export const MonthTotal = ({ isError, isLoading, totals }: MonthsTotalsProps) => {
  return (
    <Switch>
      <Switch.Case condition={isLoading}>
        <Skeleton width="100%" height={150} borderRadius={14} />
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
