import React, { useEffect } from "react";
import TitleBox from "~/components/menu/title-box";
import { api } from "~/utils/api";
import { useLine } from "~/context/lineContext";
import { useRouter } from "next/router";

const MenuPage = () => {
  const { loggedIn } = useLine();
  const { replace } = useRouter();
  const { data: brands, isLoading } = api.product.getBrandList.useQuery();

  useEffect(() => {
    if (!loggedIn) {
      void replace("/");
    }
  }, [loggedIn]);

  return (
    <main className="p-4">
      {!isLoading ? (
        <div className="grid grid-cols-2 place-items-center gap-6">
          {brands?.map((brand) => (
            <TitleBox
              key={brand._id}
              title={brand.title}
              imageUrl={brand.image.url}
              brandId={brand._id}
            />
          ))}
        </div>
      ) : (
        <div>Loading ..</div>
      )}
    </main>
  );
};

export default MenuPage;
