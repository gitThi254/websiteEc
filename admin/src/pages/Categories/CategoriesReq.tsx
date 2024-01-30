import React from 'react';
import { useCategory } from '../../hooks/category.hook';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import CategoryForm from './CategoryForm';

const CategoriesReq = () => {
  const { id } = useParams();
  const { data: category, isPending } = useCategory(id);
  if (isPending) return <Loader />;

  return <CategoryForm category={category} />;
};

export default CategoriesReq;
