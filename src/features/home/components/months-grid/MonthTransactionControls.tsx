import { View } from "react-native";
import { Button } from "@ui-kitten/components";

import { TransactionType } from "@/src/api/resources/transactions/types/types";

export type MonthTransactionControlsProps = {
  transactionsType: TransactionType;
  setTransactionsType: React.Dispatch<React.SetStateAction<TransactionType>>;
  isLoading: boolean;
};

export const MonthTransactionControls = ({
  setTransactionsType,
  transactionsType,
  isLoading,
}: MonthTransactionControlsProps) => {
  return (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <Button
        disabled={isLoading}
        onPress={() => setTransactionsType(TransactionType.Income)}
        status={transactionsType === TransactionType.Income ? "primary" : "basic"}
        style={{ flex: 1, borderTopEndRadius: 0, borderBottomEndRadius: 0 }}>
        Income
      </Button>
      <Button
        disabled={isLoading}
        onPress={() => setTransactionsType(TransactionType.Expense)}
        status={transactionsType === TransactionType.Expense ? "primary" : "basic"}
        style={{ flex: 1, borderTopStartRadius: 0, borderBottomStartRadius: 0 }}>
        Expenses
      </Button>
    </View>
  );
};
