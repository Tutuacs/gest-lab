import { ROLE } from "@/common/role.enums";
import ButtonByRole from "@/components/ButtonByRole";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-gray-100 flex flex-col items-center">
      {/* Título padrão centralizado */}
      <h1 className="text-4xl font-bold text-center text-black mb-6">
        User Home / Saymon
      </h1>

      {/* Botões de perfil com estilo menor */}
      <div className="flex gap-2 mb-10">
        <ButtonByRole role={ROLE.MASTER} />
        <ButtonByRole role={ROLE.ADMIN} />
        <ButtonByRole role={ROLE.USER} />
      </div>

      {/* Card dividido em duas colunas */}
      <div className="bg-white shadow rounded-xl p-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna esquerda: Consultas */}
        <div className="flex flex-col gap-4">
            <Link href="/equipament-info">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Informações Equipamento
            </button>
            </Link>
            <Link href="/equipament">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Relatório de Equipamentos
            </button>
            </Link>
            <Link href="/equipament-type">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Relatório de Tipo de Equipamento
            </button>
            </Link>
        </div>

        {/* Divisória: vertical no desktop, horizontal no mobile */}
        <div className="md:border-l border-t md:border-t-0 border-gray-300 mx-auto h-full w-full md:w-px md:h-auto" />

        {/* Coluna direita: Cadastros */}
        <div className="flex flex-col gap-4">
            <Link href="/equipament/create">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Cadastro de Equipamento
            </button>
            </Link>
            <Link href="/equipament-type/create">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Cadastro de Tipo de Equipamento
            </button>
            </Link>
            <Link href="/event">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Cadastro de Evento
            </button>
            </Link>
            <Link href="/license">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Cadastro de Licença
            </button>
            </Link>
            </div>
        </div>
    </main>
  );
}
