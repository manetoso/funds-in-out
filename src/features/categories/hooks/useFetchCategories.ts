import { useQuery } from "react-query";

import { fetchCategories } from "@/src/api/resources";

export const useFetchCategories = () => {
  return useQuery({
    queryKey: "categories",
    queryFn: fetchCategories(),
    cacheTime: 7200000,
  });
};
