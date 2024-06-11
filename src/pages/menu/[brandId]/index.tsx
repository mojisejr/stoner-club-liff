import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import ProductBox from "~/components/menu/product-box";
import { useLine } from "~/context/lineContext";
import { Product } from "~/interfaces/product";

const ProductByBrandList = () => {
  const [currentList, setCurrentList] = useState<Product[]>();
  const { query, replace } = useRouter();
  const { loggedIn } = useLine();

  const {
    data: products,
    isLoading,
    refetch,
  } = api.product.getByBrand.useQuery({ brand: query?.brandId as string });

  const {
    data: category,
    isLoading: categoryLoading,
    refetch: refetchCategoryList,
  } = api.product.getCategoryList.useQuery();

  const handleCategoryFilter = (categoryId: string) => {
    if (categoryId == "all") {
      setCurrentList(products);
    } else {
      const filtered = products?.filter(
        (product) =>
          product.category != null && product.category._id == categoryId,
      );
      setCurrentList(filtered);
    }
  };

  useEffect(() => {
    void refetch();

    if (!loggedIn) {
      void replace("/");
    }

    if (products) {
      setCurrentList(products);
    }
  }, [query, loggedIn, products]);

  return (
    <main className="p-2">
      {!isLoading ? (
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-full w-full">
            <div className="divider">Filter</div>
            <select
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">All</option>
              {category == undefined ? null : (
                <>
                  {category?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          {currentList && currentList?.length <= 0 ? (
            <div className="col-span-full mt-3 w-full text-center font-bold">
              Not Found
            </div>
          ) : (
            <>
              {currentList?.map((product) => (
                <ProductBox
                  key={product._id}
                  productId={product._id}
                  brandId={query?.brandId as string}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.images[0]!.image}
                />
              ))}
            </>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
};

export default ProductByBrandList;
