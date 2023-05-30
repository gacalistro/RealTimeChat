import { FormEvent, useContext, useState } from "react";
import { Forward } from "lucide-react";
import { socket } from "@/lib/socket";

import { ChatContext } from "@/contexts/ChatContext";

import { OnlineUsersType } from "@/shared/types";

interface ChatInputProps {
  onlineUsers: OnlineUsersType;
}

export function ChatInput({ onlineUsers }: ChatInputProps) {
  const [message, setMessage] = useState<string>("");

  const { user, chattingWith, saveMessage, setRealTimeChat } =
    useContext(ChatContext);

  let formAbleToSend =
    message.trim().length > 0 &&
    Object.keys(onlineUsers).includes(chattingWith?.id ?? "");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    socket.emit("private-message", {
      from: onlineUsers[user.id],
      to: onlineUsers[chattingWith!.id],
      userId: user.id,
      message,
    });

    setRealTimeChat((prevState) => [
      ...prevState,
      {
        userId: user.id,
        message: message,
      },
    ]);

    saveMessage(message, user.id);

    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-3 px-6 py-2 flex items-center gap-2 bg-purple-700 rounded-full">
        <input
          type="text"
          placeholder="Digite sua mensagem"
          className="flex-1 bg-transparent outline-none text-xs max-xs:w-2/3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit" disabled={!formAbleToSend}>
          <Forward className="w-6 h-6 hover:text-purple-300 transition-colors" />
        </button>
      </div>
    </form>
  );
}
