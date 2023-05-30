export function ChatLoading() {
  return (
    <div className="h-full flex flex-col justify-end px-4 pb-3 gap-3">
      <div className="w-10 self-start bg-purple-700/50 h-3 rounded-xl animate-pulse" />
      <div className="self-start p-3 bg-purple-700 rounded-b-lg rounded-se-lg w-2/4 animate-pulse opacity-50">
        <div className="h-4 bg-gray-900/40 rounded-xl animate-pulse" />
      </div>

      <div className="w-10 self-end bg-purple-700/50 h-3 rounded-xl animate-pulse" />
      <div className="self-end p-3 bg-purple-700 rounded-t-lg rounded-es-lg w-1/4 animate-pulse opacity-30">
        <div className="w-full h-4 bg-gray-900/40  rounded-xl animate-pulse" />
      </div>

      <div className="w-10 self-start bg-purple-700/50 h-3 rounded-xl animate-pulse" />
      <div className="self-start p-3 bg-purple-700 rounded-b-lg rounded-se-lg w-1/4 animate-pulse opacity-50">
        <div className="w-full h-4 bg-gray-900/40 rounded-xl animate-pulse" />
      </div>

      <div className="w-10 self-end bg-purple-700/50 h-3 rounded-xl animate-pulse" />
      <div className="self-end p-3 bg-purple-700 rounded-t-lg rounded-es-lg w-2/4 animate-pulse opacity-30">
        <div className="w-full h-4 bg-gray-900/40  rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
