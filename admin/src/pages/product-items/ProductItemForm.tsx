import Breadcrumb from '../../components/Breadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productItemSchema } from '../../schemas/formSchema';
import { useEffect } from 'react';
import { useVariationOptionsOfCategory } from '../../hooks/category.hook';
import Loader from '../../common/Loader';
import VariationSelect from './VariationSelect';
import { useUploadImage } from '../../hooks/upload.hook';
import Loader_image from '../../common/Loader_image';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  useCreateProductItem,
  useUpdateProductItem,
} from '../../hooks/product.hook';

const ProductItemForm = ({ productItem }: { productItem: any }) => {
  const location = useLocation().pathname.split('/')[4];
  const { id, product_item_id } = useParams();
  const { mutate: uploadImageMutation, isPending } = useUploadImage();
  const checkEdit = location === 'edit';
  const { data: variationOptionsOfCategory, isLoading } =
    useVariationOptionsOfCategory(id);
  const { mutate: createProductItemMutation, isPending: isPendingSubmit } =
    useCreateProductItem();
  const { mutate: updateProductItemMutation, isPending: pending } =
    useUpdateProductItem();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductItemForm>({
    defaultValues: {
      product_id: checkEdit ? productItem?.product_id : id,
      SKU: checkEdit ? productItem?.SKU : '',
      qty_in_stock: checkEdit ? productItem?.qty_in_stock : 0,
      price: checkEdit ? productItem?.price : 0,
      variation_option_id: checkEdit ? productItem?.variation_option_id : [],
      product_image: checkEdit ? productItem?.product_image : undefined,
    },
    resolver: yupResolver(productItemSchema),
  });
  const variation_option = watch('SKU')
    ?.split('-')
    ?.map((item: any) => {
      if (item.startsWith('#'))
        return (
          <>
            <span
              className={`border w-20 h-6 inline-block`}
              style={{ backgroundColor: `${item}` }}
              key={item}
            ></span>
          </>
        );
      else return <span key={item}>{item}</span>;
    });

  const { data: images } = useQuery<Image[]>({ queryKey: ['images'] });
  const onSubmit = (data: ProductItemForm) => {
    if (id && location !== 'edit') {
      data.SKU = data?.variation_option_id
        .map((item: any) => item.split('-')[1])
        .join('-');
      data.variation_option_id = data?.variation_option_id.map(
        (item: any) => item.split('-')[0],
      );

      createProductItemMutation({ id, data });
    } else {
      updateProductItemMutation({ id: product_item_id, data });
    }
  };
  const queryClient = useQueryClient();
  useEffect(() => {
    if (location === 'edit') {
      queryClient.setQueryData(['images'], productItem?.product_image);
    }
  }, []);

  useEffect(() => {
    if (images) {
      setValue('product_image', images);
    }
  }, [images]);
  if (!checkEdit && isLoading) return <Loader />;
  return (
    <>
      <div className="grid grid-cols-1 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2">
          <div className="">
            <div className="p-6.5">
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="Quantity"
                  min="0"
                  {...register('qty_in_stock')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></input>
                <div className="text-danger">
                  {errors?.qty_in_stock?.message}
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  min="0"
                  {...register('price')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></input>
                <div className="text-danger">{errors?.price?.message}</div>
              </div>
              <div>
                <div>
                  {checkEdit ? (
                    <div className="flex items-center gap-4">
                      {variation_option}
                    </div>
                  ) : (
                    <>
                      {variationOptionsOfCategory?.map((item: any, i: any) => (
                        <VariationSelect
                          register={register}
                          index={i}
                          variationItem={item}
                          name={Object.keys(item)}
                          key={item._id}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Upload file
                  </label>
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
                      {images?.map((i, j) => (
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
          </div>
          <div className="w-full col-span-2 mb-4.5 px-6.5">
            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray uppercase"
              disabled={isPendingSubmit || pending}
            >
              {isPendingSubmit || pending
                ? 'Loading...'
                : `${location} product item`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductItemForm;
