import { Product } from "./product";

export interface Cart {
  lineId: string; // sale
  cartId: string;
  customerId: string;
  items: CartItem[];
  subtotal: number;
  count: number;
}

export interface CartItem {
  amount: number;
  product: Product;
  total: number;
}
