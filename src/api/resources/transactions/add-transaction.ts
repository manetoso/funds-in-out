import { log } from "@/src/common/utils/logger";
import { supabase } from "../../supabase-client";
import { type AddTransaction } from "./types/types";

export const addTransaction = async ({
  amount,
  categoryId,
  date,
  description,
  type,
}: AddTransaction) => {
  const { data, error, status } = await supabase.rpc("add_transaction", {
    amount_input: amount,
    category_id_input: categoryId,
    date_input: date,
    description_input: description,
    type_input: type,
  });
  if (error) {
    log.error("Error adding new transaction", {
      status,
      error,
      message: "Error adding new transaction",
      data: {
        amount,
        categoryId,
        date,
        description,
        type,
      },
    });
    return [];
  }
  return data;
};
