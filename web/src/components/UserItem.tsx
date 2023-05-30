import { ButtonHTMLAttributes } from "react";

// COMPONENTS
import { OnlineBadge } from "./OnlineBadge";
import { OfflineBadge } from "./OfflineBadge";

// TYPES
import { OnlineUsersType } from "@/shared/types";

interface UserItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  name: string;
  onlineUsers: OnlineUsersType;
}

export function UserItem({ id, name, onlineUsers, ...rest }: UserItemProps) {
  return (
    <button
      {...rest}
      className="flex flex-col gap-1 lg:px-3 px-6 py-2 bg-purple-600/10 hover:bg-purple-600/20 rounded-md transition-colors"
    >
      <span className="font-bold text-sm">{name}</span>

      <span>
        {Object.keys(onlineUsers).includes(id) ? (
          <OnlineBadge />
        ) : (
          <OfflineBadge />
        )}
      </span>
    </button>
  );
}
