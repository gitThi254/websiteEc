import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { blogReq, blogsReq, createBlogReq } from '../api/blog.api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useBlogs = (query?: any) => {
  return useQuery({
    queryKey: ['blogs', query?.toString()],
    queryFn: () => blogsReq(query),
    placeholderData: keepPreviousData,
  });
};

export const useBlog = (id?: string) => {
  return useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogReq(id),
  });
};

export const useCreateBlog = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createBlogReq,
    onSuccess: (data) => {
      toast.success('create blogs success');
      navigate('/blogs/list');
    },
    onError(error: any) {
      toast.error('delete blogs fail');
      error.message = error?.response?.data;
    },
  });
};
