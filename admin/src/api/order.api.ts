import axios from './axios';
import qs from 'qs';
export const getAllOrdersReq = async (query?: any) => {
  const urlParams = {
    name: query?.get('keyword'),
    status: query?.get('status'),
    page: query?.get('page'),
  };
  const searchQuery = qs.stringify(urlParams, { encode: false });
  return axios
    .get(`orders/get-all-orders-admin?${searchQuery}`)
    .then((res) => res.data);
};

export const getOrderReq = async (id?: string) => {
  return axios.get(`orders/get-all-orders-admin/${id}`).then((res) => res.data);
};

export const updateOrderReq = async ({
  id,
  data,
}: {
  id?: string;
  data: any;
}) => {
  return axios
    .put(`orders/get-all-orders-admin/${id}`, data)
    .then((res) => res.data);
};

export const getMethodReq = async () => {
  return axios.get(`orders/order-status`).then((res) => res.data);
};
