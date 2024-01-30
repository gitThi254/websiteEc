import React from 'react';
import { useVariationOption } from '../../hooks/category.hook';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import VariationForm from '../Variations/VariationForm';
import VariationOptionForm from './VariationOptionForm';

const VariationOptionReq = () => {
  const { id } = useParams();
  const { data: variationOption, isPending } = useVariationOption(id);
  if (isPending) return <Loader />;
  return (
    <>
      {variationOption && (
        <VariationOptionForm variationOption={variationOption} />
      )}
    </>
  );
};

export default VariationOptionReq;
