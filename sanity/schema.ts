import { type SchemaTypeDefinition } from "sanity";
import { userType } from "./schemas/user";
import { productType } from "./schemas/product";
import { brandType } from "./schemas/brand";
import { categoryType } from "./schemas/category";
import { orderType } from "./schemas/order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, productType, brandType, categoryType, orderType],
};
