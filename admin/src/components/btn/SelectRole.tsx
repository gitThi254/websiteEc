import { useSearchParams } from 'react-router-dom';

const SelectRole = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  return (
    <select
      value={searchParams.get('role') ?? ''}
      onChange={(e: any) =>
        setSearchParams({
          keyword: keyword ? keyword : '',
          role: e.target.value,
        })
      }
    >
      <option value="">All</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
  );
};

export default SelectRole;
