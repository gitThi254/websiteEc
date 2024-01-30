import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateOrder } from "../../hooks/order.hook";
import Model from "../../components/Model";

const Order = ({
  cart,
  user,
  shipping,
}: {
  cart: any;
  user: any;
  shipping: any;
}) => {
  const [address, setAddress] = useState<any>(user.address.default);
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Order>({
    defaultValues: {
      payment_method_id: "",
      shipping_address: user?.address?.default?._id ?? "",
      shipping_method: cart?.method ?? "",
      order_status: "65a5ec3f4a4a86cae890b658",
      order_total: cart?.total ?? 0,
    },
  });
  const { mutate: createOrderMutation, isPending } = useCreateOrder();
  const onSubmit = (data: any) => {
    if (getValues("payment_method_id")) {
      const carts_id = cart?.cart?.map((item: any) => item._id);
      createOrderMutation({ ...data, cart: carts_id });
    } else {
      setError("Bạn chưa chọn cách thanh toán");
    }
  };
  return (
    <div className="container flex lg:flex-row flex-col mt-10 min-h-screen border-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-1 p-20">
          <div className="text">Contact information</div>
          <div className="w-full flex flex-col">
            <label>Email address</label>
            <input
              type="email"
              className="p-2 border-2 rounded-sm"
              value={user.email}
              disabled={true}
            />
          </div>
          <div>
            <h2>Shipping information</h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-10">
                <div className="flex-1 flex flex-col">
                  <label>First name</label>
                  <input
                    type="text"
                    className="p-2 border-2"
                    value={user.firstname}
                    disabled={true}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="p-2 border-2"
                    value={user.lastname}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label>Address</label>
                <input
                  type="text"
                  className="p-2 border-2"
                  value={address?.address_line}
                />
              </div>
              <div className="flex flex-col">
                <label>Apartment, suite, etc.</label>
                <input
                  type="text"
                  className="p-2 border-2"
                  value={address?.unit_number}
                />
              </div>
              <div className="flex gap-10">
                <div className="flex-1 flex flex-col">
                  <label>region</label>
                  <input
                    type="text"
                    className="p-2 border-2"
                    value={address?.region}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label>postal code</label>
                  <input
                    type="text"
                    className="p-2 border-2"
                    value={address?.postal_code}
                  />
                </div>
              </div>
              <div className="flex gap-10">
                <div className="flex-1 flex flex-col">
                  <label>unit number</label>
                  <input
                    type="text"
                    className="p-2 border-2"
                    value={address?.unit_number}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label>street number</label>
                  <input
                    type="text"
                    className="p-2 border-2"
                    value={address?.street_number}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>City</label>
                <input
                  type="text"
                  className="p-2 border-2"
                  value={address?.city}
                />
              </div>
              <div className="flex flex-col">
                <label>Phone</label>
                <input
                  type="text"
                  className="p-2 border-2"
                  value={user?.phone}
                />
              </div>
              <hr />
              <div>
                <div className="flex flex-col gap-2">
                  <div>Payment</div>
                  <div className="flex gap-10">
                    {shipping.map((item: any) => (
                      <div className="space-x-2" key={item._id}>
                        <label htmlFor={item._id}>
                          {item?.name}

                          <input
                            type="radio"
                            id={item._id}
                            {...register("payment_method_id")}
                            value={item._id}
                          />
                        </label>
                      </div>
                    ))}
                    <div className="text-danger">{error}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col p-20">
          <div className="text">Order summary</div>
          <hr />
          {cart?.cart?.map((item: any) => (
            <div className="flex justify-between p-6" key={item._id}>
              <div className="flex gap-4">
                <img
                  src={item.product_image[0].url}
                  className="h-[150px] object-contain"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <p>{item.name}</p>
                    {item?.variation_options.map(
                      (variation: string, index: any) => {
                        if (variation.startsWith("#")) {
                          return (
                            <p
                              className="inline-block w-16 h-8"
                              style={{ backgroundColor: `${variation}` }}
                              key={index}
                            ></p>
                          );
                        } else {
                          return <p key={index}>{variation}</p>;
                        }
                      }
                    )}
                  </div>
                  <div>$32.00</div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="text-end">Delete</div>
                <div>
                  <input
                    type="number"
                    value={item?.qty}
                    className="w-[60px] border-2 px-2 py-1"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="bg-sky-100 flex flex-col">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div>Subtotal</div>
                <div>
                  $ {(Number(cart?.total) - Number(cart?.shipping)).toFixed(2)}{" "}
                </div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>$ {cart?.shipping?.toFixed(2)}</div>
              </div>
            </div>
            <hr />
            <div className="flex justify-between">
              <div>Total</div>
              <div>$ {cart?.total?.toFixed(2)}</div>
            </div>
            <Model
              model="Xác nhận đặt hàng"
              title="Bạn có đặt hàng không"
              description="Hàng sẽ được giao từ 3 đến 4 ngày"
              button="Xác nhận"
              pending={isPending}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
