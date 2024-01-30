import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import { usePromotionCalendar } from '../hooks/category.hook';
import Loader from '../common/Loader';
import Test from './Test';

function App() {
  const { data: allEvents, isPending } = usePromotionCalendar();
  if (isPending) return <Loader />;
  return <>{allEvents && <Test data={allEvents} />}</>;
}

export default App;
