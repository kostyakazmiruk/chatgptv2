import { type CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
// import { db } from "~/server/db";

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
  console.log("messages", messages);
  // const chat = await db.chat.findOrCreate({
  //   data: {
  //     userId: "1", // Assuming we have one user
  //   },
  // });
  //
  // // Save the messages to the database
  // const savedMessages = await Promise.all(
  //   messages.map(async (message) => {
  //     return db.message.findOrCreate({
  //       data: {
  //         content: message.content,
  //         // chatId: chat.id,
  //         authorId: "1", // Assuming we have one user
  //       },
  //     });
  //   }),
  // );
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
