import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { Months } from "../common/types/date";

type DashboardState = {
  selectedMonth: Months;
  setSelectedMonth: (month: Months) => void;
};

const getSelectedMonthFromStorage = async (): Promise<Months> => {
  const storedSelectedMonth = await AsyncStorage.getItem("selectedMonth");
  return storedSelectedMonth ? (storedSelectedMonth as Months) : Months.January;
};

export const useDashboardStore = create<DashboardState>(set => {
  const initializeStore = async () => {
    const selectedMonth = await getSelectedMonthFromStorage();
    set({ selectedMonth });
  };

  initializeStore();

  return {
    selectedMonth: Months.January,
    setSelectedMonth: (month: Months) => set({ selectedMonth: month }),
  };
});
