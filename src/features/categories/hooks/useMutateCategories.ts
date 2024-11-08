import { useMutation, useQueryClient } from "react-query";

import { addCategory, deleteCategory, updateCategory } from "@/src/api/resources";

export const useMutateCategories = () => {
  const queryClient = useQueryClient();

  const invalidateCategories = () => {
    queryClient.invalidateQueries("categories");
    queryClient.invalidateQueries({
      predicate: query => query.queryKey.includes("transactions"),
    });
  };

  const addCategoryMutation = useMutation(addCategory, {
    onSuccess: invalidateCategories,
  });

  const updateCategoryMutation = useMutation(updateCategory, {
    onSuccess: invalidateCategories,
  });

  const deleteCategoryMutation = useMutation(deleteCategory, {
    onSuccess: invalidateCategories,
  });

  return { addCategoryMutation, deleteCategoryMutation, updateCategoryMutation };
};
