"use client";

import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Edit, Trash } from "lucide-react";

type EquipamentType = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  FieldType: { name: string }[];
  LicenseType: { name: string }[];
  EventType: { name: string }[];
  Equipament: { id: number }[];
};

export default function CategoryRelatorio() {
  const { fetchWithAuth } = useFetch("Listagem de Tipos de Equipamentos");
  const [equipamentTypes, setEquipamentTypes] = useState<EquipamentType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEquipamentTypes = async () => {
      const result = await fetchWithAuth("/equipament-type", {
        method: "GET",
      });

      if (result?.status === 200) {
        setEquipamentTypes(result.data);
      }
    };

    fetchEquipamentTypes();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow overflow-hidden">
        <thead>
          <tr className="bg-blue-950 text-white">
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Nome</th>
            <th className="py-3 px-4 text-left">Descrição</th>
            <th className="py-3 px-4 text-left">Criado em</th>
            <th className="py-3 px-4 text-left">Visualizar</th>
            <th className="py-3 px-4 text-left">Editar</th>
            <th className="py-3 px-4 text-left">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {equipamentTypes.map((type) => (
            <tr key={type.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-3 px-4">{type.id}</td>
              <td className="py-3 px-4">{type.name}</td>
              <td className="py-3 px-4">{type.description || "-"}</td>
              <td className="py-3 px-4">
                {new Date(type.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => router.push(`/equipament-type/${type.id}`)}
                  className="text-blue-700 hover:text-blue-900 transition"
                  title="Visualizar"
                >
                  <Search size={18} />
                </button>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() =>
                    router.push(`/equipament-type/edit/${type.id}`)
                  }
                  className="text-yellow-600 hover:text-yellow-800 transition"
                  title="Editar"
                >
                  <Edit size={18} />
                </button>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Tem certeza que deseja excluir este tipo de equipamento?"
                      )
                    ) {
                      // lógica de exclusão aqui
                    }
                  }}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Excluir"
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
          {equipamentTypes.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                Nenhuma categoria cadastrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
