"use client";

import { Trash2 } from "lucide-react";

export type Field = {
  id: number;
  name: string;
  type: string;
  optional: boolean;
};

interface FieldListProps {
  fields: Field[];
  onDelete: (id: number) => void;
  equipamentTypeId?: number;
}

export default function FieldList({ fields, onDelete }: FieldListProps) {
  if (!fields.length) {
    return <p className="text-gray-500">Nenhum campo vinculado ainda.</p>;
  }

  return (
    <ul className="space-y-3">
      {fields.map((field) => (
        <li
          key={field.id}
          className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md shadow-sm"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">
              {field.name} ({field.type})
            </span>
            <span className="text-sm text-gray-600">
              {field.optional ? "Opcional" : "Obrigatório"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onDelete(field.id)}
            className="text-gray-600 hover:text-gray-800 transition"
            title="Excluir campo"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
}
