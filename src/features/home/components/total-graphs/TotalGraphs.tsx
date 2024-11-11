import { Dimensions, StyleSheet, View } from "react-native";
import { VictoryPie, VictoryTheme } from "victory-native";
import { Text } from "@ui-kitten/components";

import { Skeleton, Switch } from "@/src/common/components";
import { mapBalanceToGraph } from "./utils";
import { type TransactionTotals } from "@/src/api/resources/transactions/types/types";

type TotalGraphsProps = {
  totals: TransactionTotals | null | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const TotalGraphs = ({ isError, isLoading, totals }: TotalGraphsProps) => {
  const screenDimensions = Dimensions.get("screen").width;
  return (
    <Switch>
      <Switch.Case condition={isLoading}>
        <Skeleton width="100%" height={150} borderRadius={14} />
      </Switch.Case>
      <Switch.Case condition={isError}>
        <View style={[styles.surface, styles.alignCenter, styles.justifyCenter, { height: 150 }]}>
          <Text>No data</Text>
        </View>
      </Switch.Case>
      <Switch.Default>
        {!!totals && mapBalanceToGraph(totals).length > 0 ? (
          <View style={[styles.surface]}>
            <VictoryPie
              data={mapBalanceToGraph(totals)}
              endAngle={-90}
              startAngle={90}
              style={{
                parent: {
                  marginTop: -60,
                  maxHeight: 187,
                  overflow: "hidden",
                },
              }}
              theme={VictoryTheme.grayscale}
              width={screenDimensions - 64}
            />
          </View>
        ) : (
          <View style={[styles.surface, styles.alignCenter, styles.justifyCenter, { height: 150 }]}>
            <Text>No data</Text>
          </View>
        )}
      </Switch.Default>
    </Switch>
  );
};

const styles = StyleSheet.create({
  surface: {
    borderRadius: 14,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  flexRow: {
    flexDirection: "row",
  },
  alignCenter: {
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  gap4: {
    gap: 4,
  },
  mT4: {
    marginTop: 4,
  },
});
