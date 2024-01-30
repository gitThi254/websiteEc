import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogReq, blogsReq, dislikesReq, likesReq } from "../api/blog.api";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogsReq,
  });
};

export const useBlog = (id?: string) => {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => blogReq(id),
  });
};

export const useLikes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likesReq,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["blogs", data._id], data);
    },
  });
};

export const useDisLikes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dislikesReq,
    onSuccess: (data) => {
      queryClient.setQueryData(["blogs", data._id], data);
    },
  });
};
