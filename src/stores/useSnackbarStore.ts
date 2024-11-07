import { create } from "zustand";

type SnackBarState = {
  isOpen: boolean;
  message: string;
  showSnackbar: (message: string, secs?: number) => void;
  hideSnackbar: () => void;
};

export const useSnackbarStore = create<SnackBarState>()(set => ({
  isOpen: false,
  message: "",
  showSnackbar: (message, secs = 3) => {
    set({ isOpen: true, message });
    setTimeout(() => set({ isOpen: false, message: "" }), secs * 1000);
  },
  hideSnackbar: () => set({ isOpen: false, message: "" }),
}));
