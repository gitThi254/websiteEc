import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCartReq,
  cartsReq,
  getCartItemReq,
  getShipingMethodsReq,
  getShippingMethodReq,
  updateCartReq,
} from "../api/cart";
import toast from "react-hot-toast";

export const useCarts = () => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: cartsReq,
  });
};
export const useCartItems = () => {
  return useQuery({
    queryKey: ["carts-items"],
    queryFn: getCartItemReq,
  });
};

export const useShippingMethod = () => {
  return useQuery({
    queryKey: ["shipping-method"],
    queryFn: getShippingMethodReq,
  });
};

export const useShippingsMethod = () => {
  return useQuery({
    queryKey: ["shippings-method"],
    queryFn: getShipingMethodsReq,
  });
};

export const useAddCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCartReq,
    onSuccess: (data) => {
      queryClient.setQueryData(["carts-items"], (req: any) => {
        const dataReq = req.map((item: any) =>
          item._id === data._id ? { ...item, qty: data.qty } : item
        );

        return dataReq;
      });
      toast.success("Add to cart successfully");
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartReq,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["carts-items"] });
    },
  });
};
