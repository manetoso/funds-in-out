import { View, StyleSheet } from "react-native";
import { Card, Icon, Text } from "@ui-kitten/components";

import { formatCurrency } from "@/src/common/utils";
import { type TransactionTotals } from "@/src/api/resources/transactions/types/types";

type MonthTotalsCardProps = TransactionTotals;

export const MonthTotalsCard = ({ balance, total_expense, total_income }: MonthTotalsCardProps) => {
  return (
    <Card style={[styles.surface]}>
      <View style={[styles.flexRow, styles.alignCenter, styles.gap4]}>
        <Text category="p1">Total Balance</Text>
        <Icon
          name={balance > 0 ? "chevron-up" : "chevron-down"}
          style={{ width: 21, height: 21 }}
        />
      </View>
      <View style={[styles.mT8, styles.mB8]}>
        <Text category="h4">{formatCurrency(balance ?? 0)}</Text>
      </View>
      <View style={[styles.flexRow, styles.alignCenter, styles.justifyBetween]}>
        <View>
          <View style={[styles.flexRow, styles.alignCenter, styles.gap8]}>
            <Icon name="arrow-circle-down" style={{ width: 16, height: 16 }} />
            <Text category="p2">Income</Text>
          </View>
          <Text category="h6">{formatCurrency(total_income ?? 0)}</Text>
        </View>
        <View>
          <View style={[styles.flexRow, styles.alignCenter, styles.gap8]}>
            <Icon name="arrow-circle-up" style={{ width: 16, height: 16 }} />
            <Text category="p2" style={styles.textRight}>
              Expenses
            </Text>
          </View>
          <Text category="h6" style={styles.textRight}>
            {formatCurrency(total_expense ?? 0)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  surface: {
    // shadowColor: "#000",
    // shadowOpacity: 0.05,
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 3,
    // flex: 1,
    // backgroundColor: "#fff",
    // padding: 16,
    borderRadius: 16,
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
