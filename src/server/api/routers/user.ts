import {
  createNewUser,
  getUserByLineId,
} from "~/server/services/database.service";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ lineId: z.string() }))
    .mutation(async ({ input }) => {
      return await createNewUser({ lineId: input.lineId });
    }),
  getById: publicProcedure
    .input(z.object({ lineId: z.string() }))
    .query(async ({ input }) => {
      return await getUserByLineId(input.lineId);
    }),
});
