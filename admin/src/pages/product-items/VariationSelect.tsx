import { useState } from 'react';

const VariationSelect = ({
  variationItem,
  name,
  register,
  index,
}: {
  variationItem: any;
  name: any;
  register: any;
  index: any;
}) => {
  const [isItems, setIsItems] = useState<any>(
    variationItem[name].map((item: any) => {
      return { ...item, checked: false };
    }),
  );
  return (
    <>
      <div className="flex items-center gap-4 mb-6 ">
        <div className="block text-black dark:text-white capitalize">
          {name}
        </div>
        <div className="flex gap-4 flex-wrap items-center">
          {isItems?.map((item: any, i: any) => (
            <div key="item" className="flex items-center">
              <label htmlFor={name + i}>
                {name[0] === 'color' ? (
                  <span
                    className={`border w-20 h-6 inline-block`}
                    style={{ backgroundColor: `${item.value}` }}
                  ></span>
                ) : (
                  item.value
                )}
                -
              </label>{' '}
              <input
                type="radio"
                id={name + i}
                name={name}
                {...register(`variation_option_id.${index}`)}
                value={item._id + '-' + item.value}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VariationSelect;
