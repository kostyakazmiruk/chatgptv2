import { z } from "zod";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
        messages: z.array(z.object({ role: z.string(), content: z.string() })),
      }),
    )
    .mutation(async ({ input }) => {
      const { chatId, messages } = input;

      const result = await streamText({
        model: openai("gpt-4"),
        system: "You are a helpful assistant.",
        messages,
      });

      await ctx.prisma.message.create({
        data: {
          content: result.toString(),
          chatId,
        },
      });

      return result.toDataStreamResponse();
    }),
});
