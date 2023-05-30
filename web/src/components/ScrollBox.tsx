"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";

interface ScrollBoxProps {
  children?: React.ReactNode;
}

export function ScrollBox({ children }: ScrollBoxProps) {
  return (
    <ScrollArea.Root className="flex-1 overflow-hidden my-3">
      <ScrollArea.Viewport className="w-full h-full [&>*]:h-full">
        {children}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        orientation="vertical"
        className="w-3 p-1 flex bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors select-none touch-none"
      >
        <ScrollArea.Thumb className="flex-1 bg-purple-500 rounded-lg relative scroll-thumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
