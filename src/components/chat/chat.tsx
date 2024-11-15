"use client";

import { useChat } from "ai/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";

function Chat({ id }) {
  const { messages, input, setInput, append, data, handleSubmit } = useChat({
    id: toString(id),
  });
  console.log("data", data);
  // const router = useRouter();
  console.log("id", id);

  console.log("messages", messages);

  return (
    <div className="static mx-auto flex h-screen max-h-screen w-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="flex py-2">
            <div className="gap-x-3">
              {message.role === "user" ? (
                <Avatar>
                  <AvatarImage src="/user.jpeg" />
                  <AvatarFallback>Kostya</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar>
                  <AvatarImage src="/assistant.jpeg" />
                  <AvatarFallback>Assistant</AvatarFallback>
                </Avatar>
              )}
            </div>
            {message.content}
          </div>
          // <div key={index}>{message.content}</div>
        ))}
      </div>
      <div className="sticky bottom-0 mx-auto flex w-2/3 border-b-cyan-950 bg-white p-4">
        <Input
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              // handleSubmit({
              //   body: { content: input, role: "user", chatId: id },
              // });
              append({ content: input, role: "user" });
              setInput("");
            }
          }}
        />
      </div>
    </div>
  );
}

export default Chat;
