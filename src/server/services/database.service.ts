import { NewUserProfile } from "~/interfaces/new-user-profile";
import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import { Brand } from "~/interfaces/brand";
import { Product } from "~/interfaces/product";
import { Category } from "~/interfaces/category";
import { Cart } from "~/interfaces/cart";
import { Order } from "~/interfaces/order";
import { SaleNotify } from "../messaging/notify";

export const createNewUser = async (data: NewUserProfile) => {
  const query = groq`*[_type == "user" && lineId == "${data.lineId}"]`;
  const found = await client.fetch<any[]>(query);

  if (found.length <= 0) {
    const newUser = {
      _type: "user",
      _id: data.lineId,
      title: data.lineId,
      lineId: data.lineId,
      name: data.name,
      isVip: false,
      isSale: false,
    };

    const result = await client.create(newUser);
    return result;
  }

  return found;
};

export const saveOrder = async (
  cartItem: Cart,
  slipId: string,
  slipUrl: string,
  saleName: string,
) => {
  const newOrder = {
    _type: "order",
    _id: cartItem.cartId,
    title: cartItem.cartId,
    orderId: cartItem.cartId,
    items: cartItem.items.map((itm) => ({
      _key: itm.product._id,
      product: { _ref: itm.product._id },
      amount: itm.amount,
    })),
    purchaseDate: new Date(),
    subtotal: cartItem.subtotal,
    lineId: cartItem.lineId,
    hasSlip: true,
    slipImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: slipId,
      },
    },
  };

  const orderMessage = `
  ✅ รายการขาย
  ===========
  id เซลล์: ${cartItem.lineId}
  ชื่อ line: ${saleName}
  orderId: ${cartItem.cartId}
  ยอดรวม: ${cartItem.subtotal} บาท
  link สลิบ: ${slipUrl}
  ===========
  `;

  await SaleNotify(orderMessage);

  const result = await client.create(newOrder);
  return result;
};

export const getUserByLineId = async (lineId: string) => {
  const query = groq`*[_type == "user" && lineId == "${lineId}"]`;
  const found = await client.fetch<any[]>(query);

  if (found.length <= 0) {
    return null;
  } else {
    return found[0];
  }
};

export const getProductById = async (productId: string) => {
  const query = groq`*[_type == "product" && _id match "${productId}"] {
    _id,
    title,
    "brand":brand->{_id, title},
    category,
    desc,
    price,
    "images": images[]{ "image": asset -> url },
    slug,
    isActive,
    details, 
  }[0]`;

  const found = await client.fetch<Product>(query);

  return found;
};

export const getProductsByBrand = async (brandId: string) => {
  const query = groq`*[_type == "product" && brand->_id match "${brandId}" && isActive == true] {
      _id,
    title,
    "brand":brand->{_id, title},
    "category": category->{_id, title, desc},
    desc,
    price,
    "images": images[]{ "image": asset -> url },
    slug,
    isActive,
    details
  }`;

  const found = await client.fetch<Product[]>(query);

  return found;
};

export const getBrandList = async () => {
  const query = groq`*[_type == "brand"] {
  _id,
  title,
  "image": image{ "url": asset -> url },
  desc
  }`;
  const found = await client.fetch<Brand[]>(query);

  return found;
};

export const getCategoryList = async () => {
  const query = groq`*[_type == "category"]
  {
    _id,
    title,
    desc
  }`;

  const found = await client.fetch<Category[]>(query);

  return found;
};

export const getOrderById = async (orderId: string) => {
  const query = groq`*[_type == "order" && orderId == "${orderId}"] {
  orderId,
  lineId,
  subtotal,
    "items": items[]{
      amount,
      "product": product->{
         _id,
        title,
        "brand":brand->{_id, title},
        "category": category->{_id, title, desc},
        desc,
        price,
        "images": images[]{ "image": asset -> url },
        slug,
        isActive,
        details}
    }
  }[0]`;

  const found = await client.fetch<Order>(query);

  return found;
};
