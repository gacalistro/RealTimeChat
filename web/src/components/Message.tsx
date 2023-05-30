import { useContext } from "react";

// TYPES
import { MessageSide } from "@/shared/types";
import { ChatContext } from "@/contexts/ChatContext";

interface MessageProps {
  side?: MessageSide;
  message: string;
}

export function Message({
  side = MessageSide.received,
  message,
}: MessageProps) {
  const { user, chattingWith } = useContext(ChatContext);

  return (
    <>
      {/* IF MESSAGE WAS RECEIVED */}
      {side === MessageSide.received && (
        <div className="self-start text-xs">
          <span className="mb-2 block text-start">{chattingWith?.name}</span>
          <div className="p-3 bg-purple-500 rounded-b-lg rounded-se-lg">
            {message}
          </div>
        </div>
      )}

      {/* IF MESSAGE WAS SENT */}
      {side === MessageSide.sent && (
        <div className="self-end text-xs">
          <span className="mb-2 block text-end">{user.name}</span>
          <div className="p-3 bg-green-400 rounded-t-lg rounded-es-lg">
            {message}
          </div>
        </div>
      )}
    </>
  );
}
