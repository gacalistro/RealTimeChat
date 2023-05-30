"use client";
import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import jwtDecode from "jwt-decode";
import { api } from "@/lib/api";

import { User, ChatHistoryType, MessageType } from "@/shared/types";

type ChatProviderProps = {
  children: ReactNode;
  token: string;
};

type ChatContextType = {
  user: User;
  usersToChat: User[];
  chattingWith: User | null;
  chatHistory: ChatHistoryType | null;
  realTimeChat: MessageType[];
  saveMessage: (message: string, userId: string) => void;
  getChatHistory: (receiver: User) => void;
  setChattingWith: (chattingWith: User | null) => void;
  setChatHistory: (chatHistory: ChatHistoryType | null) => void;
  setRealTimeChat: Dispatch<SetStateAction<MessageType[]>>;
};

export const ChatContext = createContext({} as ChatContextType);

export function ChatProvider({ children, token }: ChatProviderProps) {
  const [user, _setUser] = useState<User>(jwtDecode(token));
  const [usersToChat, setUsersToChat] = useState<User[]>([]);
  const [chattingWith, setChattingWith] = useState<User | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistoryType | null>(null);
  const [realTimeChat, setRealTimeChat] = useState<MessageType[]>([]);

  // Get or Create a Chat History between logged user and the user selected to chat with
  async function getChatHistory(userChat: User) {
    const response = await api.post(
      "/chat",
      { chattingWith: userChat.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data.chat as ChatHistoryType;

    setChatHistory(data);
    setRealTimeChat(data.messages);
  }

  // Save image on Database
  async function saveMessage(message: string) {
    await api.post(
      "/messages",
      { message, chatId: chatHistory?.id ?? "" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // Initial route - Get all users that the logged user can chat with
  async function getUsersToChat() {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsersToChat(response.data.users);
  }

  useEffect(() => {
    getUsersToChat();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        usersToChat,
        chattingWith,
        chatHistory,
        realTimeChat,
        saveMessage,
        getChatHistory,
        setChattingWith,
        setChatHistory,
        setRealTimeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
