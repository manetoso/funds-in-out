import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
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
        anchor={
          <Chip icon="calendar" onPress={openMenu}>
            {selectedMonth}
          </Chip>
        }
        anchorPosition="bottom"
        onDismiss={closeMenu}
        style={styles.h80}
        visible={isMenuOpen}>
        <Chip onPress={closeMenu}>{selectedMonth}</Chip>
        <Divider />
        <FlatList
          data={MONTHS_ARRAY}
          onScrollToIndexFailed={() => {}}
          initialScrollIndex={MONTHS_ARRAY.indexOf(selectedMonth)}
          renderItem={({ item }) => (
            <Menu.Item
              key={item}
              onPress={() => {
                setSelectedMonth(item);
                storeSelectedMonth(item);
                closeMenu();
              }}
              title={item}
              dense
            />
          )}
          keyExtractor={item => item}
        />
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
  h80: {
    height: 80,
  },
});
