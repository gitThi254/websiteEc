import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
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
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateBlogReq } from '../api/blog.api';

export const useCategories = (query?: any) => {
  return useQuery({
    queryKey: ['categories', query?.toString()],
    queryFn: () => categoryReq(query),
    placeholderData: keepPreviousData,
  });
};

export const useCategory = (id?: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategoryReq(id),
  });
};

export const useVariationOption = (id?: string) => {
  return useQuery({
    queryKey: ['variation-option', id],
    queryFn: () => getVariationOptionReq(id),
  });
};

export const useVariation = (id?: string) => {
  return useQuery({
    queryKey: ['variation', id],
    queryFn: () => getVariationReq(id),
  });
};

export const useUpdateCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateCategoryReq,
    onSuccess: (data) => {
      toast.success('update category success');

      navigate(`/categories/list`);
    },
    onError(error: any) {
      toast.error('update category fail');
      error.message = error?.response?.data;
    },
  });
};

export const useUpdateVariation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateVariationReq,
    onSuccess: (data) => {
      toast.success('update variation success');

      navigate('/variations/list');
    },

    onError(error: any) {
      toast.success('update variation fail');
      error.message = error?.response?.data;
    },
  });
};

export const useUpdateVariationOption = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateVariationOptionReq,
    onSuccess: (data) => {
      toast.success('update variation option success');

      navigate(`/variations/option/list/${data.variation_id}`);
    },

    onError(error: any) {
      toast.error('update variation option fail');
      error.message = error?.response?.data;
    },
  });
};

export const useVariations = (id?: string) => {
  return useQuery({
    queryKey: ['variations'],
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

export const useVariationOptions = (id?: string) => {
  return useQuery({
    queryKey: ['variations-options', id],
    queryFn: () => variationOptionsReq(id),
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
  return useMutation({
    mutationFn: categoryCreateReq,
    onSuccess: (data) => {
      toast.success('create category success');
      navigate('/categories/list');
    },
    onError(error: any) {
      toast.error('fail to create category');
      error.message = error?.response?.data;
    },
  });
};

export const useDeleteCategory = () => {
  const navigate = useNavigate();
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
      toast.success('delete variation success');

      queryClient.invalidateQueries({ queryKey: ['variations'] });
    },
    onError(error: any) {
      toast.error('delete variation fail');

      error.message = error?.response?.data;
    },
  });
};

export const useDeleteVariationOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVariationOptionReq,
    onSuccess: (data) => {
      toast.success('delete variation option success');

      queryClient.invalidateQueries({ queryKey: ['variations-options'] });
    },
    onError(error: any) {
      toast.error('delete variation option fail');

      error.message = error?.response?.data;
    },
  });
};

export const useCreateVariation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: variationCreateReq,
    onSuccess: (data) => {
      toast.success('create variation success');

      navigate('/variations/list');
    },
    onError(error: any) {
      toast.error('create variation fail');

      error.message = error?.response?.data;
    },
  });
};

export const useCreateOptionVariation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: variationOptionCreateReq,
    onSuccess: (data) => {
      toast.success('create variation option success');

      navigate(`/variations/option/list/${data.variation_id}`);
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

      navigate(`/blogs/list`);
    },
    onError(error: any) {
      toast.error('update blog fail');
      error.message = error?.response?.data;
    },
  });
};
