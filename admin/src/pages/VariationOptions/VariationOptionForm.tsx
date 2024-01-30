import Breadcrumb from '../../components/Breadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { variationOptionSchema } from '../../schemas/formSchema';
import {
  useCreateOptionVariation,
  useUpdateVariationOption,
} from '../../hooks/category.hook';

const VariationOptionForm = ({ variationOption }: { variationOption: any }) => {
  const location = useLocation().pathname.split('/')[3];
  const params = useParams();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<VariationOptionForm>({
    defaultValues: {
      value: location === 'edit' ? variationOption.value : '',
      variation_id:
        location === 'edit' ? variationOption.variation_id._id : params.id,
    },
    resolver: yupResolver(variationOptionSchema),
  });
  const {
    mutate: createOptionVariation,
    isPending,
    error,
  } = useCreateOptionVariation();

  const {
    mutate: updateOptionVariation,
    isPending: pending,
    error: err,
  } = useUpdateVariationOption();
  const onSubmit = (data: VariationOptionForm) => {
    console.log(data);
    if (location === 'edit') {
      console.log('hello');
      updateOptionVariation({ id: variationOption._id, data });
    } else {
      createOptionVariation(data);
    }
  };
  return (
    <>
      <Breadcrumb pageName={`variation option form ${location}`} />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="text-danger text-center m-4">
                {error?.message} {err?.message}
              </div>
              <h3 className="font-medium text-black dark:text-white">
                Variation option form {location}
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Value
                  </label>
                  <input
                    type="text"
                    placeholder="category name"
                    {...register('value')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <div className="text-danger">{errors?.value?.message}</div>
                </div>

                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray uppercase"
                  disabled={isPending || pending}
                >
                  {isPending || pending
                    ? 'Loading...'
                    : `${location} variation option`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VariationOptionForm;
