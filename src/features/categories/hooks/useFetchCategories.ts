import { useQuery } from "react-query";

import { fetchCategories } from "@/src/api/resources";

export const useFetchCategories = () => {
  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    ["categories"],
    fetchCategories(),
  );

  return { categories, isLoadingCategories };
};
