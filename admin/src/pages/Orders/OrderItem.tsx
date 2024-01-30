import React from 'react';
import { useMethod, useOrder, useUPdateOrder } from '../../hooks/order.hook';
import Loader_image from '../../common/Loader_image';
import { useParams } from 'react-router-dom';
import { isHtmlElement } from 'react-router-dom/dist/dom';
import { useForm } from 'react-hook-form';

const OrderItem = ({ order, method }: { order: any; method: any }) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateOrder>({
    defaultValues: {
      status: order && order[0]?.status_id,
    },
  });
  const { mutate: updateOrderMutation, isPending: pendingUpdate } =
    useUPdateOrder();
  const onSubmit = (data: any) => {
    updateOrderMutation({ id, data });
  };

  return (
    <>
      <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-4 sm:p-6 xl:p-9">
          <div className="flex flex-col-reverse gap-5 xl:flex-row xl:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row xl:gap-9">
              <div>
                <p className="mb-1.5 font-medium text-black dark:text-white">
                  From
                </p>
                <h4 className="mb-4 text-title-sm2 font-medium leading-[30px] text-black dark:text-white">
                  Roger Culhane
                </h4>
                <a href="#" className="block">
                  <span className="font-medium">Email:</span>
                  contact@example.com
                </a>
                <span className="mt-2 block">
                  <span className="font-medium">Address:</span> 2972 Westheimer
                  Rd. Santa Ana.
                </span>
              </div>
              <div>
                <p className="mb-1.5 font-medium text-black dark:text-white">
                  To
                </p>
                <h4 className="mb-4 text-title-sm2 font-medium leading-[30px] text-black dark:text-white">
                  {order[0]?.user.lastname} {order[0]?.user.firstname}
                </h4>
                <a href="#" className="block">
                  <span className="font-medium">Email:</span>
                  {order[0]?.user?.email}
                </a>
                <span className="mt-2 block">
                  <span className="font-medium">Phone:</span>
                  {order[0]?.user?.phone}
                </span>
                <span className="mt-2 block">
                  <span className="font-medium">Address:</span>
                  {order[0]?.address}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-medium text-black dark:text-white">
              Order #{order[0]._id}
            </h3>
          </div>

          <div className="my-10 rounded-sm border border-stroke p-5 dark:border-strokedark">
            {order[0]?.product_items.map((item: any, index: any) => (
              <div className="items-center sm:flex" key={index}>
                <div className="mb-3 mr-6 h-20 w-20 sm:mb-0">
                  <img
                    src={item.product_image[0].url}
                    alt="product"
                    className="h-full w-full rounded-sm object-cover object-center"
                  />
                </div>
                <div className="w-full items-center justify-between md:flex">
                  <div className="mb-3 md:mb-0">
                    <a
                      href="#"
                      className="inline-block font-medium text-black hover:text-primary dark:text-white"
                    >
                      {item?.product_name}
                    </a>
                    <p className="flex text-sm font-medium">
                      <span
                        className="mr-5 inline-block w-16 h-8"
                        style={{
                          backgroundColor: `${item?.variation[1].value}`,
                        }}
                      ></span>
                      <span className="mr-5">
                        {' '}
                        Size: {item?.variation[0]?.value}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center md:justify-end">
                    <p className="mr-20 font-medium text-black dark:text-white">
                      Qty: {item.qty}
                    </p>
                    <p className="mr-5 font-medium text-black dark:text-white">
                      $ {item.qty * item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 sm:w-1/2 xl:w-3/12">
              <div className="mb-10">
                <h4 className="mb-4 text-title-sm2 font-medium leading-[30px] text-black dark:text-white md:text-2xl">
                  Shipping Method
                </h4>
                <p className="font-medium">{order[0]?.shipping}</p>
              </div>
            </div>
            <div className="w-full px-4 sm:w-1/2 xl:w-3/12">
              <div className="mb-10">
                <h4 className="mb-4 text-title-sm2 font-medium leading-[30px] text-black dark:text-white md:text-2xl">
                  Payment Method
                </h4>
                <p className="font-medium">{order[0]?.payment_method_name}</p>
              </div>
            </div>
            <div className="w-full px-4 xl:w-6/12">
              <div className="mr-10 text-right md:ml-auto">
                <div className="ml-auto sm:w-1/2">
                  <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
                    <span> Subtotal </span>
                    <span>
                      {' '}
                      ${' '}
                      {(order[0].order_total - order[0].shipping_price).toFixed(
                        2,
                      )}{' '}
                    </span>
                  </p>
                  <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
                    <span> Shipping Cost (+) </span>
                    <span> $ {order[0].shipping_price.toFixed(2)} </span>
                  </p>
                  <p className="mb-4 mt-2 flex justify-between border-t border-stroke pt-6 font-medium text-black dark:border-strokedark dark:text-white">
                    <span> Total Payable </span>
                    <span> $ {order[0]?.order_total.toFixed(2)}</span>
                  </p>
                </div>

                <form
                  className="mt-10 flex flex-col justify-end gap-4 sm:flex-col"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-5.5">
                    <label className="mb-3 block text-lg font-medium text-black dark:text-white">
                      Trạng thái đơn hàng
                    </label>
                    <div
                      x-data="{ isOptionSelected: false }"
                      className="relative z-20 bg-transparent dark:bg-form-input"
                    >
                      <select
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        {...register('status')}
                        disabled={
                          order[0]?.status_id === '65a5ec884a4a86cae890b661'
                        }
                      >
                        {method?.map((item: any) => (
                          <option
                            key={item._id}
                            value={item._id}
                            className="text-body"
                          >
                            {item.status}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
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
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <button
                    className="flex items-center justify-center rounded bg-primary px-8 py-2.5 text-center font-medium text-gray hover:bg-opacity-90"
                    disabled={
                      pendingUpdate || order[0]?.status_id === watch('status')
                    }
                  >
                    {pendingUpdate
                      ? 'Loading...'
                      : 'Cập nhật trạng thái đơn hàng'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
