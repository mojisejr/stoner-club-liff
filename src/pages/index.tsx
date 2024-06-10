import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "~/components/login";
import { useLine } from "~/context/lineContext";

export default function Home() {
  const { loggedIn, login } = useLine();
  const { replace } = useRouter();

  useEffect(() => {
    if (loggedIn) {
      void replace("/profile");
    }
  }, [loggedIn]);

  return (
    <>
      <Head>
        <title>$toner Club</title>
        <meta name="description" content="Stoner Club" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full flex-col items-center justify-center px-4 py-2">
        <figure className="w-84 md:w-96">
          <Image src="/images/hero.png" width={1000} height={700} alt="hero" />
        </figure>
        <Login />
      </main>
    </>
  );
}
