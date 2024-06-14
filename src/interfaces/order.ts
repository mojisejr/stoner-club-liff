import { Product } from "./product";

export interface Order {
  orderId: string;
  lineId: string;
  subtotal: number;
  items: {
    amount: number;
    product: Product;
  }[];
}
