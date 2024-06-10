import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { LineProvider } from "~/context/lineContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SaleProvider } from "~/context/saleContext";
import Navbar from "~/components/shared/navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <LineProvider>
        <SaleProvider>
          <Navbar />
          <Component {...pageProps} />
          <ToastContainer limit={1} />
        </SaleProvider>
      </LineProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
