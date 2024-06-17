import React, { useEffect, useState } from "react";
import ReceiptCard from "~/components/checkout/recept-card";
import { useRouter } from "next/router";
import { Cart } from "~/interfaces/cart";
import { api } from "~/utils/api";
import ReceiptCardDownload from "~/components/checkout/receipt-card-download";

const ReceiptDownload = () => {
  const { query } = useRouter();

  const {
    data: order,
    isLoading,
    refetch,
  } = api.order.getByid.useQuery({ orderId: query?.orderId as string });

  useEffect(() => {
    if (query.orderId != undefined) {
      refetch();
    }
  }, [query!.orderId]);

  return (
    <main>
      <>
        {isLoading ? (
          <div>Loading..</div>
        ) : (
          <>
            {/* lineId: string; // sale
  cartId: string;
  customerId: string;
  items: CartItem[];
  subtotal: number;
  count: number; */}
            {order ? (
              <ReceiptCardDownload
                order={order}
                saleName={query?.saleName as string}
                downloadable={true}
              />
            ) : (
              <div>ไม่มีข้อมูล</div>
            )}
          </>
        )}
      </>
    </main>
  );
};

export default ReceiptDownload;
