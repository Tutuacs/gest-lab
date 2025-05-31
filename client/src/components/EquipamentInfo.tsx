"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Definição do tipo EquipamentType para os dados do equipamento
type EquipamentType = {
  Events?: {
    id: string | number;
    eventType?: { name: string };
    from: string | Date;
    to: string | Date;
    value: number;
  }[];
  License?: {
    id: string | number;
    LicenseType: { name: string };
    from: string | Date;
    to: string | Date;
    valid: string | boolean;
  }[];
};

export default function NewEquipamentInfo() {
  const router = useRouter(); // Usado para redirecionar o usuário após selecionar o tipo de evento
  const [open, setOpen] = useState(false); // Estado para controlar a visibilidade do dropdown
  const [selectedOption, setSelectedOption] = useState("Selecionar"); // Estado para armazenar a opção selecionada
  const [equipament, setEquipament] = useState<EquipamentType | null>(null); // Estado para armazenar os dados do equipamento

  // Simulação de carregamento de dados do equipamento
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
    
    {/* Coluna Esquerda */}
    <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">

        {/* condição ? valorSeVerdadeiro : ValorSeFalso*/}
        {equipament ? (
        <div className="space-y-6 text-gray-700">


            {/* Eventos */}
            <section>
            <h3 className="font-semibold text-blue-800">Eventos</h3>
            {Array.isArray(equipament.Events) && equipament.Events.length > 0 ? (
                <ul className="list-disc list-inside ml-4">
                {equipament.Events.map((event) => (
                    <li key={event.id}>
                    {event.eventType?.name} —{" "}
                    {new Date(event.from).toLocaleDateString()} até{" "}
                    {new Date(event.to).toLocaleDateString()} — R${" "}
                    {event.value.toFixed(2)}
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 ml-4">Nenhum evento registrado.</p>
            )}
            </section>


            {/* Licenças */}
            <section>
            <h3 className="font-semibold text-blue-800">Licenças</h3>
            {Array.isArray(equipament.License) && equipament.License.length > 0 ? (
                <ul className="list-disc list-inside ml-4">
                {equipament.License.map((lic) => (
                    <li key={lic.id}>
                    {lic.LicenseType.name} —{" "}
                    {new Date(lic.from).toLocaleDateString()} até{" "}
                    {new Date(lic.to).toLocaleDateString()} ({lic.valid})
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 ml-4">Nenhuma licença vinculada.</p>
            )}
            </section>

            
        </div>
        ) : (
        <p className="text-gray-600">Carregando informações do equipamento...</p>
        )}
    </div>


    {/* Coluna Direita */}
    <div className="relative flex flex-col items-start">
        <button
        onClick={() => setOpen(!open)}
        className="bg-blue-950 text-white w-52 py-3 px-4 rounded-xl hover:bg-blue-800 transition flex items-center justify-between"
        >
        {selectedOption}
        <span className="ml-2">▼</span>
        </button>

        {/* Dropdown */}
        {open && (
        <div className="absolute top-12 left-0 bg-white shadow-md border rounded-xl w-52 z-10">
            <ul className="text-sm text-gray-800 divide-y divide-gray-200">
            <li>
                <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100"
                onClick={() => router.push("/event")}
                >
                Cadastrar Evento
                </button>
            </li>
            <li>
                <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100"
                onClick={() => router.push("/relatorio")}
                >
                Cadastrar Relatório
                </button>
            </li>
            <li>
                <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100"
                onClick={() => router.push("/license")}
                >
                Cadastrar Licença
                </button>
            </li>
            </ul>
        </div>
        )}
    </div>
    </div>
  );
}