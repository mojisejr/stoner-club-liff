import React, { useEffect, useState } from "react";
import ReceiptCard from "~/components/checkout/recept-card";
import { useRouter } from "next/router";
import { Cart } from "~/interfaces/cart";

const ReceiptDownload = () => {
  const [cartItem, setCartItem] = useState<Cart>();
  const { query } = useRouter();

  useEffect(() => {
    if (query.item != undefined) {
      setCartItem(JSON.parse(query.item as string));
    }
  }, [query!.item]);

  return (
    <main>
      {cartItem ? (
        <ReceiptCard cartItem={cartItem!} downloadable={true} />
      ) : (
        <div>ไม่มีข้อมูล</div>
      )}
    </main>
  );
};

export default ReceiptDownload;
