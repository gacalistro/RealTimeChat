import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import z from "zod";

const router = Router();

// Handles validation of the token that is sent in headers authorization and then proceeds to the following route or throws an error
async function prehandle(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Missing Token. Please, login." });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    res.status(401).send({ message: error });
  }

  next();
}

// Get all users except the logged in user who made the request.
// It will be used to display the users that the logged user can chat with.
router.get("/users", prehandle, async (req, res) => {
  const token = req.headers.authorization!.split(" ")[1];

  const payloadSchema = z.object({
    id: z.string(),
  });

  const { id } = payloadSchema.parse(jwt.decode(token));

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: id,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return res.send({ users });
});

// Check if there is a chat between two users and if not, creates the chat and relates the users
// It will be used when a user is selected to chat with
router.post("/chat", prehandle, async (req, res) => {
  const token = req.headers.authorization!.split(" ")[1];

  const payloadSchema = z.object({
    id: z.string(),
  });

  const { id } = payloadSchema.parse(jwt.decode(token));

  const bodySchema = z.object({
    chattingWith: z.string(),
  });

  const { chattingWith } = bodySchema.parse(req.body);

  // Try to find a chat between two specified users
  let chat = await prisma.chat.findFirst({
    where: {
      userChats: {
        some: { userId: id },
      },
      AND: {
        userChats: {
          some: {
            userId: chattingWith,
          },
        },
      },
    },
    include: {
      messages: true,
    },
  });

  // // If there is no chat, creates one and relates both users
  if (!chat) {
    chat = await prisma.chat.create({
      data: {},
      include: {
        messages: true,
      },
    });

    await prisma.userChat.create({
      data: {
        chatId: chat.id,
        userId: id,
      },
    });

    await prisma.userChat.create({
      data: {
        chatId: chat.id,
        userId: chattingWith,
      },
    });
  }

  return res.send({ chat });
});

// router.get("/chat", async (req, res) => {
//   const chats = await prisma.chat.findMany();

//   return res.send({ chats });
// });

router.post("/messages", prehandle, async (req, res) => {
  const token = req.headers.authorization!.split(" ")[1];

  const payloadSchema = z.object({
    id: z.string(),
  });

  const { id } = payloadSchema.parse(jwt.decode(token));

  const bodySchema = z.object({
    chatId: z.string(),
    message: z.string(),
  });

  const { chatId, message } = bodySchema.parse(req.body);

  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
  });

  if (!chat) {
    return res.status(403).send({ message: "Conversa não iniciada." });
  }

  await prisma.message.create({
    data: {
      userId: id,
      chatId: chatId,
      message,
    },
  });

  return res.status(201).send();
});

export default router;
