"use client";

import { useContext, useEffect, useState } from "react";
import { LogOut } from "lucide-react";

import { socket } from "@/lib/socket";
import { ChatContext } from "@/contexts/ChatContext";

import { Logo } from "@/components/Logo";
import { EmptyChat } from "@/components/EmptyChat";
import { ScrollBox } from "@/components/ScrollBox";
import { OnlineBadge } from "@/components/OnlineBadge";
import { UserItem } from "@/components/UserItem";
import { Chat } from "@/components/Chat";

import { User, OnlineUsersType } from "@/shared/types";

export default function Home() {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsersType>({});

  const { user, usersToChat, chattingWith, setChattingWith, getChatHistory } =
    useContext(ChatContext);

  async function handleSelectUserToChat(user: User) {
    setChattingWith(user);

    getChatHistory(user);
  }

  async function connectSocket() {
    socket.on("connect", () => {
      socket.emit("set-user", user.id);
    });

    socket.on("user-list", (data) => {
      setOnlineUsers(data);
    });
  }

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    // Container
    <main className="h-screen flex">
      {/* Left */}
      <div className="w-full h-full md:w-1/4 flex flex-col">
        <header className="flex flex-col items-start gap-5 p-6 md:p-4 bg-purple-500/20 md:rounded-br-lg">
          <Logo />

          <div className="flex items-center justify-between w-full">
            <div>
              <span className="font-semibold 2xl:text-xl select-none">
                {user.name}
              </span>
              <OnlineBadge />
            </div>
            <a href="/logout">
              <LogOut className="w-4 h-4 hover:text-red-400 transition-colors" />
            </a>
          </div>
        </header>

        <ScrollBox>
          <div className="flex flex-col gap-3 max-md:mx-4">
            {usersToChat.map((userToChat) => (
              <UserItem
                key={userToChat.id}
                {...userToChat}
                onlineUsers={onlineUsers}
                onClick={() => handleSelectUserToChat(userToChat)}
              />
            ))}
          </div>
        </ScrollBox>
      </div>

      {/* Right */}
      <div
        className={`flex-1 py-6 px-7 ${
          chattingWith ? "chat-mobile" : "max-md:hidden"
        }`}
      >
        {chattingWith ? <Chat onlineUsers={onlineUsers} /> : <EmptyChat />}
      </div>
    </main>
  );
}
