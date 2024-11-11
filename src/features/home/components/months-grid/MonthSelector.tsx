import { useState } from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";

import { useAsyncStorage } from "@/src/common/hooks";
import { useDashboardStore } from "@/src/stores";
import { MONTHS_ARRAY } from "@/src/common/constants/dates";

export const MonthSelector = () => {
  const { setItem } = useAsyncStorage();
  const { selectedMonth, setSelectedMonth } = useDashboardStore();
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(MONTHS_ARRAY.indexOf(selectedMonth)),
  );

  const onValueChange = (index: IndexPath) => {
    setSelectedIndex(index);
    setSelectedMonth(MONTHS_ARRAY[index.row]);
    setItem("selectedMonth", MONTHS_ARRAY[index.row]);
  };

  return (
    <Select
      value={MONTHS_ARRAY[selectedIndex.row]}
      selectedIndex={selectedIndex}
      onSelect={index => onValueChange(index as IndexPath)}>
      {MONTHS_ARRAY.map(month => (
        <SelectItem key={month} title={month} />
      ))}
    </Select>
  );
};
