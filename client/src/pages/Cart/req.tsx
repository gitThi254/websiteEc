import React, { useEffect, useState } from "react";
import { Link, useFormAction, useNavigate } from "react-router-dom";
import ChooseQty from "../../components/ChooseQty";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

const CartReq = ({ carts, shipping }: { carts: any; shipping: any }) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CartOrder>({
    defaultValues: {
      cart_id: [],
      method: "",
    },
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingMethod, setShippingMethod] = useState<string>("");
  const [cart, setCart] = useState<any>(
    carts.map((item: any) => {
      return {
        ...item,
        checked: false,
      };
    })
  );
  useEffect(() => {
    if (cart && shippingMethod) {
      const total = cart.reduce((accumulator: any, currentValue: any) => {
        if (currentValue.checked === true) {
          return accumulator + currentValue.qty * currentValue.price;
        } else {
          return accumulator; // Explicitly return accumulator for unchecked items
        }
      }, 0); // Initialize accumulator to 0

      setTotalPrice(
        Number(total) +
          Number(
            shipping.find((item: any) => item._id === shippingMethod)?.price
          )
      );
    }
  }, [cart, shippingMethod]);

  const handleChecked = (e: any) => {
    setCart((pre: any) => {
      const data = pre.map((item: any) =>
        item._id === e.target.value
          ? { ...item, checked: e.target.checked }
          : item
      );
      return data;
    });
  };
  const onSubmit = (data: CartOrder) => {
    if (cart.some((item: any) => item.checked) && getValues("method")) {
      queryClient.setQueryData(["cart_order"], {
        cart: cart.filter((item: any) => item.checked),
        method: data.method,
        shipping: shipping.find((item: any) => item._id === shippingMethod)
          ?.price,
        total: totalPrice,
      });
      setError("");
      navigate("/order");
    } else if (getValues("method")) {
      setError("Bạn chưa chọn sản phẩm");
    } else if (cart.some((item: any) => item.checked)) {
      setError("Bạn chưa chọn phương thức thanh toán");
    } else {
      setError("Bạn chưa chọn sản phẩm và phương thức thanht toán");
    }
  };
  console.log();
  return (
    <div className="container mx-auto mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row shadow-md my-4">
          <div className="w-full lg:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{carts?.length}</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Select
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Total
              </h3>
            </div>

            {carts?.map((item: any, i: number) => (
              <div
                className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                key={item._id}
              >
                <label htmlFor={item._id} className="flex w-2/5 space-x-4">
                  <input
                    type="checkbox"
                    id={item._id}
                    {...register(`cart_id.${i}`)}
                    value={item._id}
                    onChange={handleChecked}
                  />
                  <div className="w-20">
                    <img
                      className="h-24"
                      src={item.product_image[0].url}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{item?.name}</span>
                    <span className="text-red-500 text-xs">
                      {item?.category}
                    </span>
                    <a
                      href="#"
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    >
                      Remove
                    </a>
                  </div>
                </label>
                <div className="flex justify-center w-1/5">
                  <ChooseQty id={item._id} qty={item.qty} />
                </div>
                <div>
                  {item?.variation_options.map(
                    (variation: string, index: any) => {
                      if (variation.startsWith("#")) {
                        return (
                          <span
                            className="inline-block w-16 h-8"
                            style={{ backgroundColor: `${variation}` }}
                            key={index}
                          ></span>
                        );
                      } else {
                        return <span key={index}>{variation}</span>;
                      }
                    }
                  )}
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {item?.price}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${(item?.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}

            <Link
              to="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="w-full lg:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {cart.filter((item: any) => item.checked).length}
              </span>
              <span className="font-semibold text-sm">
                {totalPrice.toFixed(2)}
              </span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select
                className="block p-2 text-gray-600 w-full text-sm"
                {...register("method")}
                onChange={(e: any) => setShippingMethod(e.target.value)}
              >
                <option value="">select shipping method</option>
                {shipping?.map((item: any) => (
                  <option key={item._id} value={item._id} className="">
                    <span> {item.name} </span> - <span> ${item.price} </span>
                  </option>
                ))}
              </select>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>

            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="text-danger">{error && error}</div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>{totalPrice.toFixed(2)}</span>
              </div>
              <button className="bg-primary/95 font-semibold hover:bg-primary py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CartReq;
