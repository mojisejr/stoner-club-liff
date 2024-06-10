import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import ProductBox from "~/components/menu/product-box";
import { useLine } from "~/context/lineContext";

const ProductByBrandList = () => {
  const { query, replace } = useRouter();
  const { loggedIn } = useLine();

  const {
    data: products,
    isLoading,
    refetch,
  } = api.product.getByBrand.useQuery({ brand: query?.brandId as string });

  useEffect(() => {
    void refetch();

    if (!loggedIn) {
      void replace("/");
    }
  }, [query, loggedIn]);

  return (
    <main className="p-2">
      {!isLoading ? (
        <div className="grid grid-cols-2 gap-2">
          {products?.map((product) => (
            <ProductBox
              key={product._id}
              productId={product._id}
              brandId={query?.brandId as string}
              title={product.title}
              price={product.price}
              imageUrl={product.images[0]!.image}
            />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
};

export default ProductByBrandList;
