import React from 'react';
import { useMethod, useOrder, useUPdateOrder } from '../../hooks/order.hook';
import Loader_image from '../../common/Loader_image';
import { useParams } from 'react-router-dom';
import { isHtmlElement } from 'react-router-dom/dist/dom';
import { useForm } from 'react-hook-form';
import OrderItem from './OrderItem';

const OrderReq = () => {
  const { id } = useParams();
  const { data: order, isPending } = useOrder(id);
  const { data: method, isPending: pending } = useMethod();

  if (isPending || pending) return <Loader_image />;

  return <>{order && method && <OrderItem order={order} method={method} />}</>;
};

export default OrderReq;
