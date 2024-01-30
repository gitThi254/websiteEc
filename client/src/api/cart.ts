import axios from "./axios";
export const cartsReq = async () => axios.get("/carts").then((res) => res.data);

export const addCartReq = async (data: any) =>
  axios.post(`/carts/${data.cart_id}`, data).then((res) => res.data);

export const updateCartReq = async ({ id, data }: { id: string; data: any }) =>
  axios.put(`/carts/${id}`, data).then((res) => res.data);

export const getCartItemReq = async () =>
  axios.get(`/carts/items`).then((res) => res.data);

export const getShippingMethodReq = async () =>
  await axios.get("/orders/shipping-method").then((res) => res.data);

export const getShipingMethodsReq = async () =>
  await axios.get("/orders/payment-methods").then((res) => res.data);
