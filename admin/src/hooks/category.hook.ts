import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  categoryAdminReq,
  categoryCreateReq,
  categoryReq,
  createPromotionReq,
  deleteCategoryReq,
  deleteVariationOptionReq,
  deleteVariationReq,
  getAllVariationOptionOfCategoryReq,
  getCategoryReq,
  getVariationOptionReq,
  getVariationReq,
  promotionCalendarReq,
  promotionReq,
  promotionsReq,
  updateCategoryReq,
  updatePromotionReq,
  updateVariationOptionReq,
  updateVariationReq,
  variationCreateReq,
  variationOptionCreateReq,
  variationOptionsReq,
  variationReq,
} from '../api/category.api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateBlogReq } from '../api/blog.api';

export const useCategories = (query?: any) => {
  return useQuery({
    queryKey: ['categories', query?.toString()],
    queryFn: () => categoryReq(query),
    placeholderData: keepPreviousData,
  });
};

export const useCategoriesAdmin = (query?: any) => {
  return useQuery({
    queryKey: ['categories', 'admin', query?.toString()],
    queryFn: () => categoryAdminReq(query),
    placeholderData: keepPreviousData,
  });
};
export const useCategory = (id?: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategoryReq(id),
  });
};

export const useVariationOption = (
  id?: string,
  variation_id?: string,
  option_id?: string,
) => {
  return useQuery({
    queryKey: [
      'categories',
      id,
      'variations',
      variation_id,
      'options',
      option_id,
    ],
    queryFn: () => getVariationOptionReq(option_id),
  });
};

export const useVariation = (id?: any, variation_id?: any) => {
  return useQuery({
    queryKey: ['categories', id, 'variations', variation_id],
    queryFn: () => getVariationReq(variation_id),
  });
};

export const useUpdateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategoryReq,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories', ''] });
      queryClient.setQueryData(['categories', data._id], data);
      toast.success('update category success');
    },
    onError(error: any) {
      toast.error('update category fail');
      error.message = error?.response?.data;
    },
    onSettled: () => {
      navigate(`/categories`);
    },
  });
};

export const useUpdateVariation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateVariationReq,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['categories', data.category_id, 'variations'],
      });
      queryClient.setQueryData(
        ['categories', data.category_id, 'variations', data._id],
        data,
      );
      toast.success('update variation success');
    },
    onError(error: any) {
      toast.success('update variation fail');
      error.message = error?.response?.data;
    },
    onSettled: () => {
      navigate(-1);
    },
  });
};

export const useUpdateVariationOption = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id, variation_id } = useParams();
  return useMutation({
    mutationFn: updateVariationOptionReq,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['categories', id, 'variations', variation_id, 'options'],
      });
      queryClient.invalidateQueries({
        queryKey: [
          'categories',
          id,
          'variations',
          variation_id,
          'options',
          data._id,
        ],
      });
      toast.success('create variation option success');
    },

    onError(error: any) {
      toast.error('update variation option fail');
      error.message = error?.response?.data;
    },
    onSettled: () => {
      navigate(-1);
    },
  });
};

export const useVariations = (id?: string) => {
  return useQuery({
    queryKey: ['categories', id, 'variations'],
    queryFn: () => variationReq(id),
  });
};
export const usePromotions = (id?: string) => {
  return useQuery({
    queryKey: ['promotion', id],
    queryFn: () => promotionsReq(id),
  });
};

export const usePromotion = (id?: string) => {
  return useQuery({
    queryKey: ['promotion-item', id],
    queryFn: () => promotionReq(id),
  });
};

export const usePromotionCalendar = () => {
  return useQuery({
    queryKey: ['promotion-calendar'],
    queryFn: () => promotionCalendarReq(),
  });
};

export const useCreatePromotion = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createPromotionReq,
    onSuccess: (data) => {
      toast.success('create promotion success');
      navigate(`/categories/list`);
    },
    onError(error: any) {
      toast.error('create promotion category');
      error.message = error?.response?.data;
    },
  });
};

export const useUpdatePromotion = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updatePromotionReq,
    onSuccess: (data) => {
      toast.success('update promotion success');
      navigate(-1);
    },
    onError(error: any) {
      toast.error('update promotion category');
      error.message = error?.response?.data;
    },
  });
};

export const useVariationOptions = (id?: string, variation_id?: string) => {
  return useQuery({
    queryKey: ['categories', id, 'variations', variation_id, 'options'],
    queryFn: () => variationOptionsReq(variation_id),
  });
};

export const useVariationOptionsOfCategory = (id?: string) => {
  return useQuery({
    queryKey: ['/variations-options/category', id],
    queryFn: () => getAllVariationOptionOfCategoryReq(id),
  });
};

export const useCreateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryCreateReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', 'admin', ''] });
      toast.success('create category success');
    },
    onError(error: any) {
      toast.error('fail to create category');
      error.message = error?.response?.data;
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategoryReq,
    onSuccess: (data) => {
      toast.success('delete category success');

      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError(error: any) {
      toast.error('delete category fail');
      error.message = error?.response?.data;
    },
  });
};

export const useDeleteVariation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVariationReq,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['categories', data.category_id, 'variations'],
      });
      toast.success('delete variation success');
    },
    onError(error: any) {
      toast.error('delete variation fail');

      error.message = error?.response?.data;
    },
  });
};

export const useDeleteVariationOption = () => {
  const queryClient = useQueryClient();
  const { id, variation_id } = useParams();
  return useMutation({
    mutationFn: deleteVariationOptionReq,
    onSuccess: (data) => {
      toast.success('delete variation option success');

      queryClient.invalidateQueries({
        queryKey: ['categories', id, 'variations', variation_id, 'options'],
      });
    },
    onError(error: any) {
      toast.error('delete variation option fail');

      error.message = error?.response?.data;
    },
  });
};

export const useCreateVariation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: variationCreateReq,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['categories', data.category_id, 'variations'],
      });
      toast.success('create variation success');
    },
    onError(error: any) {
      toast.error('create variation fail');
      error.message = error?.response?.data;
    },
  });
};

export const useCreateOptionVariation = () => {
  const { id, variation_id } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: variationOptionCreateReq,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['categories', id, 'variations', variation_id, 'options'],
      });
      toast.success('create variation option success');
    },
    onError(error: any) {
      toast.error('create variation option fail');
      error.message = error?.response?.data;
    },
  });
};

export const useUpdateBlog = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateBlogReq,
    onSuccess: (data) => {
      toast.success('update blog success');

      navigate(`/blogs`);
    },
    onError(error: any) {
      toast.error('update blog fail');
      error.message = error?.response?.data;
    },
  });
};
