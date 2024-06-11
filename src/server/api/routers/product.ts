import {
  getBrandList,
  getCategoryList,
  getProductById,
  getProductsByBrand,
  saveOrder,
} from "~/server/services/database.service";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";
import { Cart } from "~/interfaces/cart";

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

  getCategoryList: publicProcedure.query(async () => {
    return await getCategoryList();
  }),

  createOrder: publicProcedure
    .input(
      z.object({
        cartItem: z.object({
          lineId: z.string(), // sale
          cartId: z.string(),
          items: z.array(
            z.object({
              amount: z.number(),
              product: z.any().optional(),
              total: z.number(),
            }),
          ),
          subtotal: z.number(),
          count: z.number(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      return await saveOrder(input.cartItem as Cart);
    }),
});
