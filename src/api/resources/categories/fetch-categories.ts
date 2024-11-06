import { log } from "@/src/common/utils/logger";
import { supabase } from "../../supabase-client";

export const fetchCategories = () => {
  return async () => {
    const { data, error, status } = await supabase.from("categories").select("*").order("id");
    if (error) {
      log.error("Error fetching categories", {
        status,
        error,
        message: "Error fetching categories",
      });
      return [];
    }
    return data;
  };
};
