import QueryString from 'qs';
import axios from './axios';
export const blogsReq = async (query?: any) => {
  const urlParams = {
    title: query?.get('keyword'),
    category: query?.get('category'),
  };
  const searchQuery = QueryString.stringify(urlParams, { encode: false });
  return axios.get(`/blogs?${searchQuery}`).then((res) => res.data);
};

export const createBlogReq = async (data: any) =>
  axios.post(`/blogs/${data.category_id}`, data).then((res) => res.data);

export const blogReq = async (id?: string) =>
  axios.get(`/blogs/item/${id}`).then((res) => res.data);

export const updateBlogReq = async ({ id, data }: { id?: string; data: any }) =>
  axios.put(`/blogs/item/${id}`, data).then((res) => res.data);
