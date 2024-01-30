import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SearchKeyWord {
  keyword: string;
}

const Search = ({ url }: { url: string }) => {
  const navigate = useNavigate();
  const form = useForm<SearchKeyWord>({
    defaultValues: {
      keyword: "",
    },
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: SearchKeyWord) => {
    if (data.keyword) {
      navigate(`/${url}?keyword=${data.keyword}`);
    } else {
      navigate(`/${url}`);
    }
    reset();
  };
  return (
    <div className="mb-2">
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="rounded-l-lg p-3 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white focus:outline-none"
          {...register("keyword")}
          placeholder="Search..."
        />
        <button className="px-4 bg-primary-500 rounded-r-lg border-t border-b border-r focus:outline-none">
          <span className="material-icons mt-2 text-white">search</span>
        </button>
      </form>
    </div>
  );
};

export default Search;
