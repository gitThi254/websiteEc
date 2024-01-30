import { useState } from "react";
import image from "../images/iphone-1.jpg";
import { useProducts } from "../hooks/product.hook";
import Loader from "../common/Loader";
import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";
import SelectPrice from "./SelectPrice";
import { useCategories } from "../hooks/category.hook";
import Pagination_page from "./Pagination_page";
import { useCartItems } from "../hooks/cart.hook";
const DataGrid = () => {
  const [search, setSearch] = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  const { data: products, isPending } = useProducts(search);
  const { data: categories, isPending: pending } = useCategories();
  const { data: cart, isPending: pendingCart } = useCartItems();

  if (isPending || pending || pendingCart) return <Loader />;
  return (
    <div className="container mx-auto my-5">
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="col-span-12">
          <div className="flex justify-center items-center flex-wrap lg:justify-between">
            <div className="mb-2 flex"></div>
            <Search url="products" />
          </div>
        </div>
      </div>
      <div className="ul-ecommerce-wrapper relative">
        <div className="ul-ecommerce-sidebar-overlay"></div>
        <div className={`ul-ecommerce-sidebar ${open ? "open" : ""}`}>
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-5">
                <Link
                  to="/cart"
                  className="btn btn btn-block btn-primary"
                  type="button"
                >
                  Xem giỏ hàng{" "}
                  <span className="badge float-right text-white bg-warning-500 mr-3">
                    {cart.length}
                  </span>
                </Link>
              </div>
              <SelectPrice
                data={[
                  { value: 1, name: "price", title: "Thấp đến cao" },
                  { value: -1, name: "price", title: "Cao đến thấp" },
                ]}
              />

              <SelectPrice
                data={categories.map((item: any) => {
                  return {
                    value: item._id,
                    name: "category",
                    title: item.category_name,
                  };
                })}
              />
              <p className="text-primary-500 font-bold mb-2">Brand </p>
              <div className="mb-1">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="form-checkbox rounded text-primary-500 border border-gray-200 bg-gray-200"
                    type="checkbox"
                  />
                  <span className="ml-2">apple(3)</span>
                </label>
              </div>
              <div className="mb-1">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="form-checkbox rounded text-primary-500 border border-gray-200 bg-gray-200"
                    type="checkbox"
                  />
                  <span className="ml-2">Huwaei(1)</span>
                </label>
              </div>
              <div className="mb-1">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="form-checkbox rounded text-primary-500 border border-gray-200 bg-gray-200"
                    type="checkbox"
                  />
                  <span className="ml-2">sony(3)</span>
                </label>
              </div>
              <div className="mb-1">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="form-checkbox rounded text-primary-500 border border-gray-200 bg-gray-200"
                    type="checkbox"
                  />
                  <span className="ml-2">samsung(2)</span>
                </label>
              </div>
              <div className="mb-1">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="form-checkbox rounded text-primary-500 border border-gray-200 bg-gray-200"
                    type="checkbox"
                  />
                  <span className="ml-2">xiaomi(2)</span>
                </label>
              </div>
              <div className="mb-5">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="form-checkbox rounded text-primary-500 border border-gray-200 bg-gray-200"
                    type="checkbox"
                  />
                  <span className="ml-2">asus(2)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="ul-ecommerce-container">
          <div className="grid grid-cols-12 gap-5 mb-5">
            {products?.products?.map((item: any) => (
              <div
                className="col-span-12 xl:col-span-4 md:col-span-6"
                key={item._id}
              >
                <div className="card overflow-hidden w-full relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-80 lg:h-80">
                    <img
                      src={item?.image[0]?.url}
                      alt={item?.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="card-body">
                    <div className="mb-1">
                      <a
                        className="text-graydark/95 hover:text-graydark line-clamp-2 line h-12"
                        href="#"
                      >
                        {item?.name}
                      </a>
                    </div>
                    <p className="font-semibold mb-4">
                      {item?.category[0]?.category_name}
                    </p>
                    <div className="flex justify-between">
                      <div className="flex mb-2">
                        <span className="material-icons text-warning-500">
                          grade
                        </span>
                        <span className="material-icons text-warning-500">
                          grade
                        </span>
                        <span className="material-icons text-warning-500">
                          grade
                        </span>
                        <span className="material-icons text-warning-500">
                          grade
                        </span>
                        <span className="material-icons text-gray-300">
                          grade
                        </span>
                      </div>
                      <p className="font-bold text-base mb-5">
                        ${item?.min} - ${item?.max}
                      </p>
                    </div>
                    <div className="flex justify-between flex-wrap">
                      <button
                        className="btn ripple btn-primary mb-2"
                        type="button"
                      >
                        Add Cart
                      </button>
                      <Link
                        preventScrollReset={false}
                        to={`/products/${item?.id}`}
                        className="btn btn-primary-outline mb-2"
                        type="button"
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination_page itemsPerPage={6} items={products.totalPage} />
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
