import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { useVariations } from '../../hooks/category.hook';
import Loader from '../../common/Loader';
import Search from '../../components/btn/Search';
import { useState } from 'react';
import ModelVariation from './ModelVariation';
import Variation from './Variation';
import Meta from '../../components/Meta/Meta';

const Variations = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: variations, isPending } = useVariations(id);

  if (isPending) return <Loader />;
  return (
    <>
      <Meta title="Biến thể" />
      <Search url={`/categories/${id}/variations`} />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <Link
          to="/categories"
          className="inline-flex hover:underline m-7 gap-2"
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </span>
          Go Categories
        </Link>
        <div className="max-w-full overflow-x-auto">
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
            Tạo lựa chọn
          </button>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Date of creation
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  category
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {variations?.map((item: any) => (
                <Variation item={item} key={item._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModelVariation
        title="Form tạo Lựa chọn"
        description="Vui lòng diền vào form này!"
        open={isOpen}
        setOpen={setIsOpen}
        button="Tạo lựa chọn"
        category_id={id}
      />
    </>
  );
};

export default Variations;
