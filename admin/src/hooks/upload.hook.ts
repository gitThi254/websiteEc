import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImageReq } from '../api/upload.api';

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadImageReq,
    onSuccess: (data) => {
      queryClient.setQueryData(['images'], data);
    },
  });
};
