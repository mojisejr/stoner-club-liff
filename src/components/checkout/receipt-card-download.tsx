import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Cart } from "~/interfaces/cart";
import { FaFileDownload } from "react-icons/fa";
import html2canvas from "html2canvas-pro";
import { Order } from "~/interfaces/order";

interface ReceiptCardDownloadProps {
  order: Order;
  downloadable: boolean;
}

const ReceiptCardDownload = ({
  order,
  downloadable,
}: ReceiptCardDownloadProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef) return;
    const canvas = await html2canvas(cardRef.current!);
    const data = canvas.toDataURL("image/png");
    //vertual link element created
    const link = document.createElement("a");

    link.href = data;
    link.download = `receipt_${new Date().getTime()}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full p-2">
      {downloadable ? (
        <button
          onClick={() => handleDownload()}
          className="btn btn btn-circle btn-primary absolute right-3 top-2 flex items-center justify-center"
        >
          <FaFileDownload size={24} />
        </button>
      ) : null}
      <div ref={cardRef} className="rounded-xl p-2 shadow">
        <div className="flex flex-col items-center justify-center gap-2">
          <figure>
            <Image src="/images/logo.png" height={80} width={80} alt="logo" />
          </figure>
          <div className="text-xl">
            <span className="text-2xl">$</span>
            toner Club
          </div>
          <div className="w-full bg-blue-200 p-2 text-center">
            ใบเสร็จรับเงิน
          </div>
        </div>
        <div className="min-h-[200px] w-full">
          <table className="table-xs w-full">
            <thead className="bg-slate-200">
              <th className="text-start">รายการ</th>
              <th className="text-start">฿</th>
            </thead>
            <tbody>
              {order == undefined ? (
                <div>loading..</div>
              ) : (
                <>
                  {order?.items.map((itm, index) => (
                    <tr key={index}>
                      <td>
                        {index + 1}. {itm.product.title}
                      </td>
                      <td>{itm.amount * +itm.product.price}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full bg-slate-100 p-2 text-right  text-xl">
          รวมเป็นเงิน:{" "}
          <span className="font-bold text-secondary-content">
            ฿{order?.subtotal}
          </span>
        </div>
        {/* <div className="flex w-full flex-col items-center justify-center">
          <div className="py-4">QR-Code ชำระเงิน</div>
          <figure className="flex w-48 items-center justify-center">
            <Image
              src="/images/payment-qr.jpg"
              height={750}
              width={750}
              alt="logo"
            />
          </figure>
        </div> */}

        <div className="w-full pt-2 text-end text-xs">
          all right reserved 2024
        </div>
      </div>
    </div>
  );
};

export default ReceiptCardDownload;
