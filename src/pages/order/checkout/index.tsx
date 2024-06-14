import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReceiptCard from "~/components/checkout/recept-card";
import { useCart } from "~/context/cartContext";
import { useLine } from "~/context/lineContext";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { client } from "../../../../sanity/lib/client";

type InputType = {
  slip: FileList;
};

const CheckoutPage = () => {
  const { register, handleSubmit } = useForm<InputType>();
  const [checkoutCartId, setCheckoutCartId] = useState<string>();

  const { liff, profile } = useLine();
  const { cartItem, clearCart, checkOut } = useCart();
  const { replace } = useRouter();
  const {
    data: receipt,
    mutate: save,
    isLoading,
    isSuccess,
  } = api.product.createOrder.useMutation();

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();

    setCheckoutCartId(cartItem?.cartId);

    //upload slip image
    const uploadedSlip = await client.assets.upload("image", data.slip[0]!, {
      filename: `slip_${profile?.userId}_${cartItem?.cartId}}`,
    });

    console.log(uploadedSlip);

    if (uploadedSlip == undefined || uploadedSlip == null) {
      return;
    }

    save({ data: { cartItem: cartItem! }, slipId: uploadedSlip._id });
  });

  useEffect(() => {
    if (isSuccess) {
      clearCart();
      checkOut();
      void replace({
        pathname: "/result",
        query: {
          title: "Done",
          message: "Sale Process is Completed!",
          cartId: checkoutCartId,
          backUrl: "/menu",
        },
      });
    }
  }, [isSuccess]);

  return (
    <main>
      <ReceiptCard cartItem={cartItem!} downloadable={false} />
      <div className="flex flex-col gap-2 p-2">
        <form onSubmit={onSubmit}>
          <div className="py-2">
            <label>แนบสลิปโอน</label>
            <input
              {...register("slip", { required: true })}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="file"
            ></input>
          </div>
          {/* <button
          onClick={() => downloadReceipt()}
          className="btn btn-primary w-full disabled:bg-slate-500"
        >
          โหลดสลิิป
        </button> */}
          <button
            type="submit"
            disabled={isLoading}
            // onClick={() => save({ cartItem: cartItem! })}
            className="btn btn-primary w-full disabled:bg-slate-500"
          >
            {isLoading ? "กำลังบันทึก" : "บันทึกข้อมูลขาย"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;
