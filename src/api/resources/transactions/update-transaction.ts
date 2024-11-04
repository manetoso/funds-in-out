import { log } from "@/src/common/utils/logger";
import { supabase } from "../../supabase-client";
import { type UpdateTransaction } from "./types/types";

export const updateTransaction = async ({
  id,
  data: { amount, categoryId, date, description, type },
}: UpdateTransaction) => {
  const { data, error, status } = await supabase.rpc("update_transaction", {
    id_input: id,
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
        id,
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
