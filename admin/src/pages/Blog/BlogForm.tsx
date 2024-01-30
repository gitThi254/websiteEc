import React, { useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { blogSchema } from '../../schemas/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUploadImage } from '../../hooks/upload.hook';
import Loader_image from '../../common/Loader_image';
import { useCreateBlog } from '../../hooks/blog.hook';
import { useUpdateBlog } from '../../hooks/category.hook';

const BlogForm = ({ categories, blog }: { categories: any; blog?: any }) => {
  const location = useLocation().pathname.split('/')[2];
  const check = location === 'edit';
  const { id } = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogForm>({
    defaultValues: {
      category_id: check ? blog.category._id : '',
      title: check ? blog.title : '',
      description: check ? blog.description : '',
      images: check ? blog.images : undefined,
    },
    resolver: yupResolver(blogSchema),
  });
  const { data: images } = useQuery<any>({ queryKey: ['images'] });
  const { mutate: uploadImageMutation, isPending } = useUploadImage();
  const { mutate: createBlogMutation, isPending: pending } = useCreateBlog();
  const { mutate: updateBlogMutation, isPending: updatePending } =
    useUpdateBlog();

  const onSubmit = (data: BlogForm) => {
    if (location === 'edit') {
      updateBlogMutation({ id, data });
    } else {
      createBlogMutation(data);
    }
  };
  useEffect(() => {
    if (images) {
      setValue('images', images);
    }
  }, [images]);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (location === 'edit') {
      queryClient.setQueryData(['images'], blog.images);
    }
  }, []);
  return (
    <>
      <Breadcrumb pageName={`blog form ${location}`} />

      <div className="grid grid-cols-1 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
          Go blogs
        </Link>
        <div className="flex flex-col col-span-2 span">
          {/* <!-- Contact Form --> */}
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              product form {location}
            </h3>
          </div>
        </div>
        <form className="grid grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  title
                </label>
                <input
                  type="text"
                  placeholder="title"
                  {...register('title')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <div className="text-danger">{errors?.title?.message}</div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Category
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register('category_id')}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">--choose-category--</option>
                    {categories?.map((item: any) => (
                      <option value={item?._id}>{item?.category_name}</option>
                    ))}
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <div className="text-danger">
                    {errors?.category_id?.message}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Description"
                  {...register('description')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
                <div className="text-danger">
                  {errors?.description?.message}
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Upload file
                </label>
                <div className="text-danger"></div>
                <input
                  type="file"
                  name="images"
                  onChange={(e: any) => uploadImageMutation(e.target.files)}
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
              </div>
              <div className="w-[230px] h-[300px] self-center border-2 relative">
                {isPending ? (
                  <Loader_image />
                ) : (
                  <>
                    {images?.map((i: any, j: any) => (
                      <div key={j} className="relative w-full h-full p-8">
                        <img
                          src={i.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full col-span-2 mb-4.5 px-6.5">
            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray uppercase"
              disabled={pending || updatePending}
            >
              {pending || updatePending ? 'Loading...' : `${location} product`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
