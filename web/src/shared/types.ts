export type User = {
  id: string;
  name: string;
};

export type OnlineUsersType = {
  [id: string]: string;
};

export type MessageType = {
  message: string;
  userId: string;
  createdAt?: string;
  id?: string;
};

export type ChatHistoryType = {
  id: string;
  messages: MessageType[];
};

export enum MessageSide {
  sent = "right",
  received = "left",
}
