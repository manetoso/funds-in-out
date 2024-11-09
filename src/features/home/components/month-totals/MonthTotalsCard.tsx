import { View, StyleSheet } from "react-native";
import { Icon, Surface, Text } from "react-native-paper";

import { TransactionTotals } from "@/src/api/resources/transactions/types/types";
import { formatCurrency } from "@/src/common/utils";

type MonthTotalsCardProps = TransactionTotals;

export const MonthTotalsCard = ({ balance, total_expense, total_income }: MonthTotalsCardProps) => {
  return (
    <Surface style={[styles.surface]} elevation={4}>
      <View style={[styles.flexRow, styles.alignCenter, styles.gap4]}>
        <Text variant="bodyLarge">Total Balance</Text>
        <Icon source={balance > 0 ? "chevron-up" : "chevron-down"} size={16} />
      </View>
      <View style={[styles.mT8, styles.mB8]}>
        <Text variant="headlineMedium">{formatCurrency(balance ?? 0)}</Text>
      </View>
      <View style={[styles.flexRow, styles.alignCenter, styles.justifyBetween]}>
        <View>
          <View style={[styles.flexRow, styles.alignCenter, styles.gap8]}>
            <Icon source="arrow-down-circle" size={16} />
            <Text variant="bodyLarge">Income</Text>
          </View>
          <Text variant="bodySmall">{formatCurrency(total_income ?? 0)}</Text>
        </View>
        <View>
          <View style={[styles.flexRow, styles.alignCenter, styles.gap8]}>
            <Icon source="arrow-up-circle" size={16} />
            <Text variant="bodyLarge" style={styles.textRight}>
              Expenses
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.textRight}>
            {formatCurrency(total_expense ?? 0)}
          </Text>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    // shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 3,
    // flex: 1,
    borderRadius: 14,
    padding: 16,
    width: "100%",
  },
  flexRow: {
    flexDirection: "row",
  },
  alignCenter: {
    alignItems: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  textRight: {
    textAlign: "right",
  },
  gap4: {
    gap: 4,
  },
  gap8: {
    gap: 8,
  },
  mT8: {
    marginTop: 4,
  },
  mB8: {
    marginBottom: 21,
  },
});
