import axios from "./axios";
import QueryString from "qs";
export const getProductsReq = (query?: any) => {
  const urlParams = {
    name: query?.get("keyword"),
    category: query?.get("category"),
    price: query?.get("price"),
    page: query?.get("page"),
  };
  const searchQuery = QueryString.stringify(urlParams, { encode: false });
  return axios.get(`/products?${searchQuery}`).then((res) => {
    return res.data;
  });
};

export const getProductDetailsReq = (id?: string) =>
  axios.get(`/products/item/details/${id}`).then((res) => res.data);
