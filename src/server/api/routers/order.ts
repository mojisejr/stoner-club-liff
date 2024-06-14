import { getOrderById } from "~/server/services/database.service";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const orderRouter = createTRPCRouter({
  getByid: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      return await getOrderById(input.orderId);
    }),
});
