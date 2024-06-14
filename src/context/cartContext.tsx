import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLine } from "./lineContext";
import { api } from "~/utils/api";
import { Product } from "~/interfaces/product";
import { Cart } from "~/interfaces/cart";

type contextType = {
  cartItem?: Cart | undefined;
  incItem: (item: Product, amount: number) => void;
  decItem: (item: Product, amount: number) => void;
  removeItemFromCart: (item: Product) => void;
  clearCart: () => void;
  checkOut: () => void;
};

const defaultContext: contextType = {
  cartItem: undefined,
  incItem: () => undefined,
  decItem: () => undefined,
  removeItemFromCart: () => undefined,
  clearCart: () => undefined,
  checkOut: () => undefined,
};

const CartContext = createContext(defaultContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const { profile } = useLine();
  const {
    data: user,
    isLoading,
    refetch,
  } = api.user.getById.useQuery({
    lineId: profile?.userId!,
  });

  const [cartItem, setCartItem] = useState<Cart>();

  useEffect(() => {
    if (!user) void refetch();

    if (!isLoading || user != undefined) {
      if (user?.isSale) {
        createCart();
      }
    }

    if (localStorage.getItem("cart") != null) {
      getCartItems();
    }
  }, [user, isLoading]);

  const createCart = () => {
    const hasCart = localStorage.getItem("cart");

    if (hasCart == "{}") {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartId: `${profile?.userId}_${new Date().getTime()}`,
          lineId: profile?.userId,
          items: [],
          subtotal: 0,
        }),
      );
    }

    if (hasCart != undefined) return;

    localStorage.setItem(
      "cart",
      JSON.stringify({
        cartId: `${profile?.userId}_${new Date().getTime()}`,
        lineId: profile?.userId,
        items: [],
        subtotal: 0,
      }),
    );
  };

  const getCartItems = () => {
    const cartItem = parsedLocalstorage();
    setCartItem(cartItem!);
  };

  const incItem = (item: Product, amount: number) => {
    let cartItem = parsedLocalstorage();

    const found = cartItem?.items.find((itm) => itm.product._id == item._id);

    if (found) {
      cartItem = {
        ...cartItem,
        items: cartItem?.items.map((itm) => {
          if (itm.product._id == item._id) {
            return {
              ...itm,
              amount: itm.amount + amount,
              total: (itm.amount + amount) * +itm.product.price,
            };
          }
          return itm;
        }),
      } as Cart;
      //calcualte subtotal
      cartItem = {
        ...cartItem,
        subtotal: cartItem.items.reduce((a, b) => a + b.total, 0),
        count: cartItem.items
          .map((itm) => itm.amount)
          .reduce((a, b) => a + b, 0),
      };
    } else {
      cartItem?.items.push({
        product: item,
        amount,
        total: amount * +item.price,
      });

      //calcualte subtotal
      cartItem = {
        ...cartItem,
        subtotal: cartItem?.items.reduce((a, b) => a + b.total, 0)!,
        count: cartItem?.items
          .map((itm) => itm.amount)
          .reduce((a, b) => a + b, 0)!,
      } as Cart;
    }

    localStorage.setItem("cart", JSON.stringify(cartItem));
    setCartItem(cartItem!);
  };

  const decItem = (item: Product, amount: number) => {
    let cartItem = parsedLocalstorage();

    const found = cartItem?.items.find((itm) => itm.product._id == item._id);

    if (!found) return;

    cartItem = {
      ...cartItem,
      items: cartItem?.items.map((itm) => {
        if (itm.product._id == item._id) {
          return {
            ...itm,
            amount: itm.amount - amount <= 1 ? 1 : itm.amount - amount,
            total:
              itm.amount - amount <= 1
                ? 1 * +itm.product.price
                : (itm.amount - amount) * +itm.product.price,
          };
        }
        return itm;
      })!,
    } as Cart;

    //calcualte subtotal
    cartItem = {
      ...cartItem,
      subtotal: cartItem.items.reduce((a, b) => a + b.total, 0),
      count: cartItem.items.map((itm) => itm.amount).reduce((a, b) => a + b, 0),
    };

    localStorage.setItem("cart", JSON.stringify(cartItem));
    setCartItem(cartItem! as Cart);
  };

  const removeItemFromCart = (item: Product) => {
    let cartItem = parsedLocalstorage();

    const found = cartItem?.items.find((itm) => itm.product._id == item._id);

    if (!found) return;

    cartItem = {
      ...cartItem,
      items: cartItem?.items.filter((itm) => itm.product._id != item._id)!,
    } as Cart;

    cartItem = {
      ...cartItem,
      subtotal: cartItem.items.reduce((a, b) => a + b.total, 0),
      count: cartItem.items.map((itm) => itm.amount).reduce((a, b) => a + b, 0),
    };

    localStorage.setItem("cart", JSON.stringify(cartItem));
    setCartItem(cartItem! as Cart);
  };

  const clearCart = () => {
    let cartItem = parsedLocalstorage();

    cartItem = {
      ...cartItem,
      items: [],
      subtotal: 0,
      count: 0,
    } as Cart;

    localStorage.setItem("cart", JSON.stringify(cartItem));
    setCartItem(cartItem! as Cart);
  };

  const checkOut = () => {
    setCartItem(undefined);
    localStorage.removeItem("cart");
  };

  const parsedLocalstorage = () => {
    const parsed =
      localStorage.getItem("cart") == null
        ? null
        : (JSON.parse(localStorage.getItem("cart")!) as Cart);
    return parsed;
  };
  const value = {
    cartItem,
    incItem,
    decItem,
    removeItemFromCart,
    clearCart,
    checkOut,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
