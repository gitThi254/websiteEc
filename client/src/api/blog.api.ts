import { IdentificationIcon } from "@heroicons/react/16/solid";
import axios from "./axios";
export const blogsReq = async () => axios.get("/blogs").then((res) => res.data);
export const blogReq = async (id?: string) =>
  axios.get(`/blogs/${id}`).then((res) => res.data);

export const likesReq = async (id?: string) =>
  await axios.put("/blogs/likes", { blogId: id }).then((res) => {
    console.log(res.data);
    return res.data;
  });

export const dislikesReq = async (id?: string) =>
  await axios
    .put("/blogs/dislikes", { blogId: id })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => console.log(err));
