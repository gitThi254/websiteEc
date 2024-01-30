import Breadcrumb from '../../components/Breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema } from '../../schemas/formSchema';
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
} from '../../hooks/category.hook';

const CategoryForm = ({ category }: { category: any }) => {
  const location = useLocation().pathname.split('/')[2];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>({
    defaultValues:
      location === 'edit'
        ? {
            category_name: category.category_name,
            parent_category_id: category.parent_category_id
              ? category.parent_category_id
              : '',
          }
        : {
            category_name: '',
            parent_category_id: '',
          },
    resolver: yupResolver(categorySchema),
  });
  const {
    mutate: createCategoryMutation,
    isPending,
    error,
  } = useCreateCategory();

  const {
    mutate: updateCategoryMutation,
    isPending: pending,
    error: err,
  } = useUpdateCategory();
  const { data: categories } = useCategories();
  const onSubmit = (data: CategoryForm) => {
    if (location === 'edit') {
      updateCategoryMutation({ id: category._id, data });
    } else {
      createCategoryMutation(data);
    }
  };
  console.log();
  return (
    <>
      <Breadcrumb pageName={`category form ${location}`} />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <Link
              to="/categories/list"
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
              Go Categories
            </Link>
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="text-danger text-center mb-4">
                {error?.message} {err?.message}
              </div>

              <h3 className="font-medium text-black dark:text-white">
                Category form {location}
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category name
                  </label>
                  <input
                    type="text"
                    placeholder="category name"
                    {...register('category_name')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <div className="text-danger">
                    {errors?.category_name?.message}
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category Parents
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      {...register('parent_category_id')}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">--choose-category-parents--</option>
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
                      {errors?.parent_category_id?.message}
                    </div>
                  </div>
                </div>

                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray uppercase"
                  disabled={isPending || pending}
                >
                  {isPending || pending ? 'Loading...' : `${location} category`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
