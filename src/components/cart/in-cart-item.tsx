import React from "react";
import Image from "next/image";
import { Product } from "~/interfaces/product";
import { MdAdd, MdRemove } from "react-icons/md";
import { useCart } from "~/context/cartContext";

interface InCartItemProps {
  product?: Product;
  amount?: number;
}

const InCartItem = ({ product, amount }: InCartItemProps) => {
  const { incItem, decItem, removeItemFromCart } = useCart();
  return (
    <div className="relative flex items-center  gap-2 overflow-hidden rounded-xl bg-primary text-primary-content ">
      <button
        onClick={() => removeItemFromCart(product!)}
        className="btn btn-primary btn-sm absolute right-0 top-0"
      >
        x
      </button>
      <figure className="w-24">
        <Image
          src={product?.images[0]?.image ?? "/images/logo.png"}
          width={150}
          height={150}
          alt={product?.title!}
        />
      </figure>
      <div className="w-full p-1 text-sm">
        <div>{product?.title}</div>
        <hr />
        <div className="flex items-center justify-between pr-2 pt-2">
          <div className="flex">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => decItem(product!, 1)}
                className="btn btn-circle btn-secondary btn-xs"
              >
                <MdRemove />
              </button>
              {amount}
              <button
                onClick={() => incItem(product!, 1)}
                className="btn btn-circle btn-secondary btn-xs"
              >
                <MdAdd />
              </button>
            </div>
          </div>
          <div>total: ฿ {amount! * +product?.price!}</div>
        </div>
      </div>
    </div>
  );
};

export default InCartItem;
