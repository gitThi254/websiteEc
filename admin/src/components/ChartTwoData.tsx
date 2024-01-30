import React from 'react';
import { useAnalystOrderOfWeek } from '../hooks/analyst.hook';
import Loader from '../common/Loader';
import ChartTwo from './ChartTwo';
import Loader_image from '../common/Loader_image';

const ChartTwoDataReq = () => {
  const { data: OrderOfWeek, isPending } = useAnalystOrderOfWeek();
  if (isPending) return <Loader_image />;

  return <>{OrderOfWeek && <ChartTwo data={OrderOfWeek} />}</>;
};

export default ChartTwoDataReq;
