import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createProductItemReq,
  createProductReq,
  deleteProductItemReq,
  deleteProductReq,
  productItemReq,
  productItemsReq,
  productReq,
  productsReq,
  updateProductItemReq,
  updateProductReq,
} from '../api/product.api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useProducts = (query?: any) => {
  return useQuery({
    queryKey: ['products', query?.toString()],
    queryFn: () => productsReq(query),
    placeholderData: keepPreviousData,
  });
};

export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productReq(id),
  });
};

export const useProductItem = (id?: string) => {
  const { id: product_id } = useParams();
  return useQuery({
    queryKey: ['products', product_id, 'product-items', id],
    queryFn: () => productItemReq(id),
  });
};

export const useProductItems = (id?: string) => {
  return useQuery({
    queryKey: ['products', id, 'product_items'],
    queryFn: () => productItemsReq(id),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createProductReq,
    onSuccess: (data) => {
      toast.success('create product success');

      queryClient.setQueryData(['images'], null);
      navigate('/products');
    },
    onError(error: any) {
      toast.error('create product category fail');
      error.message = error?.response?.data;
    },
    onSettled: () => {
      queryClient.setQueryData(['images'], null);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateProductReq,
    onSuccess: (data) => {
      toast.success('update product success');
      queryClient.setQueryData(['products', data._id], data);
      navigate('/products');
    },
    onError(error: any) {
      toast.error('update product fail');
      error.message = error?.response?.data;
    },
    onSettled: () => {
      queryClient.setQueryData(['images'], null);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductReq,
    onSuccess: (data) => {
      toast.success('delete product success');

      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(error: any) {
      toast.error('delete product fail');
      error.message = error?.response?.data;
    },
  });
};

export const useDeleteProductItem = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteProductItemReq,
    onSuccess: (data) => {
      toast.success('delete product item success');

      queryClient.invalidateQueries({ queryKey: ['products/items'] });
    },
    onError(error: any) {
      toast.error('delete product item fail');
      error.message = error?.response?.data;
    },
  });
};

export const useCreateProductItem = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createProductItemReq,
    onSuccess: (data) => {
      toast.success('create product item success');
      queryClient.setQueryData(['images'], null);
      navigate(`/products/list/${data.product_id}`);
    },
    onError(error: any) {
      toast.error('create product item fail');
      error.message = error?.response?.data;
    },
  });
};

export const useUpdateProductItem = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateProductItemReq,
    onSuccess: (data) => {
      toast.success('update product item success');
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['products', data.product_id, 'product_items'],
      });
      queryClient.setQueryData(
        ['products', data.product_id, 'product-items', data._id],
        data,
      );
      navigate(`/products/${data.product_id}`);
    },
    onError(error: any) {
      toast.error('update product item fail');
      error.message = error?.response?.data;
    },
    onSettled: () => {
      queryClient.setQueryData(['images'], null);
    },
  });
};
