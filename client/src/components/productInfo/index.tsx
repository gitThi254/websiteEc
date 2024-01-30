import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addToCartSchema } from "../../schemas/formSchema";
import { useAddCart } from "../../hooks/cart.hook";

const ProductInfo = ({ data, cart }: { data: any; cart: any }) => {
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AddtoCart>({
    defaultValues: {
      cart_id: cart?._id,
      product_item_id: "",
      qty: undefined,
    },
    resolver: yupResolver(addToCartSchema),
  });
  const [qty_in_stock, setQty_in_stock] = useState<number>(0);
  const [price, setPrice] = useState<number>();
  const [activeImg, setActiveImage] = useState(data?.product_image[0]?.url);
  const { mutate: AddtoCartMutation, isPending } = useAddCart();
  const onSubmit = (data: AddtoCart) => {
    AddtoCartMutation(data);
  };
  useEffect(() => {
    if (watch("product_item_id")) {
      setQty_in_stock(
        data.product_items.find(
          (item: any) => item.product_item_id === watch("product_item_id")
        )?.qty_in_stock
      );
      setPrice(
        data.product_items.find(
          (item: any) => item.product_item_id === watch("product_item_id")
        )?.price
      );
      setActiveImage(
        data.product_items.find(
          (item: any) => item.product_item_id === watch("product_item_id")
        )?.product_image_items[0].url
      );
    }
  }, [watch("product_item_id")]);
  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
      <div className="flex flex-col gap-6 lg:w-2/4 border">
        <img
          src={activeImg}
          alt=""
          className="w-full h-full aspect-square object-cover border-collapse border"
        />
        <div className="flex gap-4 flex-wrap p-4">
          <div>
            <img
              src={data.product_image[0].url}
              alt=""
              className="w-24 h-24 rounded-md cursor-pointer border"
              onClick={() => setActiveImage(data.product_image[0].url)}
            />
          </div>
          {data?.product_items?.map((item: any, i: number) => (
            <div key={i}>
              <img
                src={item?.product_image_items[0].url}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer border"
                onClick={() => setActiveImage(item?.product_image_items[0].url)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <span className=" text-violet-600 font-semibold">
            {data?.category_name}
          </span>
          <h1 className="text-3xl font-bold">{data?.name}</h1>
        </div>
        <p className="text-gray-700">{data?.description}</p>
        <h6 className="text-2xl font-semibold">
          {price ? `$${price}` : "$100-200"}
        </h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6 flex-wrap relative">
            {data?.product_items?.map((item: any, i: number) => (
              <div key={i}>
                <label
                  htmlFor={item.product_item_id}
                  className="cursor-pointer"
                >
                  {item.variations.map((variation: any, index: any) => (
                    <div key={index} className="relative">
                      {variation.variation_name === "color" ? (
                        <span
                          className={`inline-block w-16 h-8 border`}
                          style={{ backgroundColor: variation.value }}
                        ></span>
                      ) : (
                        <span className="">{variation.value}</span>
                      )}
                    </div>
                  ))}
                </label>
                <input
                  type="radio"
                  id={item.product_item_id}
                  value={item.product_item_id}
                  {...register("product_item_id")}
                />
                <div>qty:{item.qty_in_stock}</div>
              </div>
            ))}
            <div className="text-danger">{errors.product_item_id?.message}</div>
          </div>
          <div className="flex flex-col items-start gap-12">
            <div className="flex flex-row items-center">
              <button
                type="button"
                className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                onClick={() =>
                  setValue(
                    "qty",
                    Number(getValues("qty")) < 1
                      ? Number(getValues("qty"))
                      : Number(getValues("qty")) - 1,
                    {
                      shouldValidate: true,
                    }
                  )
                }
              >
                -
              </button>
              <span className="py-4 px-6 rounded-lg">
                {" "}
                <input
                  type="number"
                  min="0"
                  max={qty_in_stock ?? 100}
                  {...register("qty")}
                  className="border"
                />
              </span>

              <button
                type="button"
                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                onClick={() =>
                  setValue(
                    "qty",
                    Number(getValues("qty")) >= qty_in_stock
                      ? Number(getValues("qty"))
                      : Number(getValues("qty")) + 1
                  )
                }
              >
                +
              </button>
              <div>{qty_in_stock}</div>
              <div className="text-danger">{errors.qty?.message}</div>
            </div>
            <div>
              <button
                className="text-white bg-primary font-semibold py-3 px-16 rounded-xl h-full"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductInfo;
