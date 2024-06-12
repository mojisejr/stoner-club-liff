import Link from "next/link";
import React from "react";
import InCartItem from "~/components/cart/in-cart-item";
import { useCart } from "~/context/cartContext";

const Cart = () => {
  const { cartItem, clearCart } = useCart();
  return (
    <main className="grid grid-cols-1 gap-2 p-2">
      <div>
        <div className="text-xl font-bold">ตระกร้า</div>
        <div className="text-sm font-semibold text-secondary-content">
          กดปุ่มสรุปคำสั่งซื้อเมื่อพร้อม
        </div>
      </div>
      <div className="h-[400px] overflow-scroll p-2">
        <div className="flex  flex-col gap-2">
          {cartItem && cartItem.items.length <= 0 ? (
            <div className="w-full text-center">ยังไม่มีอะไรในนี้</div>
          ) : (
            cartItem?.items.map((item) => (
              <InCartItem
                key={item.product._id}
                product={item.product}
                amount={item.amount}
              />
            ))
          )}
        </div>
      </div>

      {cartItem && cartItem.items.length <= 0 ? null : (
        <>
          <div className="flex flex-col gap-1  p-2">
            <div className="font-bold">รวมเป็นเงิน</div>
            <div className="bg-slate-200 p-2 text-xl">
              ฿{cartItem?.subtotal}
            </div>
          </div>
          <div className="flex w-full justify-evenly">
            <Link href={`/order/checkout`} className="btn btn-primary">
              สรุปคำสั่งซื้อ
            </Link>
            <button onClick={() => clearCart()} className="btn btn-secondary">
              ล้างตระกร้า
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
