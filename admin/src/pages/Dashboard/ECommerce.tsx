import Loader from '../../common/Loader/index.tsx';
import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwoDataReq from '../../components/ChartTwoData.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import Meta from '../../components/Meta/Meta.tsx';
import TableOne from '../../components/TableOne.tsx';
import { useAnalystBasic } from '../../hooks/analyst.hook.ts';

const ECommerce = () => {
  const { data: analystBasic, isPending } = useAnalystBasic();
  if (isPending) return <Loader />;
  return (
    <>
      <Meta title={'Trang chủ'} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        {analystBasic && (
          <>
            <CardTwo quantity={analystBasic[0]} />
            <CardThree quantity={analystBasic[1]} />
            <CardFour quantity={analystBasic[2]} />
          </>
        )}
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwoDataReq />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
