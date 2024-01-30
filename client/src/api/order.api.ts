import QueryString from "qs";
import axios from "./axios";
export const createOrdersReq = async (data: any) =>
  axios
    .post("/orders", data)
    .then((res) => res.data)
    .catch((err: any) => {
      return err;
    });

export const getAllOrderReq = async (query?: any) => {
  const urlParams = {
    name: query?.get("keyword"),
    status: query?.get("status"),
    page: query?.get("page"),
  };
  const searchQuery = QueryString.stringify(urlParams, { encode: false });
  return axios
    .get(`/orders/get-all-orders?${searchQuery}`)
    .then((res) => res.data);
};

export const getMethodReq = async () => {
  return axios.get(`orders/order-status`).then((res) => res.data);
};
