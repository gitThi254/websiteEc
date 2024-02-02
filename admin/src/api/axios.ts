import axios from 'axios';
const base_url = import.meta?.env?.VITE_BASE_URL;

const instance = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

export default instance;
