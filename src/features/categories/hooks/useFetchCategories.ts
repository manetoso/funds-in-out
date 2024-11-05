import { useQuery } from "react-query";

import { fetchCategories } from "@/src/api/resources";

export const useFetchCategories = () => {
  const {
    data: categories,
    isError: isErrorCategories,
    isFetching: isLoadingCategories,
  } = useQuery({
    queryKey: "categories",
    queryFn: fetchCategories(),
    cacheTime: 7200000,
  });

  return { categories, isErrorCategories, isLoadingCategories };
};
