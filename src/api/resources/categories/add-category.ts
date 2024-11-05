import { log } from "@/src/common/utils/logger";
import { supabase } from "../../supabase-client";
import { type AddCategory } from "./types/types";

export const addCategory = async ({ name }: AddCategory) => {
  const { data, error, status } = await supabase.rpc("add_category", {
    name_input: name,
  });
  if (error) {
    log.error("Error adding new category", {
      status,
      error,
      message: "Error adding new category",
      data: {
        name,
      },
    });
    return [];
  }
  return data;
};
