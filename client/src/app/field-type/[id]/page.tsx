"use client";

import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type FieldType = {
  id: number;
  name: string;
  type: string;
  optional: boolean;
  min: string;
  max: string;
};

export default function FieldTypeByEquipamentPage() {
  const { fetchWithAuth } = useFetch("Campos vinculados ao tipo de equipamento");
  const params = useParams();
  const equipamentTypeId = Number(params.id);

  const [fieldTypes, setFieldTypes] = useState<FieldType[]>([]);
  const [equipamentTypeName, setEquipamentTypeName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      const result = await fetchWithAuth(`/equipament-type/${equipamentTypeId}`);
      if (result?.status === 200) {
        setFieldTypes(result.data.FieldType || []);
        setEquipamentTypeName(result.data.name || "");
      }
      setLoading(false);
    };

    if (equipamentTypeId) {
      fetchFields();
    }
  }, [equipamentTypeId]);

  const translateType = (type: string) => {
    switch (type) {
      case "STRING":
        return "Texto";
      case "NUMBER":
        return "Número";
      case "BOOLEAN":
        return "Booleano";
      case "DATE":
        return "Data";
      default:
        return type;
    }
  };

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Campos do Tipo de Equipamento{" "}
        {equipamentTypeName ? `(${equipamentTypeName})` : `#${equipamentTypeId}`}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Carregando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-xl">
            <thead>
              <tr className="bg-blue-950 text-white text-left">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Opcional</th>
                <th className="py-3 px-4">Min</th>
                <th className="py-3 px-4">Max</th>
              </tr>
            </thead>
            <tbody>
              {fieldTypes.length > 0 ? (
                fieldTypes.map((field) => (
                  <tr key={field.id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{field.id}</td>
                    <td className="py-3 px-4">{field.name}</td>
                    <td className="py-3 px-4">{translateType(field.type)}</td>
                    <td className="py-3 px-4">{field.optional ? "Sim" : "Não"}</td>
                    <td className="py-3 px-4">{field.min || "-"}</td>
                    <td className="py-3 px-4">{field.max || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    Nenhum campo encontrado para este tipo de equipamento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
