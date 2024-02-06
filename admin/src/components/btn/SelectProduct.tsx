import { useSearchParams } from 'react-router-dom';

const SelectProduct = ({ method }: { method: any }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');
  const page = searchParams.get('page');

  const query = {
    keyword: keyword ? keyword : null,
    category: category ? category : null,
    page: page ? page : null,
  } as any;
  Object.keys(query).forEach((key: any) => {
    if (query[key] === null) {
      delete query[key];
    }
  });
  return (
    <select
      value={searchParams.get('category') ?? ''}
      onChange={(e: any) => {
        if (e.target.value === '') {
          delete query['category'];
        }
        delete query['page'];
        return setSearchParams({
          ...query,
          ...(e.target.value ? { category: e.target.value } : {}),
        });
      }}
    >
      <option value="">All</option>

      {method?.map((item: any) => (
        <option value={item._id} key={item._id}>
          {item.category_name}
        </option>
      ))}
    </select>
  );
};

export default SelectProduct;
