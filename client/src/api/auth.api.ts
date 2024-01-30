import axios from "./axios";

export const loginReq = (data: SignIn) =>
  axios.post("users/login", data).then((res) => res.data);

export const verifyReq = async () =>
  axios.get("/users/verify").then((res) => {
    return res.data;
  });

export const getUsersReq = async () =>
  axios.get("/users/all-users").then((res) => {
    return res.data;
  });

export const logoutReq = async () => axios.post("/users/logout");
