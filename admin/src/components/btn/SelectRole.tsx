import { useSearchParams } from 'react-router-dom';

const SelectRole = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const role = searchParams.get('role');

  const query = {
    keyword: keyword ? keyword : null,
    role: role ? role : null,
  } as any;
  Object.keys(query).forEach((key: any) => {
    if (query[key] === null) {
      delete query[key];
    }
  });
  return (
    <select
      value={searchParams.get('role') ?? ''}
      onChange={(e: any) => {
        if (e.target.value === '') {
          delete query['role'];
        }
        return setSearchParams({
          ...query,
          ...(e.target.value ? { role: e.target.value } : {}),
        });
      }}
    >
      <option value="">All</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
  );
};

export default SelectRole;
