import { useProductItem } from '../../hooks/product.hook';
import Loader from '../../common/Loader';
import { useParams } from 'react-router-dom';
import ProductItemForm from './ProductItemForm';
import NotFound from '../NotFound';

const ProductItemReq = () => {
  const { product_item_id } = useParams();
  const { data: productItem, isPending } = useProductItem(product_item_id);
  if (isPending) return <Loader />;
  return (
    <>
      {productItem ? (
        <ProductItemForm productItem={productItem} />
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ProductItemReq;
