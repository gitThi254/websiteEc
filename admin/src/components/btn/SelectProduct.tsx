import { useSearchParams } from 'react-router-dom';

const SelectProduct = ({ method }: { method: any }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  return (
    <select
      value={searchParams.get('category') ?? ''}
      onChange={(e: any) =>
        setSearchParams({
          keyword: keyword ? keyword : '',
          category: e.target.value,
        })
      }
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
