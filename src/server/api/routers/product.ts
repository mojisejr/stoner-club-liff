import {
  getBrandList,
  getProductById,
  getProductsByBrand,
} from "~/server/services/database.service";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const productRouter = createTRPCRouter({
  getByid: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      return await getProductById(input.productId);
    }),

  getByBrand: publicProcedure
    .input(z.object({ brand: z.string() }))
    .query(async ({ input }) => {
      return await getProductsByBrand(input.brand);
    }),

  getBrandList: publicProcedure.query(async () => {
    return await getBrandList();
  }),
});
