import QueryString from 'qs';
import axios from './axios';
export const categoryReq = async (query?: any) => {
  const urlParams = {
    name: query?.get('keyword'),
    status: query?.get('status'),
  };
  const searchQuery = QueryString.stringify(urlParams, { encode: false });
  return axios.get(`/categories?${searchQuery}`).then((res) => res.data);
};

export const getCategoryReq = async (id?: string) =>
  axios.get(`/categories/${id}`).then((res) => res.data);

export const deleteCategoryReq = async (id?: string) =>
  axios.delete(`/categories/${id}`).then((res) => res.data);

export const getVariationOptionReq = async (id?: string) =>
  axios.get(`/variations/options/item/${id}`).then((res) => res.data);

export const updateCategoryReq = async ({
  id,
  data,
}: {
  id?: string;
  data: any;
}) => axios.put(`/categories/${id}`, data).then((res) => res.data);

export const updateVariationReq = async ({
  id,
  data,
}: {
  id?: string;
  data: any;
}) => {
  return axios.put(`/variations/item/${id}`, data).then((res) => res.data);
};

export const deleteVariationReq = async (id?: string) => {
  return axios
    .delete(`/variations/item/${id}`)
    .then((res) => res.data)
    .catch((err: any) => {
      console.log(err);
    });
};

export const deleteVariationOptionReq = async (id?: string) => {
  return axios
    .delete(`/variations/options/item/${id}`)
    .then((res) => res.data)
    .catch((err: any) => {
      console.log(err);
    });
};

export const updateVariationOptionReq = async ({
  id,
  data,
}: {
  id?: string;
  data: any;
}) => axios.put(`/variations/options/item/${id}`, data).then((res) => res.data);
export const promotionsReq = async (id?: string) => {
  return axios.get(`/categories/promotions/${id}`).then((res) => res.data);
};

export const promotionReq = async (id?: string) => {
  return axios.get(`/categories/promotion/calendar`).then((res) => res.data);
};

export const promotionCalendarReq = async () => {
  return axios.get(`/categories/promotions/calendar`).then((res) => res.data);
};

export const createPromotionReq = async (data: PromotionForm) => {
  return axios.post(`/categories/promotions`, data).then((res) => res.data);
};

export const updatePromotionReq = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  return axios.put(`/categories/promotion/${id}`, data).then((res) => res.data);
};

export const getVariationReq = async (id?: string) => {
  return axios.get(`/variations/item/${id}`).then((res) => {
    return res.data;
  });
};

export const categoryCreateReq = async (data: CategoryForm) =>
  axios.post('/categories', data).then((res) => res.data);

export const variationReq = async (id?: string) =>
  axios.get(`/variations/${id && id}`).then((res) => res.data);

export const variationCreateReq = async (data: VariationForm) =>
  axios.post('/variations', data).then((res) => res.data);

export const variationOptionsReq = async (id?: string) =>
  axios.get(`/variations/options/${id}`).then((res) => res.data);

export const getAllVariationOptionOfCategoryReq = async (id?: string) =>
  axios.get(`/variations/products/${id}`).then((res) => res.data);

export const variationOptionCreateReq = async (data: VariationOptionForm) =>
  axios.post(`/variations/options`, data).then((res) => res.data);
