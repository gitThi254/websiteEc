import axios from './axios';
export const analystBasicReq = async () =>
  axios.get('/analyst/basic').then((res) => res.data);

export const analystOrderReq = async () =>
  axios.get('/analyst/order').then((res) => res.data);

export const analystOrderOfWeekReq = async () =>
  axios.get('/analyst/order/week').then((res) => res.data);
