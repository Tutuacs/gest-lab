"use client";
import useFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

type Params = {
    params: Promise<{ id: string }>
};

export default function EquipamentEspecifications({ params }: Params) {
    // Get the equipment ID from params

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
            }
        });

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
    }); // Include dependencies

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {equipamentType ? (
                <div className="text-center mb-8">
                    {equipamentType ? (
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold mb-2">{equipamentType.name}</h1>
                            <p className="text-gray-600">{equipamentType.description}</p>
                            <p className="text-gray-600">{equipamentType.createdAt.toLocaleString()}</p>
                            <div className="mt-4">
                                <h2 className="text-2xl font-semibold">Campos Personalizados</h2>
                                <ul className="list-disc list-inside">
                                    {equipamentType.FieldType.map((field) => (
                                        <li key={field.id}>
                                            {field.name} ({field.type}) - {field.optional ? "Opcional" : "Obrigatório"}
                                        </li>
                                    ))}
                                </ul>
                                <h2 className="text-2xl font-semibold mt-4">Tipos de Licença</h2>
                                <ul className="list-disc list-inside">
                                    {equipamentType.LicenseType.map((license) => (
                                        <li key={license.id}>
                                            {license.name} - {license.description}
                                        </li>
                                    ))}
                                </ul>
                                <h2 className="text-2xl font-semibold mt-4">Tipos de Evento</h2>
                                <ul className="list-disc list-inside">
                                    {equipamentType.EventType.map((event) => (
                                        <li key={event.id}>
                                            {event.name} - {event.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600">Carregando informações do tipo de equipamento...</p>
                    )}
                </div>
            ) : (
                <p className="text-gray-600">Carregando informações do tipo de equipamento...</p>
            )}

            <h1 className="text-2xl font-bold mb-4">Especificações do Equipamento</h1>
            <p className="text-gray-600">Esta página ainda está em desenvolvimento.</p>
            <p className="text-gray-600">Volte mais tarde para ver as especificações detalhadas.</p>
        </div>
    );
};

type EquipamentType = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    FieldType: FieldType[];
    LicenseType: LicenseType[];
    EventType: EventType[];
}

type FieldType = {
    id: string;
    name: string;
    type: string;
    optional: boolean;
    createdAt: Date;
}

type LicenseType = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
}

type EventType = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
}