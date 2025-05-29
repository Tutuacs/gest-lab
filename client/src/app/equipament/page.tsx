"use client";

import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Equipament = {
  id: string;
  name: string;
  patrimonio: string;
  tag: string;
  modelo: string;
  fabricante: string;
  status: string;
};

export default function EquipamentListPage() {
  const { fetchWithAuth } = useFetch("Listagem de Equipamentos");
  const [equipaments, setEquipaments] = useState<Equipament[]>([]);
  const router = useRouter();

  const fetchEquipaments = async () => {
    const result = await fetchWithAuth("/equipament", {
      method: "GET",
    });

    if (result?.status === 200) {
      setEquipaments(result.data);
    }
  };

  useEffect(() => {
    fetchEquipaments();
  }, []);

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">Equipamentos Cadastrados</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-left">Patrimônio</th>
              <th className="py-3 px-4 text-left">Tag</th>
              <th className="py-3 px-4 text-left">Modelo</th>
              <th className="py-3 px-4 text-left">Fabricante</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipaments.map((equipament) => (
              <tr
                key={equipament.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{equipament.name}</td>
                <td className="py-3 px-4">{equipament.patrimonio}</td>
                <td className="py-3 px-4">{equipament.tag}</td>
                <td className="py-3 px-4">{equipament.modelo}</td>
                <td className="py-3 px-4">{equipament.fabricante}</td>
                <td className="py-3 px-4">{equipament.status}</td>
                <td className="py-3 px-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      router.push(`/equipament/${equipament.id}`)
                    }
                  >
                    Ver detalhes
                  </button>
                </td>
              </tr>
            ))}
            {equipaments.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Nenhum equipamento cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
