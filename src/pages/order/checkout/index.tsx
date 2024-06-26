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
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<InputType>();
  const [checkoutCartId, setCheckoutCartId] = useState<string>();

  const { profile } = useLine();
  const { cartItem, clearCart, checkOut } = useCart();
  const { replace } = useRouter();

  const { data: member, isLoading: loadingMember } = api.user.getById.useQuery({
    lineId: profile?.userId! as string,
  });

  const {
    data: receipt,
    mutate: save,
    isLoading,
    isSuccess,
    isError,
  } = api.product.createOrder.useMutation();

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    setLoading(true);

    setCheckoutCartId(cartItem?.cartId);

    //upload slip image
    const uploadedSlip = await client.assets.upload("image", data.slip[0]!, {
      filename: `slip_${profile?.userId}_${cartItem?.cartId}}`,
    });

    if (uploadedSlip == undefined || uploadedSlip == null) {
      return;
    }

    save({
      data: { cartItem: cartItem! },
      slipId: uploadedSlip._id,
      slipUrl: uploadedSlip.url,
      saleName: member.name,
    });
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
          saleName: member != undefined ? member.name : "N/A",
          backUrl: "/menu",
        },
      });
    }

    if (isError) {
      setLoading(false);
    }

    if (loadingMember) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isSuccess, isError, loadingMember]);

  return (
    <main>
      <ReceiptCard
        cartItem={cartItem!}
        saleName={member != undefined ? member.name : "N/A"}
        downloadable={false}
      />
      <div className="flex flex-col gap-2 p-2">
        <p className="bg-primary p-2 text-primary-content">
          สำคัญมาก:
          <div>✅ โอนตามยอดที่สรุปให้เท่านั้น</div>
          <div>
            ❌ ห้ามส่งสลิบปลอม / แชร์สลิป ถ้าทางร้านพบเจอ
            ทางร้านจะแจ้งความดำเนินคดีทุกกรณี
          </div>
        </p>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col py-2">
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
            disabled={isLoading || loading}
            // onClick={() => save({ cartItem: cartItem! })}
            className="btn btn-primary w-full disabled:bg-slate-500"
          >
            {isLoading || loading ? "กำลังบันทึก" : "บันทึกข้อมูลขาย"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;
