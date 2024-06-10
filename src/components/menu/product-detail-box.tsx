import React from "react";
import { Product } from "~/interfaces/product";
import Image from "next/image";

interface ProductDetailBoxProps {
  product: Product;
}

const ProductDetailBox = ({ product }: ProductDetailBoxProps) => {
  return (
    <div className="w-84 card card-compact bg-base-100 shadow-xl">
      <figure className="w-full">
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
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <h2 className="text-xl font-bold text-secondary-content">
          ฿{product.price}
        </h2>
        <p>{product.desc}</p>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetailBox;
