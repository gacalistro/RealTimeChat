"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { handleLogin } from "@/services/handleLogin";

import { Logo } from "@/components/Logo";

const loginSchema = z.object({
  cpf: z.coerce.string().min(11, "CPF inválido").max(11, "CPF inválido"),
  password: z
    .string()
    .nonempty("Campo obrigatório")
    .trim()
    .min(1, "Formato inválido"),
});

type loginType = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: loginType) {
    try {
      await handleLogin(data);
    } catch (error) {
      const { message } = error as Error;
      setError("root", { message });
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center space-y-6 max-md:px-4">
      <Logo />

      <h2 className="text-center font-medium">Faça login para conversar</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col max-w-xs mx-auto space-y-6">
          <div className="flex flex-col space-y-1">
            <label htmlFor="cpf">CPF</label>
            <input
              type="number"
              id="cpf"
              placeholder="CPF"
              className="w-full p-2 rounded-md text-purple-900 number-input"
              {...register("cpf")}
            />

            {errors.cpf && (
              <span className="text-sm text-red-500">{errors.cpf.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              className="p-2 rounded-md text-purple-900"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* FORM POST ERROR MESSAGE */}
          <span className="text-sm text-center text-red-500">
            {errors.root && errors.root.message}
          </span>

          <button
            type="submit"
            className="w-fit self-center px-4 py-1 bg-purple-300 hover:bg-purple-500 rounded-md transition-colors"
          >
            Login
          </button>
        </div>
      </form>

      <span className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link
          href="/signin"
          className="text-purple-300 hover:text-purple-500 transition-colors"
        >
          Registre-se
        </Link>
      </span>
    </div>
  );
}
