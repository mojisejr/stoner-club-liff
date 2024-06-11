import { Category } from "./category";

export interface Product {
  _id: string;
  title: string;
  brand: { _id: string; title: string };
  category: Category;
  desc: string;
  price: string;
  images: { image: string }[];
  slug: { _type: string; current: string };
  isActive: boolean;
  details: {
    productDetailValue: string;
    productDetailName: string;
    _type: string;
    _key: string;
  };
}
