import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLine } from "./lineContext";
import { api } from "~/utils/api";

type contextType = {
  sale: boolean;
};

const defaultContext: contextType = { sale: false };

const SaleContext = createContext(defaultContext);

export function SaleProvider({ children }: { children: ReactNode }) {
  const [sale, setSale] = useState<boolean>(false);
  const { liff, profile } = useLine();
  const { data: user, refetch } = api.user.getById.useQuery({
    lineId: profile?.userId!,
  });

  useEffect(() => {
    void isSale();
    void refetch();
  }, [user, liff]);

  async function isSale() {
    if (user?.isSale) {
      setSale(true);
    } else {
      setSale(false);
    }
  }

  const value = { sale };
  return <SaleContext.Provider value={value}>{children}</SaleContext.Provider>;
}

export function useSale() {
  return useContext(SaleContext);
}
