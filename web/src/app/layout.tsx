import "./globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { ChatProvider } from "@/contexts/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat",
  description: "Real Time Chat using Socket.io. Made by Gabriel Calistro.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token")?.value;

  return (
    <html lang="en">
      <body className={`${inter.className} bg-purple-900 text-base`}>
        {token ? (
          <ChatProvider token={token}>{children}</ChatProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
