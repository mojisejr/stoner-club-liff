import { type SchemaTypeDefinition } from "sanity";
import { userType } from "./schemas/user";
import { productType } from "./schemas/product";
import { brandType } from "./schemas/brand";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, productType, brandType],
};
