import { useVariationOption } from '../../hooks/category.hook';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import ModelVariationOption from './ModelVariationOption';

const VariationOptionReq = ({ open, setOpen }: { open: any; setOpen: any }) => {
  const { id, variation_id, option_id } = useParams();
  const { data: variationOption, isPending } = useVariationOption(
    id,
    variation_id,
    option_id,
  );
  if (isPending) return <Loader />;
  return (
    <>
      {variationOption && (
        <ModelVariationOption
          title="Form cập nhật biến thể"
          description="Vui lòng nhập vào form"
          button="Cập nhật variation"
          data={variationOption}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default VariationOptionReq;
