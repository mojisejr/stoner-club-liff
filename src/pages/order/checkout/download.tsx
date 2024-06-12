import React from "react";
import ReceiptCard from "~/components/checkout/recept-card";
import { useCart } from "~/context/cartContext";

const ReceiptDownload = () => {
  const { cartItem } = useCart();
  return (
    <main>
      {!cartItem ? (
        <ReceiptCard cartItem={cartItem!} downloadable={true} />
      ) : (
        <div>ไม่มีข้อมูล</div>
      )}
    </main>
  );
};

export default ReceiptDownload;
