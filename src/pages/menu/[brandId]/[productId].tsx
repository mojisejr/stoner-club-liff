import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import ProductDetailBox from "~/components/menu/product-detail-box";
import { useLine } from "~/context/lineContext";

const ProductDetail = () => {
  const { loggedIn, profile } = useLine();
  const { query, replace } = useRouter();

  const { data: user } = api.user.getById.useQuery({
    lineId: profile?.userId!,
  });

  const {
    data: product,
    isLoading,
    refetch,
  } = api.product.getByid.useQuery({
    productId: query?.productId as string,
  });

  useEffect(() => {
    void refetch();

    if (!loggedIn) {
      void replace("/");
    }
  }, [query, loggedIn, user]);
  return (
    <main className="p-2">
      {isLoading || user == undefined ? (
        <div>Loading...</div>
      ) : (
        <ProductDetailBox product={product!} isSale={user?.isSale ?? false} />
      )}
    </main>
  );
};

export default ProductDetail;
