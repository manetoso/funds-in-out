import { log } from "@/src/common/utils/logger";
import { supabase } from "../../supabase-client";

export const deleteCategory = async ({ id }: { id: number }) => {
  const { data, error, status } = await supabase.rpc("delete_category", {
    id_input: id,
  });
  if (error) {
    log.error(`Error deleting category with id: ${id}`, {
      status,
      error,
      message: `Error deleting category with id: ${id}`,
      data: {
        id,
      },
    });
    return [];
  }
  return data;
};
