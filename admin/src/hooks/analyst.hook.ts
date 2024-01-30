import { useQuery } from '@tanstack/react-query';
import {
  analystBasicReq,
  analystOrderOfWeekReq,
  analystOrderReq,
} from '../api/analyst.api';

export const useAnalystBasic = () => {
  return useQuery({
    queryKey: ['analyst-basic'],
    queryFn: analystBasicReq,
  });
};

export const useAnalystOrder = () => {
  return useQuery({
    queryKey: ['analyst-order'],
    queryFn: analystOrderReq,
  });
};

export const useAnalystOrderOfWeek = () => {
  return useQuery({
    queryKey: ['analyst-order-week'],
    queryFn: analystOrderOfWeekReq,
  });
};
