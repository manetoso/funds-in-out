import { StyleSheet } from "react-native";
import { Href, router } from "expo-router";
import { Button, DataTable, Text } from "react-native-paper";

import {
  type TransactionRecord,
  TransactionType,
  type Transactions,
} from "@/src/api/resources/transactions/types/types";

type TransactionsTableProps = {
  transactions?: Transactions;
  type: TransactionType;
};

export const TransactionsTable = ({ transactions, type }: TransactionsTableProps) => {
  const handleAddTransaction = () => {
    const URL = `/(main)/transactions/0?queryType=${type}` as Href<string>;
    router.push(URL);
  };
  const handleEditTransaction = ({
    amount,
    category_name,
    date,
    description,
    id,
  }: TransactionRecord) => {
    const URL =
      `/(main)/transactions/${id}?queryAmount=${amount}&queryCategory=${category_name}&queryDate=${date?.split("T")[0]}&queryDescription=${description}&queryType=${type}` as Href<string>;
    router.push(URL);
  };
  return (
    <DataTable style={{ paddingLeft: 0 }}>
      <DataTable.Header style={styles.tableRow}>
        <DataTable.Title style={styles.tableCellBig}>Source</DataTable.Title>
        <DataTable.Title style={styles.tableCellBig}>Tag</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
      </DataTable.Header>

      {typeof transactions !== "undefined" && transactions.length > 0 ? (
        transactions.map(item => (
          <DataTable.Row
            key={item.id}
            style={styles.tableRow}
            onPress={() => {
              handleEditTransaction(item);
            }}>
            <DataTable.Cell style={styles.tableCellBig}>
              <Text variant="bodySmall" numberOfLines={1} style={styles.letterSpacing0}>
                {item.description}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={styles.tableCellBig}>
              <Text variant="bodySmall" numberOfLines={1} style={styles.letterSpacing0}>
                {item.category_name}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text variant="bodySmall" numberOfLines={1} style={styles.letterSpacing0}>
                {item.amount}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))
      ) : (
        <DataTable.Row style={styles.tableRow}>
          <DataTable.Cell style={styles.flexJustifyCenter}>
            <Text
              variant="bodySmall"
              numberOfLines={1}
              style={[styles.letterSpacing0, styles.textCenter]}>
              No transactions found
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
      )}

      <DataTable.Row style={styles.tableRow}>
        <DataTable.Cell>
          <Button mode="contained" icon="plus" onPress={handleAddTransaction}>
            Add
          </Button>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    paddingHorizontal: 8,
    width: "100%",
  },
  flexJustifyCenter: {
    justifyContent: "center",
  },
  tableCellBig: {
    flex: 2,
    paddingRight: 6,
  },
  letterSpacing0: {
    letterSpacing: 0,
  },
  textCenter: {
    textAlign: "center",
  },
});