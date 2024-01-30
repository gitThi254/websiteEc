import { useQuery } from "@tanstack/react-query";
import { categoryReq } from "../api/categories";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryReq,
  });
};
