import { log } from "@/src/common/utils/logger";
import { supabase } from "../../supabase-client";
import { type Category } from "./types/types";

export const updateCategory = async ({ id, name, color }: Category) => {
  const { data, error, status } = await supabase.rpc("update_category", {
    id_input: id,
    name_input: name,
    color_input: color,
  });
  if (error) {
    log.error(`Error updating category with id: ${id}`, {
      status,
      error,
      message: `Error updating category with id: ${id}`,
      data: {
        id,
        name,
      },
    });
    return [];
  }
  return data;
};
