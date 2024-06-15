import React, { useEffect, useState } from "react";
import { Product } from "~/interfaces/product";
import Image from "next/image";
import { useCart } from "~/context/cartContext";
import ImageCarousel from "./product-images-carousel";

interface ProductDetailBoxProps {
  isSale: boolean;
  product: Product;
}

const ProductDetailBox = ({ product, isSale }: ProductDetailBoxProps) => {
  const [listed, setListed] = useState<boolean>(false);

  const { incItem, isListed } = useCart();

  const handleAddItem = () => {
    if (listed) return;
    setListed(true);
    incItem(product, 1);
  };

  useEffect(() => {
    setListed(isListed(product._id));
  }, []);

  return (
    <div className="w-84 card card-compact bg-base-100 shadow-xl">
      <div className="flex w-full justify-center">
        <ImageCarousel images={product?.images.map((image) => image.image)!} />
      </div>
      {/* <figure className="w-full">
        <Image
          src={
            product.images == null
              ? "/images/logo.png"
              : product.images[0]!.image
          }
          width={750}
          height={750}
          alt={product.title}
        />
      </figure> */}
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <h2 className="text-xl font-bold text-secondary-content">
          ฿{product.price}
        </h2>

        <p>{product.desc}</p>

        {product.details.length <= 0 ? null : (
          <div className="flex flex-col gap-2 bg-slate-100 p-2">
            <div className="font-bold">รายละเอียด</div>
            <ul>
              {product.details?.map((detail) => (
                <li
                  key={detail._key}
                >{`${detail.productDetailName}: ${detail.productDetailValue}`}</li>
              ))}
            </ul>
          </div>
        )}

        {isSale ? (
          <div className="card-actions justify-end">
            <button
              disabled={listed}
              onClick={() => handleAddItem()}
              className="btn btn-primary disabled:bg-slate-200"
            >
              {listed ? "เพิ่มแล้ว" : "หยิบใส่ตระกร้า"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetailBox;
