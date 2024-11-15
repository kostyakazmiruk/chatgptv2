import { z } from "zod";
import { type CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  chatgpt: publicProcedure
    .input(z.object({ messages: z.array(z.any()) })) // Define messages array input
    .mutation(async ({ input, ctx }) => {
      console.log("AM I HERE?");
      const { messages } = input;
      const userId = ctx.db.user?.id || "default-user-id"; // Use a real user ID if available

      // Find or create the chat with a fixed name/id for this user
      let chat = await ctx.db.chat.findFirst({
        where: { userId, name: "default-chat" },
      });

      if (!chat) {
        chat = await ctx.db.chat.create({
          data: {
            name: "default-chat",
            userId,
          },
        });
      }

      // Save each message to the database, linking it to the chat
      await Promise.all(
        messages.map((message) =>
          ctx.db.message.create({
            data: {
              content: message.content,
              chatId: chat.id,
              authorId: userId, // Assuming the user is the author
            },
          }),
        ),
      );

      // Return the messages for further processing in route.ts
      return { messages };
    }),
});
