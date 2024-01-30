import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import DropdownUser from "./DropdownUser";
import { useCategories } from "../../hooks/category.hook";
import { useCartItems } from "../../hooks/cart.hook";

const callsToAction: any = [];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { data: categories } = useCategories();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const { data: cart, isPending: pendingCart } = useCartItems();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="bg-white z-99999 w-full">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setIsOpen((pre) => !pre)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/products"
            className="text-sm hover:text-graydark hover:rounded-sm font-semibold leading-6 text-gray-900"
          >
            Sản phẩm
          </Link>

          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Loại
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {categories &&
                    categories.map((item: any) => (
                      <div
                        key={item._id}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex-auto">
                          <a
                            href={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.category_name}
                            <span className="absolute inset-0" />
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item: any) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            to="/about"
            className="text-sm hover:text-graydark font-semibold leading-6 text-gray-900"
          >
            Về chúng tôi
          </Link>
          <Link
            to="/blog"
            className="text-sm hover:text-graydark font-semibold leading-6 text-gray-900"
          >
            Bài viết
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold hover:text-graydark leading-6 text-gray-900"
          >
            Liên hệ chúng tôi
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-6">
          <div className="flex gap-6">
            <Link
              to="/cart"
              className="relative inline-flex items-center p-3 rounded-full text-sm font-medium text-center text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none border-2"
            >
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
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-danger  border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                {cart?.length ?? 0}
              </div>
            </Link>
            <button
              type="button"
              className="relative inline-flex items-center p-3 rounded-full text-sm font-medium text-center text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-2"
            >
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
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>

              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-danger border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                20
              </div>
            </button>
          </div>
          <DropdownUser />
        </div>
      </nav>
      <div className={`sm:hidden ${isOpen ? "hidden" : ""}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            className="text-white bg-black block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Trang chủ
          </Link>
          <Link
            to="/products"
            className="text-black hover:bg-black hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            sản phẩm
          </Link>
          <a
            href="#"
            className="text-black hover:bg-black hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Loại
          </a>
          <a
            href="/about"
            className="text-black hover:bg-black hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Về chúng tôi
          </a>
          <Link
            to="/blog"
            className="text-black hover:bg-black hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Bài viết
          </Link>
          <Link
            to="/contact"
            className="text-black hover:bg-black hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Liện hệ chúng tôi
          </Link>
        </div>
      </div>
    </div>
  );
}
