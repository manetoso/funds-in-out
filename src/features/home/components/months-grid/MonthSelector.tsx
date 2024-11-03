import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Chip, Divider, Menu } from "react-native-paper";

import { MONTHS_ARRAY } from "@/src/common/constants/dates";
import { Months } from "@/src/common/types/date";

type MonthSelectorProps = {
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<Months>>;
};

export const MonthSelector = ({ selectedMonth, setSelectedMonth }: MonthSelectorProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <View style={styles.listTitleWrapper}>
      <Menu
        visible={isMenuOpen}
        onDismiss={closeMenu}
        anchor={
          <Chip icon="calendar" onPress={openMenu}>
            {selectedMonth}
          </Chip>
        }>
        <Chip onPress={closeMenu}>{selectedMonth}</Chip>
        <Divider />
        {MONTHS_ARRAY.map(month => (
          <Menu.Item
            key={month}
            onPress={() => {
              closeMenu();
              setSelectedMonth(month);
            }}
            title={month}
            dense
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  listTitleWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 20,
  },
});
