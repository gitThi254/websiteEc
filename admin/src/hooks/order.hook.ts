import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import {
  getAllOrdersReq,
  getMethodReq,
  getOrderReq,
  updateOrderReq,
} from '../api/order.api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useOrders = (query?: any) => {
  return useQuery({
    queryKey: ['orders', query.toString()],
    queryFn: () => getAllOrdersReq(query),
    placeholderData: keepPreviousData,
  });
};

export const useOrder = (id?: string) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrderReq(id),
  });
};

export const useMethod = () => {
  return useQuery({
    queryKey: ['method'],
    queryFn: getMethodReq,
  });
};

export const useUPdateOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderReq,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['orders', data._id],
        exact: true,
      });
      toast.success('update status order success');
      navigate(`/orders/list`);
    },
    onError(error: any) {
      toast.error('update category fail');
      error.message = error?.response?.data;
    },
  });
};
