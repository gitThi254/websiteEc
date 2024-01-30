import React from "react";
import Order from "./req";
import { useVerify } from "../../hooks/auth.hook";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../../common/Loader";
import { useShippingsMethod } from "../../hooks/cart.hook";

const OrderReq = () => {
  const queryClient = useQueryClient();
  const cart = queryClient.getQueryData(["cart_order"]);
  const { data: shippingMethod, isPending: pending } = useShippingsMethod();
  const { data: user, isPending } = useVerify();
  if (isPending || pending) return <Loader />;

  return (
    <>{user && <Order cart={cart} user={user} shipping={shippingMethod} />}</>
  );
};

export default OrderReq;
