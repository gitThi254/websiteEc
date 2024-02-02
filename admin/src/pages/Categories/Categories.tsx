import { Link, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { useCategories, useDeleteCategory } from '../../hooks/category.hook';
import Loader from '../../common/Loader';
import Search from '../../components/btn/Search';
import { useState } from 'react';
import ModelGroupCategory from '../../components/Model/ModelGroupCategory';
import Category from './Category';
import Meta from '../../components/Meta/Meta';

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: categories, isPending } = useCategories(searchParams);
  if (isPending) return <Loader />;
  return (
    <>
      <Meta title={'Mục sản phẩm'} />
      <Search url="categories" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="flex justify-between">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 mb-4 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <span>
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              Thêm mục sản phẩm
            </button>
            <Link
              to="/categories/promotions/create"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 mb-4 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <span>
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              Thêm khuyến mãi
            </Link>
          </div>

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Tên
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Ngày lập
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Mục sản phẩm cha
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  khuyến mại
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Lựa chọn
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((item: any) => (
                <Category item={item} key={item._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModelGroupCategory
        title="Tạo mục sản phẩm"
        description="Form Tạo sản phẩm"
        button="Tạo sản phẩm"
        open={isOpen}
        setOpen={setIsOpen}
        category={categories}
      />
    </>
  );
};

export default Categories;
