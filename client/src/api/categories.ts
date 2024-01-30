import axios from "./axios";
export const categoryReq = async () =>
  axios.get("/categories").then((res) => res.data);
