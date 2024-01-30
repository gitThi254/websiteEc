import React from "react";
import { Link, useParams } from "react-router-dom";
import BtnLikes from "../../components/Btn/btnLikes";
import BtnDislike from "../../components/Btn/btnDislike";
import { useBlog } from "../../hooks/blog.hook";
import Loader from "../../common/Loader";
const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isPending } = useBlog(id);
  if (isPending) return <Loader />;

  return (
    <div className="dark:bg-gray-800 dark:text-gray-50">
      <Link to={"/blog"}>go to blogs</Link>
      <div className="container grid grid-cols-12 mx-auto dark:bg-gray-900">
        <div
          className="w-full h-[400px] bg-no-repeat bg-contain dark:bg-gray-700 col-span-full lg:col-span-4"
          style={{
            backgroundImage: `url(${new URL(blog.images[0].url)})`,
            backgroundPosition: "center center",
            backgroundBlendMode: "multiply",
            backgroundSize: "contain",
          }}
        ></div>
        <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
          <div className="flex justify-start">
            <span className="px-2 py-1 text-xs rounded-full dark:bg-violet-400 dark:text-gray-900">
              {blog?.category.category_name}
            </span>
          </div>
          <h1 className="text-3xl font-semibold">{blog?.title}</h1>
          <p className="flex-1 pt-2">{blog?.description}</p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 dark:text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="self-center text-sm">
                by {blog?.author?.firstname}
              </span>
            </div>
            <div className="flex gap-8">
              <BtnLikes id={blog._id} likes={blog?.likes?.length} />
              <BtnDislike id={blog._id} dislikes={blog?.dislikes?.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
