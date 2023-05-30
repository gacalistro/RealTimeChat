import { MessagesSquare } from "lucide-react";

export function EmptyChat() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 relative">
      <MessagesSquare className="w-14 h-14 text-purple-600/40" />
      <span className="font-bold text-purple-600/50 select-none ">
        Comece uma conversa
      </span>

      <div className="absolute w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-[.15]" />
    </div>
  );
}
