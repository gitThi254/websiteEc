import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema } from '../../schemas/formSchema';
import {
  useCreateCategory,
  useUpdateCategory,
} from '../../hooks/category.hook';
import { Link } from 'react-router-dom';

const ModelGroupCategory = ({
  title,
  description,
  button,
  open,
  setOpen,
  data,
  category,
}: {
  title: string;
  description: string;
  button: string;
  open: any;
  setOpen: (x: boolean) => void;
  data?: any;
  category: any;
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>({
    defaultValues: {
      category_name: data ? data?.category_name : '',
      parent_category_id: data ? data?.parent_category_id : '',
    },
    resolver: yupResolver(categorySchema),
  });
  const { mutate: createCategoryMutation, isPending } = useCreateCategory();
  const { mutate: updateCategoryMutation, isPending: pending } =
    useUpdateCategory();
  const onSubmit = (dataCategory: any) => {
    Object.keys(dataCategory).forEach((key) => {
      if (dataCategory[key] === 0 || dataCategory[key] === '') {
        delete dataCategory[key];
      }
    });
    if (data !== undefined) {
      updateCategoryMutation({ id: data._id, data: dataCategory });
    } else {
      createCategoryMutation(dataCategory);
    }
    setOpen(false);
    reset();
  };
  return (
    <>
      <div>
        <div className="flex flex-wrap justify-center gap-5">
          <div x-data="{modalOpen: false}">
            <div
              className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
              style={{ display: open ? '' : 'none' }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col justify-center max-w-142.5 h-full rounded-lg bg-stroke px-8 text-center dark:bg-boxdark md:px-17.5 md:py-15"
              >
                <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  {title}
                </h3>
                <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
                <p className="mb-4 font-medium">{description}</p>
                <div className="flex flex-col gap-4 mb-4">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white text-start">
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
                    <label className="mb-2.5 block text-black dark:text-white text-start">
                      Category Parents
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        {...register('parent_category_id')}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">--choose-category-parents--</option>
                        {category?.map((item: any) => (
                          <option value={item?._id} key={item._id}>
                            {item?.category_name}
                          </option>
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
                </div>
                <div className="-mx-3 flex flex-wrap gap-y-4">
                  <div className="w-full px-3 2xsm:w-1/2">
                    <Link
                      to={'/categories'}
                      className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Link>
                  </div>
                  <div className="w-full px-3 2xsm:w-1/2">
                    <button
                      className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                      disabled={isPending || pending}
                    >
                      {isPending || pending ? 'Loading...' : button}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelGroupCategory;
