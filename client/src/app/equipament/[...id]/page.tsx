"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useFetch from "@/utils/useFetch";

type Equipament = {
  id: number;
  name: string;
  patrimonio: string;
  tag: string;
  serie: string;
  description?: string;
  status: string;
};

type Event = {
  id: number;
  description: string;
  from: string;
  to: string;
  eventType: {
    name: string;
  };
};

export default function EquipamentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { fetchWithAuth } = useFetch("Detalhes do Equipamento");

  const [equipament, setEquipament] = useState<Equipament | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchData = async () => {
    const id = params?.id?.toString();
    if (!id) return;

    const equip = await fetchWithAuth(`/equipament/${id}`, { method: "GET" });
    const evts = await fetchWithAuth(`/event?equipamentId=${id}`, { method: "GET" });

    if (equip?.status === 200) setEquipament(equip.data);
    if (evts?.status === 200) setEvents(evts.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!equipament) {
    return <div className="p-6 text-center text-gray-500">Carregando equipamento...</div>;
  }

  return (
    <main className="p-10 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Equip Info */}
        <section className="w-full md:w-1/2 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Equip Info</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Nome:</strong> {equipament.name}</li>
            <li><strong>Patrimônio:</strong> {equipament.patrimonio}</li>
            <li><strong>Tag:</strong> {equipament.tag}</li>
            <li><strong>Série:</strong> {equipament.serie}</li>
            <li><strong>Status:</strong> {equipament.status}</li>
            {equipament.description && <li><strong>Descrição:</strong> {equipament.description}</li>}
          </ul>
        </section>

        {/* Events */}
        <section className="w-full md:w-1/2 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-500">Nenhum evento registrado.</p>
          ) : (
            <ul className="space-y-3">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="border border-gray-300 p-3 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/event/${event.id}`)}
                >
                  <strong>{event.eventType.name}</strong><br />
                  {event.description}<br />
                  <small>{new Date(event.from).toLocaleDateString()} - {new Date(event.to).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Ações Opcionais */}
      <div className="flex justify-end gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => router.push(`/license?equipamentId=${equipament.id}`)}
        >
          Licenças
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => router.push(`/report?equipamentId=${equipament.id}`)}
        >
          Relatórios
        </button>
      </div>
    </main>
  );
}
