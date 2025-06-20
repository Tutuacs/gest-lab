"use client";

import { getToastConfig } from "@/components/ui/toastConfig";
import { toast } from "@/components/ui/use-toast";
import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const result = await fetch(Backend_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });


    if (result?.status) {
      const config = getToastConfig(result.status.toString());
      let message = 'Successo';

      const body = await result.json();
      if (result.status != 200 && result.status != 201) {
        message = body.message?.toString() || "Erro desconhecido";
        toast({ title: config!.title, description: message, variant: config!.variant });
        return;
      }
  
      toast({
        title: config!.title,
        description: "Cadastro realizado com sucesso!",
        variant: config!.variant,
      });
  
      router.push('/login');
    }
  }


  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center pt-20 bg-gray-200">
      <div className="p-8 bg-white rounded-t-3xl w-96">
        <h1 className="mb-6 text-2xl font-bold text-center">Registre-se</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Nome
            </label>
            <input
              type="name"
              id="name"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-xl shadow appearance-none focus:border-red-500 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              placeholder="Digite seu nome"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-xl shadow appearance-none focus:border-red-500 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-xl shadow appearance-none focus:border-red-500 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            <button
              type="submit"
              className="w-full py-2 font-bold text-white bg-red-500 rounded-xl hover:bg-red-700 focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
            >
              Cadastrar
            </button>
        </form>
      </div>
      <Link href="/login">
        <div className="flex p-6 m-auto text-2xl text-white rounded-b-3xl hover:bg-blue-900 bg-slate-900 w-96 transition-all duration-300 ease-in-out">
          <div className="m-auto">
          Já tenho cadastro
          </div>
        </div>
      </Link>
    </main>
  );
}
