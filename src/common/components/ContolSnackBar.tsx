import { useSnackbarStore } from "@/src/stores/useSnackbarStore";
import { Snackbar } from "react-native-paper";

export const ContolSnackBar = () => {
  const { isOpen, hideSnackbar, message } = useSnackbarStore();
  return (
    <Snackbar
      visible={isOpen}
      onDismiss={hideSnackbar}
      action={{
        label: "Close",
        onPress: () => {
          hideSnackbar();
        },
      }}>
      {message}
    </Snackbar>
  );
};
