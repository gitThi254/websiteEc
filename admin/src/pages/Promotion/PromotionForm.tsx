import Breadcrumb from '../../components/Breadcrumb';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PromotionSchema, variationSchema } from '../../schemas/formSchema';
import {
  useCategories,
  useCreatePromotion,
  useCreateVariation,
  useUpdatePromotion,
} from '../../hooks/category.hook';
import Loader from '../../common/Loader';

function convertDateTimeToDate(dateTime: string): any {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Đảm bảo tháng có 2 chữ số
  const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo ngày có 2 chữ số
  return `${year}-${month}-${day}`;
}

const PromotionForm = ({
  promotion,
  categories,
}: {
  promotion?: any;
  categories: any;
}) => {
  const location = useLocation().pathname.split('/')[3];
  const { id } = useParams();
  const check = location === 'edit';
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PromotionForm>({
    defaultValues: {
      name: check ? promotion.name : '',
      description: check ? promotion.description : '',
      discount_rate: check ? promotion.discount_rate : undefined,
      start_date: check
        ? convertDateTimeToDate(promotion.start_date)
        : undefined,
      end_date: check ? convertDateTimeToDate(promotion.end_date) : undefined,
      category: check ? promotion.category : [],
    },
    resolver: yupResolver(PromotionSchema),
  });
  console.log(categories);
  const { mutate: CreatePromotion, isPending } = useCreatePromotion();
  const { mutate: updatePromotion, isPending: pending } = useUpdatePromotion();

  const onSubmit = (data: PromotionForm) => {
    data.category = data.category.filter((item: any) => item !== false);

    if (location === 'edit') {
      updatePromotion({ id: promotion._id, data });
    } else {
      CreatePromotion(data);
    }
  };
  return (
    <>
      <Breadcrumb pageName={`promotion form ${location}`} />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <Link
                to="/categories/list"
                className="inline-flex hover:underline gap-2"
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
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Promotion name
                  </label>
                  <input
                    type="text"
                    placeholder="promotion name"
                    {...register('name')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <div className="text-danger">{errors?.name?.message}</div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Discount rate %
                  </label>
                  <input
                    type="number"
                    placeholder="category name"
                    {...register('discount_rate')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <div className="text-danger">
                    {errors?.discount_rate?.message}
                  </div>
                </div>
                <div>
                  <div className="mb-4.5 flex gap-4">
                    {categories?.map((item: any, i: any) => (
                      <div className="flex gap-2" key={item._id}>
                        <label>{item.category_name}</label>
                        <input
                          type="checkbox"
                          {...register(`category.${i}`)}
                          value={item._id}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-10 m-2">
                    <div className="flex-1">
                      <label className="mb-3 block text-black dark:text-white">
                        Start Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          {...register('start_date')}
                          className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="text-danger">
                        {errors?.start_date?.message}
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="mb-3 block text-black dark:text-white">
                        End Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          {...register('end_date')}
                          className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="text-danger">
                        {errors?.end_date?.message}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Description"
                      {...register('description')}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>
                  <div className="text-danger">
                    {errors?.description?.message}
                  </div>
                </div>

                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray uppercase"
                  disabled={isPending || pending}
                >
                  {isPending || pending
                    ? 'Loading...'
                    : `${location} promotion`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionForm;
