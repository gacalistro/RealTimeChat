export function OfflineBadge() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full bg-red-400" />
      <span className="text-red-400 text-xs">Offline</span>
    </div>
  );
}
