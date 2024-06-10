import { NewUserProfile } from "~/interfaces/new-user-profile";
import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import { Brand } from "~/interfaces/brand";
import { Product } from "~/interfaces/product";

export const createNewUser = async (data: NewUserProfile) => {
  const query = groq`*[_type == "user" && lineId == "${data.lineId}"]`;
  const found = await client.fetch<any[]>(query);

  if (found.length <= 0) {
    const newUser = {
      _type: "user",
      _id: data.lineId,
      title: data.lineId,
      lineId: data.lineId,
      isVip: false,
      isSale: false,
    };

    const result = await client.create(newUser);
    return result;
  }

  return found;
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
    desc,
    price,
    "images": images[]{ "image": asset -> url },
    slug,
    isActive,
    details
  }[0]`;

  const found = await client.fetch<Product>(query);

  return found;
};

export const getProductsByBrand = async (brandId: string) => {
  const query = groq`*[_type == "product" && brand->_id match "${brandId}"] {
      _id,
    title,
    "brand":brand->{_id, title},
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
