import React from "react";
import { useSearchParams } from "react-router-dom";

const SelectPrice = ({ data }: { data: any }) => {
  const [search, setSearch] = useSearchParams();
  const price = search.get("price");
  const category = search.get("category");
  const keyword = search.get("keyword");
  const page = search.get("page");

  const query = {
    keyword: keyword ? keyword : null,
    page: page ? page : null,
    price: price ? price : null,
    category: category ? category : null,
  };
  Object.keys(query).forEach((key: any) => {
    if (query[key] === null) {
      delete query[key];
    }
  });

  return (
    <>
      <p className="text-primary-500 font-bold mb-2 capitalize">
        {data[0].name}
      </p>
      <div className="mb-1">
        <label className="inline-flex items-center cursor-pointer">
          <input
            className="form-radio bg-gray-200 border border-gray-200 text-primary-500"
            type="radio"
            name={data[0].name}
            value=""
            onChange={(e: any) =>
              setSearch((pre) => {
                delete query[data[0].name];
                return query;
              })
            }
          />
          <span className="ml-2">Tất cả</span>
        </label>
      </div>
      {data?.map((item: any, index: any) => (
        <div className="mb-1" key={index}>
          <label className="inline-flex items-center cursor-pointer">
            <input
              className="form-radio bg-gray-200 border border-gray-200 text-primary-500"
              type="radio"
              name={item.name}
              value={item.value}
              onChange={(e: any) =>
                setSearch({
                  ...query,
                  [item.name]: e.target.value,
                })
              }
            />
            <span className="ml-2">{item.title}</span>
          </label>
        </div>
      ))}
    </>
  );
};

export default SelectPrice;
