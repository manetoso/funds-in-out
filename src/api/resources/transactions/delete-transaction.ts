import { log } from "@/src/common/utils/logger";
import { supabase } from "../../supabase-client";
import { type UpdateTransaction } from "./types/types";

export const deleteTransaction = async ({ id }: Pick<UpdateTransaction, "id">) => {
  const { error, status } = await supabase.rpc("delete_transaction", {
    id_input: id,
  });
  if (error) {
    log.error("Error deleting new transaction", {
      status,
      error,
      message: "Error deleting new transaction",
      data: {
        id,
      },
    });
    return false;
  }
  return true;
};
