import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReceiptCard from "~/components/checkout/recept-card";
import { useCart } from "~/context/cartContext";
import { useLine } from "~/context/lineContext";
import { api } from "~/utils/api";

const CheckoutPage = () => {
  const { liff } = useLine();
  const { cartItem, clearCart, checkOut } = useCart();
  const { replace } = useRouter();
  const {
    mutate: save,
    isLoading,
    isSuccess,
  } = api.product.createOrder.useMutation();

  const downloadReceipt = () => {
    liff?.openWindow({
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/order/checkout/download?item=${JSON.stringify(cartItem)}`,
      external: true,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      clearCart();
      checkOut();
      void replace({
        pathname: "/result",
        query: {
          title: "Done",
          message: "Sale Process is Completed!",
          backUrl: "/menu",
        },
      });
    }
  }, [isSuccess]);

  return (
    <main>
      <ReceiptCard cartItem={cartItem!} downloadable={false} />
      <div className="bg-red-800 p-2 text-white">
        important! : ดาวน์โหลด slip ก่อนกลับมากดบันทึก ไม่อย่างนั้นข้อมูลจะหาย
        และอย่าลืมกลับมาบันทึกข้อมูล
      </div>
      <div className="flex flex-col gap-2 p-2">
        <button
          onClick={() => downloadReceipt()}
          className="btn btn-primary w-full disabled:bg-slate-500"
        >
          โหลดสลิิป
        </button>
        <button
          disabled={isLoading}
          onClick={() => save({ cartItem: cartItem! })}
          className="btn btn-primary w-full disabled:bg-slate-500"
        >
          {isLoading ? "กำลังบันทึก" : "บันทึกข้อมูลขาย"}
        </button>
      </div>
    </main>
  );
};

export default CheckoutPage;
