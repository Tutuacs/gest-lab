"use client";

import { useEffect, useState } from "react";
import useFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";

type EquipamentType = {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function EquipamentTypeListPage() {
  const router = useRouter();
  const { fetchWithAuth } = useFetch("Listagem de Tipos de Equipamento");
  const [types, setTypes] = useState<EquipamentType[]>([]);

  const fetchData = async () => {
    const result = await fetchWithAuth("/equipament-type", {
      method: "GET",
    });

    if (result?.status === 200) {
      setTypes(result.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Tipos de Equipamento</h1>
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          onClick={() => router.push("/equipament-type/create")}
        >
          Novo Tipo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-blue-800 text-white text-left">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Tipo</th>
              <th className="py-3 px-4">Descrição</th>
              <th className="py-3 px-4">Criado em</th>
              <th className="py-3 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {types.length > 0 ? (
              types.map((type) => (
                <tr key={type.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{type.id}</td>
                  <td className="py-3 px-4">{type.name}</td>
                  <td className="py-3 px-4">{type.description || "-"}</td>
                  <td className="py-3 px-4">
                    {type.createdAt
                      ? new Date(type.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() =>
                        router.push(`/TipoEquipamento/${type.id}`)
                      }
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  Nenhum tipo de equipamento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
