import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import * as dotenv from "dotenv";

import authRoute from "./routes/auth";
import chatRoute from "./routes/chat";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(authRoute);
app.use(chatRoute);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const users: Map<string, string> = new Map();

io.on("connection", (socket) => {
  socket.on("set-user", (data: string) => {
    users.set(data, socket.id);

    io.emit("user-list", Object.fromEntries(users));

    socket.on("private-message", (data) => {
      socket.to(data.to).emit("message-received", data);
    });
  });

  socket.on("disconnect", () => {
    users.forEach((user, key) => {
      user === socket.id ? users.delete(key) : null;
    });

    io.emit("user-list", Object.fromEntries(users));
  });
});

httpServer.listen({ port: 3333 }, () =>
  console.log("Server is now listening on localhost:3333")
);
