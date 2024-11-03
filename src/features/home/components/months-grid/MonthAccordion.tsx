import { PropsWithChildren, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, List, Text } from "react-native-paper";

import { Months } from "@/src/common/types/date";

type MonthAccordionProps = PropsWithChildren & {
  selectedMonth: Months;
  title: string;
  totalRecords?: number;
};

export const MonthAccordion = ({
  selectedMonth,
  title,
  totalRecords,
  children,
}: MonthAccordionProps) => {
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  const handleAccordionPress = () =>
    typeof totalRecords !== "undefined" && setIsAccordionExpanded(!isAccordionExpanded);

  return (
    <>
      <View style={styles.listTitleWrapper}>
        <Text variant="headlineSmall">{title}</Text>
        {typeof totalRecords === "undefined" ? (
          <ActivityIndicator size={14} style={styles.mB2} />
        ) : (
          <Text variant="titleMedium">{totalRecords}</Text>
        )}
      </View>
      <List.Section>
        <List.Accordion
          style={styles.listAccordion}
          title={selectedMonth}
          left={props => (
            <List.Icon {...props} style={[props.style, styles.accordionIcon]} icon="table" />
          )}
          expanded={isAccordionExpanded}
          onPress={handleAccordionPress}>
          {children}
        </List.Accordion>
      </List.Section>
    </>
  );
};

const styles = StyleSheet.create({
  listTitleWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 20,
  },
  listAccordion: {
    paddingVertical: 0,
    paddingRight: 0,
    paddingHorizontal: 8,
  },
  accordionIcon: {
    marginLeft: 0,
  },
  mB2: {
    marginBottom: 6,
  },
});
