import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface SearchKeyWord {
  keyword: string;
}

const Search = ({ url }: { url: string }) => {
  const navigate = useNavigate();
  const form = useForm<SearchKeyWord>({
    defaultValues: {
      keyword: '',
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="search" {...register('keyword')} />
      <button>Search</button>
    </form>
  );
};

export default Search;
