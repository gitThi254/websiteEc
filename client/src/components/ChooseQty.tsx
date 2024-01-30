import React, { useEffect, useState } from "react";
import { useUpdateCart } from "../hooks/cart.hook";

const ChooseQty = ({ id, qty }: { id: string; qty: number }) => {
  const [qtyProduct, setQtyProduct] = useState<number>(qty);
  const { mutate: updateCart } = useUpdateCart();
  useEffect(() => {
    const intervalId = setTimeout(() => {
      updateCart({ id, data: { qty: qtyProduct } });
    }, 500);

    return () => clearTimeout(intervalId);
  }, [qtyProduct]);
  return (
    <>
      <svg
        className="fill-current text-gray-600 w-3"
        viewBox="0 0 448 512"
        onClick={() => setQtyProduct((pre: number) => pre - 1)}
      >
        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
      </svg>

      <input
        className="mx-2 border text-center w-16"
        type="number"
        min={1}
        max={100}
        onChange={(e: any) => setQtyProduct(e.target.value)}
        value={qtyProduct ?? 0}
      />

      <svg
        className="fill-current text-gray-600 w-3"
        viewBox="0 0 448 512"
        onClick={() => setQtyProduct((pre: number) => pre + 1)}
      >
        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
      </svg>
    </>
  );
};

export default ChooseQty;
