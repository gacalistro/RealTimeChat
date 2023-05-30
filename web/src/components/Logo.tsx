import { MessagesSquare } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-1">
      <MessagesSquare className="w-6 h-6 text-purple-500" />
      <h1 className="font-bold text-2xl tracking-wide select-none">Chat</h1>
    </div>
  );
}
