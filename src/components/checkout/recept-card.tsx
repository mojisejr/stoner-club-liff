import Image from "next/image";
import React, { useRef } from "react";
import { Cart } from "~/interfaces/cart";
import { FaFileDownload } from "react-icons/fa";
import html2canvas from "html2canvas-pro";

interface ReceiptCardProps {
  cartItem: Cart;
}

const ReceiptCard = ({ cartItem }: ReceiptCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef) return;
    const canvas = await html2canvas(cardRef.current!);
    const data = canvas.toDataURL("image/png");
    //vertual link element created
    const link = document.createElement("a");

    link.href = data;
    link.download = `receipt-${cartItem.lineId}_${new Date().getTime()}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full p-2">
      <button
        onClick={() => handleDownload()}
        className="btn btn btn-circle btn-primary absolute right-3 top-2 flex items-center justify-center"
      >
        <FaFileDownload size={24} />
      </button>
      <div ref={cardRef} className="rounded-xl p-2 shadow">
        <div className="flex flex-col items-center justify-center gap-2">
          <figure>
            <Image src="/images/logo.png" height={80} width={80} alt="logo" />
          </figure>
          <div className="text-xl">
            <span className="text-2xl">$</span>
            toner Club
          </div>
          <div className="w-full bg-blue-200 text-center">Sale Slip</div>
        </div>
        <div className="divider border-b-2 pb-4">Purchase Detail</div>
        <ol className="rounded-xl p-2">
          {cartItem?.items.map((itm, index) => (
            <li key={index} className="grid grid-cols-2">
              <span>
                {index + 1}. {itm.product.title}
              </span>{" "}
              <span className="text-end">฿{itm.total}</span>
            </li>
          ))}
        </ol>
        <div className="w-full bg-slate-100 p-2 text-right  text-xl">
          Subtotal:{" "}
          <span className="font-bold text-secondary-content">
            ฿{cartItem?.subtotal}
          </span>
        </div>
        <div className="w-full pt-2 text-end text-xs">
          all right reserved 2024
        </div>
      </div>
    </div>
  );
};

export default ReceiptCard;
