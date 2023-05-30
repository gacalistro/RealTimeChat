"use server";

import { cookies } from "next/headers";
import { api } from "../lib/api";

interface loginData {
  cpf: string;
  password: string;
}

export async function handleLogin({ cpf, password }: loginData) {
  try {
    const response = await api.post("/login", { cpf, password });

    const token = response.data.token;

    const expiresIn = 60 * 60 * 24 * 30; // 30 days

    cookies().set("token", token, {
      maxAge: expiresIn,
    });
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
}
