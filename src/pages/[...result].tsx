import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ResultPage = () => {
  const { query } = useRouter();

  return (
    <main className="flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="text-xl font-bold text-green-400">
        {query.title ?? ""}
      </div>
      <div>{query.message ?? ""}</div>
      <Link className="btn btn-primary" href={(query.backUrl as string) ?? "/"}>
        Back
      </Link>
    </main>
  );
};

export default ResultPage;
