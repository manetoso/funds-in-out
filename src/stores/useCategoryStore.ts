import { create } from "zustand";

type CategoryState = {
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
};

export const useCategoryStore = create<CategoryState>()(set => ({
  currentCategory: "",
  setCurrentCategory: (category: string) => set({ currentCategory: category }),
}));
