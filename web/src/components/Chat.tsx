import { useContext, useEffect, useRef } from "react";
import { X } from "lucide-react";

import { ChatContext } from "@/contexts/ChatContext";

// COMPONENTS
import { OnlineBadge } from "./OnlineBadge";
import { OfflineBadge } from "./OfflineBadge";
import { ScrollBox } from "./ScrollBox";
import { Message } from "./Message";
import { ChatInput } from "./ChatInput";

// TYPES
import { OnlineUsersType, MessageSide, MessageType } from "@/shared/types";
import { ChatLoading } from "./ChatLoading";
import { socket } from "@/lib/socket";

interface ChatProps {
  onlineUsers: OnlineUsersType;
}

export function Chat({ onlineUsers }: ChatProps) {
  const {
    user,
    chattingWith,
    chatHistory,
    realTimeChat,
    setChattingWith,
    setRealTimeChat,
  } = useContext(ChatContext);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll messages to bottom when chatHistory has finished fetching
  useEffect(() => {
    if (chatHistory) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, realTimeChat]);

  useEffect(() => {
    socket.on("message-received", (data: MessageType) => {
      console.log(data);

      setRealTimeChat((prevState) => [
        ...prevState,
        {
          userId: data.userId,
          message: data.message,
        },
      ]);
    });
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-bold">{chattingWith?.name}</span>
          {chattingWith &&
          Object.keys(onlineUsers).includes(chattingWith.id) ? (
            <OnlineBadge />
          ) : (
            <OfflineBadge />
          )}
        </div>

        <button onClick={() => setChattingWith(null)}>
          <X className="w-6 h-6 hover:text-purple-300 transition-colors" />
        </button>
      </div>

      {/* Chat Body (Messages)*/}
      {chatHistory ? (
        <ScrollBox>
          <div className="h-full flex flex-col justify-end px-4 gap-3">
            {realTimeChat.map((message) => (
              <Message
                key={message.id}
                {...message}
                side={
                  message.userId === user.id
                    ? MessageSide.sent
                    : MessageSide.received
                }
              />
            ))}

            {/* Reference to scroll to bottom */}
            <div ref={bottomRef} />
          </div>
        </ScrollBox>
      ) : (
        <ChatLoading />
      )}

      {/* Chat Input */}
      <ChatInput onlineUsers={onlineUsers} />
    </div>
  );
}
