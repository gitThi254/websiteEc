import { useSearchParams } from 'react-router-dom';

const SelectOrder = ({ method }: { method: any }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  return (
    <select
      value={searchParams.get('status') ?? ''}
      onChange={(e: any) =>
        setSearchParams({
          keyword: keyword ? keyword : '',
          status: e.target.value,
        })
      }
    >
      <option value="">All</option>

      {method?.map((item: any) => (
        <option value={item._id} key={item._id}>
          {item.status}
        </option>
      ))}
    </select>
  );
};

export default SelectOrder;
