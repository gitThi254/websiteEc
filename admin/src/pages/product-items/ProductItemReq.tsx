import React from 'react';
import { useProductItem } from '../../hooks/product.hook';
import Loader from '../../common/Loader';
import { useParams } from 'react-router-dom';
import ProductItemForm from './ProductItemForm';

const ProductItemReq = () => {
  const { id } = useParams();
  const { data: productItem, isPending } = useProductItem(id);
  if (isPending) return <Loader />;
  return <ProductItemForm productItem={productItem} />;
};

export default ProductItemReq;
