import { Link, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import {
  useDeleteVariationOption,
  useVariationOptions,
} from '../../hooks/category.hook';
import Loader from '../../common/Loader';
import { useState } from 'react';
import ModelVariationOption from './ModelVariationOption';
import VariationOption from './VariationOption';
import Meta from '../../components/Meta/Meta';
import Empty from '../../components/Empty';

const VariationOptions = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { variation_id, id } = useParams();

  const { data: variationOptions, isPending } = useVariationOptions(
    id,
    variation_id,
  );

  if (isPending) return <Loader />;
  return (
    <>
      <Meta title="Lựa chọn biến thể" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <Link
          to={`/categories/${id}/variations/${variation_id}`}
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
          Go variations
        </Link>
        {variationOptions?.length !== 0 ? (
          <>
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
                Thêm Lựa chọn biến thể
              </button>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Value
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Date of creation
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      variation
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {variationOptions?.map((item: any) => (
                    <VariationOption item={item} key={item._id} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <Empty title="Lựa chọn biến thể trống" />
          </>
        )}
      </div>
      <ModelVariationOption
        title="Form tạo lựa chọn biến thể"
        description="Vui lòng nhập form"
        button="Tạo Lựa chọn biết thể"
        open={isOpen}
        setOpen={setIsOpen}
      />
    </>
  );
};

export default VariationOptions;
