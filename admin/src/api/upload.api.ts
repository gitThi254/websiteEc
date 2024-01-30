import axios from './axios';
export const uploadImageReq = (data: any) => {
  const formData = new FormData();
  for (let i = 0; i < data.length; i++) {
    formData.append('images', data[i]);
  }
  console.log(formData.get('images'));
  return axios
    .post('/uploads', formData)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
};
