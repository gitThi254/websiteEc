import React from 'react';
import ProductForm from './productForm';
import { useProduct } from '../../hooks/product.hook';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import { useCategories } from '../../hooks/category.hook';

const ProductReq = () => {
  const { id } = useParams();

  const { data: product, isPending } = useProduct(id);
  const { data: categories, isPending: pending } = useCategories();
  if (isPending || pending) return <Loader />;
  const location = useLocation().pathname.split('/')[2];
  return (
    <>
      {location === 'edit'
        ? categories && (
            <ProductForm product={product} categories={categories} />
          )
        : categories && <ProductForm categories={categories} />}
    </>
  );
};
export default ProductReq;
