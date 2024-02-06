import QueryString from 'qs';
import axios from './axios';

export const productsReq = async (query?: any) => {
  const urlParams = {
    name: query?.get('keyword'),
    category: query?.get('category'),
    page: query?.get('page'),
    price: query?.get('price'),
  };
  const searchQuery = QueryString.stringify(urlParams, { encode: false });
  return axios.get(`/products?${searchQuery}`).then((res) => {
    return res.data;
  });
};

export const productReq = (id?: string) =>
  axios
    .get(`/products/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err: any) => {});

export const deleteProductReq = (id?: string) =>
  axios
    .delete(`/products/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });

export const updateProductReq = ({ id, data }: { id?: string; data: any }) =>
  axios
    .put(`/products/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });

export const createProductReq = async (data: ProductForm) =>
  axios.post('/products', data).then((res) => {
    return res.data;
  });

export const productItemsReq = (id?: string) =>
  axios.get(`/products/items/${id}`).then((res) => {
    return res.data;
  });

export const productItemReq = (id?: string) =>
  axios.get(`/products/item/${id}`).then((res) => {
    return res.data;
  });

export const deleteProductItemReq = (id?: string) =>
  axios.delete(`/products/item/${id}`).then((res) => {
    return res.data;
  });
export const updateProductItemReq = ({
  id,
  data,
}: {
  id?: string;
  data: any;
}) =>
  axios.put(`/products/item/${id}`, data).then((res) => {
    return res.data;
  });
export const createProductItemReq = async ({
  id,
  data,
}: {
  id: string;
  data: ProductItemForm;
}) => {
  return axios.post(`/products/items/${id}`, data).then((res) => {
    return res.data;
  });
};
