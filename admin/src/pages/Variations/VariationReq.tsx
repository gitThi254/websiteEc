import React from 'react';
import VariationForm from './VariationForm';
import { useCategories, useVariation } from '../../hooks/category.hook';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '../../common/Loader';

const VariationReq = () => {
  const { id } = useParams();
  const location = useLocation().pathname.split('/')[2];
  const { data: variation, isPending } = useVariation(id);
  const { data: categories, isPending: pending } = useCategories();
  if ((location === 'edit' && isPending) || pending) return <Loader />;
  return (
    <>
      {variation ? (
        <VariationForm variation={variation} categories={categories} />
      ) : (
        <VariationForm categories={categories} />
      )}
    </>
  );
};

export default VariationReq;
