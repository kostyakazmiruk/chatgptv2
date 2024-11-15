import { type CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
// import { db } from "~/server/db";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { messages, chatId }: { messages: CoreMessage[]; chatId: any } =
    await req.json();
  console.log("messages", messages);
  console.log("req", req);
  const chat = await prisma.chat.create({
    data: {
      name: "default-chat",
    },
  });

  const savedMessages = await Promise.all(
    messages.map(async (message) => {
      return prisma.message.create({
        data: {
          content: message.content,
          chatId: chat.id,
        },
      });
    }),
  );
  // Create the tRPC context
  // const ctx = await createTRPCContext(); // This should include Prisma and user session info if needed
  //
  // // Call the chatgpt mutation in chatRouter via appRouter
  // const result = await appRouter.createCaller(ctx).chat.chatgpt({ messages });

  // Use the streamed result from the chatgpt function
  const streamedResult = await streamText({
    model: openai("gpt-4"),
    system: "You are a helpful assistant.",
    messages: messages, // Use messages returned by chatRouter after saving
  });
  return streamedResult.toDataStreamResponse();
}
