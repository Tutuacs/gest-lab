"use client";

import useFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import EquipamentoRelatorio from "@/components/RelatorioEquipament";

type Params = {
  params: Promise<{ id: string }>;
};

export default function EquipamentEspecifications({ params }: Params) {
  const { id } = use(params);
  const equipamentTypeId = id;
  const [equipamentType, setEquipamentType] = useState<EquipamentType | null>(null);
  const router = useRouter();
  const { fetchWithAuth } = useFetch();

  const fetchData = async () => {
    const result = await fetchWithAuth(`/equipament-type/${equipamentTypeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("equipamentTypeId", equipamentTypeId);
    if (result?.status !== 200) {
      router.forward();
      return;
    }
    setEquipamentType(result.data);
  };

  useEffect(() => {
    if (!equipamentType) {
      fetchData();
    }
  });

  const handleNavigate = (section: "field" | "license" | "event") => {
    router.push(`/${section}-type?equipamentTypeId=${equipamentTypeId}`);
  };

  return (
  <div className="min-h-screen flex justify-center bg-gray-100 p-10">
    <div className="flex flex-col gap-10 w-full max-w-6xl">
      
      {/* Grid de Colunas (esquerda e direita) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna da Esquerda */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          {equipamentType ? (
            <>
              <h1 className="text-3xl font-bold text-blue-950 mb-2">
                {equipamentType.name}
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                Criado em: {new Date(equipamentType.createdAt).toLocaleString()}
              </p>

              <div className="border-t pt-4 mt-4">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">Especificações</h2>
                <p className="text-gray-600">Descrição: {equipamentType.description || "-"}</p>
              </div>
            </>
          ) : (
            <p className="text-gray-600">Carregando informações do tipo de equipamento...</p>
          )}
        </div>

        {/* Coluna da Direita */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4 flex flex-col">
          <button
            className="bg-blue-950 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition"
            onClick={() => handleNavigate("field")}
          >
            Campos Personalizados
          </button>
          <button
            className="bg-blue-950 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition"
            onClick={() => handleNavigate("license")}
          >
            Tipos de Certificado
          </button>
          <button
            className="bg-blue-950 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition"
            onClick={() => handleNavigate("event")}
          >
            Tipos de Atividade
          </button>
        </div>
      </div>

      {/* Relatório abaixo das colunas */}
      <div>
        <EquipamentoRelatorio />
      </div>
    </div>
  </div>
  );
}

// Tipagens
type EquipamentType = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  FieldType: FieldType[];
  LicenseType: LicenseType[];
  EventType: EventType[];
};

type FieldType = {
  id: string;
  name: string;
  type: string;
  optional: boolean;
  createdAt: Date;
};

type LicenseType = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
};

type EventType = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
};
