import qs from 'qs';
import axios from './axios';

export const loginReq = (data: SignIn) =>
  axios.post('users/login-admin', data).then((res) => res.data);

export const verifyReq = async () =>
  axios.get('/users/verify').then((res) => {
    return res.data;
  });

export const getUsersReq = async (query?: any) => {
  const urlParams = {
    name: query?.get('keyword'),
    role: query?.get('role'),
  };
  const searchQuery = qs.stringify(urlParams, { encode: false });
  return axios.get(`/users/all-users?${searchQuery}`).then((res) => {
    return res.data;
  });
  return axios.get('/users/all-users').then((res) => {
    return res.data;
  });
};

export const logoutReq = async () =>
  axios.post('/users/logout').catch((err) => {
    console.log('error');
  });
