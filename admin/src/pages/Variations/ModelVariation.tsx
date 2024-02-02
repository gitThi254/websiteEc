import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { variationSchema } from '../../schemas/formSchema';
import {
  useCreateVariation,
  useUpdateVariation,
} from '../../hooks/category.hook';
import { Link, useParams } from 'react-router-dom';

const ModelVariation = ({
  title,
  description,
  button,
  open,
  setOpen,
  data,
  category_id,
}: {
  title: string;
  description: string;
  button: string;
  open: any;
  setOpen: (x: boolean) => void;
  data?: any;
  category_id?: string;
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<VariationForm>({
    defaultValues: {
      name: data ? data?.name : '',
      category_id: category_id ? category_id : '',
    },
    resolver: yupResolver(variationSchema),
  });
  const { mutate: createCategoryMutation, isPending } = useCreateVariation();
  const { id } = useParams();
  const { mutate: updateCategoryMutation, isPending: pending } =
    useUpdateVariation();
  const onSubmit = (dataVariation: VariationForm) => {
    if (data !== undefined) {
      updateCategoryMutation({ id: data._id, data: dataVariation });
    } else {
      createCategoryMutation(dataVariation);
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
                      Variation name
                    </label>
                    <input
                      type="text"
                      placeholder="category name"
                      {...register('name')}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <div className="text-danger">{errors?.name?.message}</div>
                  </div>
                </div>
                <div className="-mx-3 flex flex-wrap gap-y-4">
                  <div className="w-full px-3 2xsm:w-1/2">
                    <Link
                      to={`/categories/${id}/variations`}
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

export default ModelVariation;
