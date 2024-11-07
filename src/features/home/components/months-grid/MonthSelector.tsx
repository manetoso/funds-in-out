import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Chip, Divider, Menu } from "react-native-paper";

import { useAsyncStorage } from "@/src/common/hooks";
import { MONTHS_ARRAY } from "@/src/common/constants/dates";
import { useDashboardStore } from "@/src/stores";

export const MonthSelector = () => {
  const { selectedMonth, setSelectedMonth } = useDashboardStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setItem } = useAsyncStorage();

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const storeSelectedMonth = async (value: string) => {
    await setItem("selectedMonth", value);
  };

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
              setSelectedMonth(month);
              storeSelectedMonth(month);
              closeMenu();
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
