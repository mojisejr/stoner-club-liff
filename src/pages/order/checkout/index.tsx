import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReceiptCard from "~/components/checkout/recept-card";
import { useCart } from "~/context/cartContext";
import { api } from "~/utils/api";

const CheckoutPage = () => {
  const { cartItem, clearCart, checkOut } = useCart();
  const { replace } = useRouter();
  const {
    mutate: save,
    isLoading,
    isSuccess,
  } = api.product.createOrder.useMutation();

  useEffect(() => {
    if (isSuccess) {
      clearCart();
      checkOut();
      void replace({
        pathname: "/result",
        query: {
          title: "Done",
          message: "Sale Process is Completed!",
          backUrl: "/profile",
        },
      });
    }
  }, [isSuccess]);

  return (
    <main>
      <ReceiptCard cartItem={cartItem!} />
      <div className="bg-red-800 p-2 text-white">
        important! : download slip before hit finish button
      </div>
      <div className="p-2">
        <button
          disabled={isLoading}
          onClick={() => save({ cartItem: cartItem! })}
          className="btn btn-primary w-full disabled:bg-slate-500"
        >
          {isLoading ? "Processing..." : "Finish"}
        </button>
      </div>
    </main>
  );
};

export default CheckoutPage;
