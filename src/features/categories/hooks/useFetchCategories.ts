import { useQuery } from "react-query";

import { fetchCategories } from "@/src/api/resources";

export const useFetchCategories = () => {
  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
  } = useQuery(["categories"], fetchCategories());

  return { categories, isErrorCategories, isLoadingCategories };
};
