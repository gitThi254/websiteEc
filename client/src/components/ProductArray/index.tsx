// const products = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://product.hstatic.net/200000182297/product/ak065321612323140218p1399dt_q065421722323040274p899dt__10__b787195444df4563bbb0180177ca0fe5_1024x1024.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://product.hstatic.net/200000182297/product/11_c964d9e129224241a3f3cf74981f302d_1024x1024.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 3,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://product.hstatic.net/200000182297/product/4_312512d58e8440ae8ac0ecaa2dbb8aaf_1024x1024.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 4,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://product.hstatic.net/200000182297/product/6_d29f9167ef7f48828d32062a678a2b0e_1024x1024.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 5,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://product.hstatic.net/200000182297/product/4_f557e3d57fa44a36a58229d9b59cc89d_1024x1024.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 6,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://product.hstatic.net/200000182297/product/sm166221232383040401p899dt_z043121512332130274p599dt_6__8ede1d6d77fd48c19db58c66735628ce_1024x1024.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     promotion: "$40",
//     color: "Black",
//   },
//   {
//     id: 7,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://product.hstatic.net/200000182297/product/3_9f907c8afd6b409aac5a8cfcba158728_1024x1024.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 8,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://product.hstatic.net/200000182297/product/4_aa943f5b008c42ab8546deaa43c611fc_1024x1024.jpg    ",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   // More products...
// ];

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import DropCheckBox from "../DropCheckbox";
import { Colors, Sizies } from "../../data/Data";
import { useProducts } from "../../hooks/product.hook";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";

export default function ProductArray() {
  const { data: products, isPending } = useProducts();
  if (isPending) return <Loader />;

  return (
    <div className="bg-white container mx-auto">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <div className="flex text-start w-full mb-4 justify-between items-center">
          <div>
            <h2 className="text-2xl text-gray-700 text-opacity-80 tracking-widest font-bold title-font mb-1">
              SẢN PHẨM MỚI
            </h2>
          </div>

          <div className="flex w-[200px] justify-between">
            <DropCheckBox variation={Sizies} title="Size" />
            <DropCheckBox variation={Colors} title="Color" />
          </div>
          <div>
            <div>gia</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product: any) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="group relative"
            >
              <div className="aspect-h-1 border aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-80 lg:h-80">
                <img
                  src={product?.image[0]?.url}
                  alt={product?.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full p-4"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div className="flex-1">
                  <h3 className="text-sm text-gray-700">
                    <a href={product?.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product?.name}
                    </a>
                  </h3>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900"></p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    ${" "}
                    {`[${product?.min} - ${product?.max}] - ${product?.count}`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="w-full mx-auto sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                  </span>
                  <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    8
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    9
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    10
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
