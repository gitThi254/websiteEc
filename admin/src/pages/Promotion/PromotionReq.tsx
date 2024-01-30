import React from 'react';
import CategoriesReq from '../Categories/CategoriesReq';
import PromotionForm from './PromotionForm';
import { useLocation, useParams } from 'react-router-dom';
import { useCategories, usePromotion } from '../../hooks/category.hook';
import Loader from '../../common/Loader';

const PromotionReq = () => {
  const { id } = useParams();
  const location = useLocation().pathname.split('/')[3];
  const { data: promotion, isPending } = usePromotion(id);
  const { data: categories, isPending: pending } = useCategories();
  if ((location === 'edit' && isPending) || pending) return <Loader />;
  return (
    <>
      {location === 'edit' ? (
        promotion && (
          <PromotionForm promotion={promotion} categories={categories} />
        )
      ) : (
        <PromotionForm categories={categories} />
      )}
    </>
  );
};

export default PromotionReq;
