import axios from 'axios';
// const base_url = 'https://website-ec.vercel.app/api/v1';
const base_url = 'http://localhost:4000/api/v1/';

// console.log('hello');
// console.log(process.env.VITE_BASE_URL);

const instance = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

export default instance;
