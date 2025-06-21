"use client";

import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";

type Location = {
  id: number;
  name: string;
  sponsor: string;
  email: string;
  ramal: string;
  block: string;
  room: string;
  description?: string;
};

export default function LocationRelatorio() {
  const { fetchWithAuth } = useFetch("Relatório de Locais");
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithAuth("/location", { method: "GET" });
        if (res?.status === 200) setLocations(res.data);
      } catch (err) {
        console.error("Erro ao buscar locais:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow overflow-hidden">
        <thead>
          <tr className="bg-blue-950 text-white">
            <th className="py-3 px-4 text-left">Nome</th>
            <th className="py-3 px-4 text-left">Responsável</th>
            <th className="py-3 px-4 text-left">E-mail</th>
            <th className="py-3 px-4 text-left">Ramal</th>
            <th className="py-3 px-4 text-left">Bloco</th>
            <th className="py-3 px-4 text-left">Sala</th>
            <th className="py-3 px-4 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-3 px-4">{loc.name}</td>
              <td className="py-3 px-4">{loc.sponsor}</td>
              <td className="py-3 px-4">{loc.email}</td>
              <td className="py-3 px-4">{loc.ramal}</td>
              <td className="py-3 px-4">{loc.block}</td>
              <td className="py-3 px-4">{loc.room}</td>
              <td className="py-3 px-4">{loc.description || "-"}</td>
            </tr>
          ))}
          {locations.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                Nenhum local cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
