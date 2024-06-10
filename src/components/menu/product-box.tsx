import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductBoxProps {
  productId: string;
  brandId: string;
  title: string;
  imageUrl?: string;
  price: string;
}

const ProductBox = ({
  title,
  imageUrl,
  brandId,
  productId,
  price,
}: ProductBoxProps) => {
  return (
    <Link
      href={`/menu/${brandId}/${productId}`}
      className="flex max-h-[300px] max-w-[300px] flex-col items-center  overflow-hidden rounded-md bg-primary shadow-xl hover:ring hover:ring-secondary"
    >
      <>
        <figure className="flex h-36 w-full items-center overflow-hidden bg-white">
          <Image
            src={imageUrl ?? "/images/logo.png"}
            width={1000}
            height={700}
            alt={title}
          />
        </figure>
      </>

      <div className="p-2">
        <div className="font-bold text-white">{title}</div>
        <div className="font-bold text-secondary-content">฿{price}</div>
      </div>
    </Link>
  );
};

export default ProductBox;
