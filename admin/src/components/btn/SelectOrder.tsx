import { useSearchParams } from 'react-router-dom';

const SelectOrder = ({ method }: { method: any }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const status = searchParams.get('status');

  const query = {
    keyword: keyword ? keyword : null,
    status: status ? status : null,
  } as any;
  Object.keys(query).forEach((key: any) => {
    if (query[key] === null) {
      delete query[key];
    }
  });
  return (
    <select
      value={searchParams.get('status') ?? ''}
      onChange={(e: any) => {
        if (e.target.value === '') {
          delete query['status'];
        }
        return setSearchParams({
          ...query,
          ...(e.target.value ? { status: e.target.value } : {}),
        });
      }}
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
