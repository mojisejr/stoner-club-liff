import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLine } from "~/context/lineContext";

const ResultPage = () => {
  const { liff } = useLine();
  const { query } = useRouter();

  const downloadReceipt = () => {
    liff?.openWindow({
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/order/checkout/download?orderId=${query?.cartId}`,
      external: true,
    });
  };

  return (
    <main className="flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="text-xl font-bold text-green-400">
        {query.title ?? ""}
      </div>
      <div>{query.message ?? ""}</div>

      {query.cartId != undefined ? (
        <button
          onClick={() => downloadReceipt()}
          className="button btn-secondary"
        >
          ดาวโหลดใบเสร็จ
        </button>
      ) : null}

      <Link className="btn btn-primary" href={(query.backUrl as string) ?? "/"}>
        กลับ
      </Link>
    </main>
  );
};

export default ResultPage;
