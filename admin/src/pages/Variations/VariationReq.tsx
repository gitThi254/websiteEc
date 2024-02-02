import { useVariation } from '../../hooks/category.hook';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import ModelVariation from './ModelVariation';

const VariationReq = ({ open, setOpen }: { open: any; setOpen: any }) => {
  const { id, variation_id } = useParams();
  const { data: variation, isPending } = useVariation(id, variation_id);
  if (isPending) return <Loader />;
  return (
    <>
      {variation && (
        <ModelVariation
          title="Form cập nhật Lựa chọn"
          description="Vui lòng diền vào form này!"
          open={open}
          setOpen={setOpen}
          button="Cập nhật lựa chọn"
          category_id={id}
          data={variation}
        />
      )}
    </>
  );
};

export default VariationReq;
