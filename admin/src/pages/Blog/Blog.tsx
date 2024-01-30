import { Link, useParams } from 'react-router-dom';
import { useBlog, useBlogs } from '../../hooks/blog.hook';
import Loader_image from '../../common/Loader_image';

const Blog = () => {
  const { id } = useParams();
  console.log(id);
  const { data: blog, isPending } = useBlog(id);
  if (isPending) return <Loader_image />;

  return (
    <>
      <div>
        <Link
          to="/blogs/list"
          className="inline-flex hover:underline m-7 gap-2"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </span>
          Go Blogs
        </Link>
      </div>
      <div className="dark:bg-gray-800 dark:text-gray-50">
        <div className="container grid grid-cols-12 mx-auto dark:bg-gray-900">
          <div
            className="bg-no-repeat bg-cover dark:bg-gray-700 col-span-full lg:col-span-4 w-[400] h-[600] relative"
            // "background-image: url('https://source.unsplash.com/random/640x480'); background-position: center center; background-blend-mode: multiply; background-size: cover;"
          >
            <img
              src={blog?.images[0]?.url}
              className="w-full bg-blend-multiply object-cover relative"
            />
          </div>
          <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
            <div className="flex justify-start">
              <span className="px-2 py-1 text-xs rounded-full dark:bg-violet-400 dark:text-gray-900">
                {blog?.category?.category_name}
              </span>
            </div>

            <h1 className="text-3xl font-semibold"> {blog?.title}</h1>
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
                  {blog?.author?.firstname} {blog?.author?.lastname}
                </span>
              </div>
              <span className="text-xs">
                {new Date(blog?.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
