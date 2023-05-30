export function OnlineBadge() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full bg-green-500" />
      <span className="text-green-500 text-xs">Online</span>
    </div>
  );
}
