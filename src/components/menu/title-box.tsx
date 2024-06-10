import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TitleBoxProps {
  title: string;
  imageUrl?: string;
  brandId: string;
}

const TitleBox = ({ title, imageUrl, brandId }: TitleBoxProps) => {
  return (
    <Link
      href={`/menu/${brandId}`}
      className="flex max-h-[300px] max-w-[300px] flex-col items-center  overflow-hidden rounded-md bg-primary shadow-xl hover:ring hover:ring-secondary"
    >
      <>
        <figure className="flex h-36 w-full items-center overflow-hidden bg-white p-2">
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
      </div>
    </Link>
  );
};

export default TitleBox;
