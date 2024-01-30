import { useSearchParams } from "react-router-dom";

const SelectOrder = ({ method }: { method: any }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <select
      value={searchParams.get("status") ?? ""}
      onChange={(e: any) =>
        setSearchParams({
          status: e.target.value,
        })
      }
    >
      <option value="">Status</option>

      {method?.map((item: any) => (
        <option value={item._id} key={item._id}>
          {item.status}
        </option>
      ))}
    </select>
  );
};

export default SelectOrder;
