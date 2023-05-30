import { Router } from "express";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod";

const router = Router();

// LOG IN ROUTE
router.post("/login", async (req, res) => {
  // Zod Typing and Validation
  const bodySchema = z.object({
    cpf: z.string(),
    password: z.string(),
  });

  const { cpf, password } = bodySchema.parse(req.body);

  // Verify if user exists in database
  const user = await prisma.user.findUnique({
    where: {
      cpf,
    },
  });

  // Return forbidden if there is no user in db
  if (!user) {
    return res
      .status(403)
      .send({ message: "Dados incorretos. Tente novamente." });
  }

  // Checks if password is correct
  const checkedPassword = await bcrypt.compare(password, user.password);

  // Return unauthorized if password is incorrect
  if (!checkedPassword) {
    return res
      .status(401)
      .send({ message: "Dados incorretos. Tente novamente." });
  }

  // Generates a token with user data as payload
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: "30 days",
    }
  );

  return res.status(200).send({ token });
});

// SIGN IN ROUTE
router.post("/signin", async (req, res) => {
  // Zod Typing and Validation
  const bodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    password: z.string(),
  });

  const { name, cpf, password } = bodySchema.parse(req.body);

  // Verify if user exists in database
  const userExists = await prisma.user.findUnique({
    where: {
      cpf,
    },
  });

  // Return forbidden if there is no user in db
  if (userExists) {
    return res.status(403).send({ message: "CPF já cadastrado." });
  }

  // Generate hashed password to securely save in db
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      cpf,
      password: hashedPassword,
    },
  });

  // Generates a token with user data as payload
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30 days",
    }
  );

  res.status(201).send({ token });
});

export default router;
