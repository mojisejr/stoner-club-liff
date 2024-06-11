import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { LineProvider } from "~/context/lineContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SaleProvider } from "~/context/saleContext";
import Navbar from "~/components/shared/navbar";
import { CartProvider } from "~/context/cartContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <LineProvider>
        <SaleProvider>
          <CartProvider>
            <Navbar />
            <Component {...pageProps} />
            <ToastContainer limit={1} />
          </CartProvider>
        </SaleProvider>
      </LineProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
