"use client";

import { useState } from "react";
import useFetch from "@/utils/useFetch";
import { useToast } from "@/components/ui/use-toast";

const FIELD_TYPES = ["STRING", "NUMBER", "BOOLEAN", "DATE"];

export default function CreateFieldTypePage() {
  const { fetchWithAuth } = useFetch("Cadastro de FieldType");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    type: "STRING",
    optional: false,
    min: "",
    max: "",
    equipamentTypeId: "", // precisa ser informado
  });

  const [wasSaved, setWasSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await fetchWithAuth("/field-type", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        type: formData.type,
        optional: formData.optional,
        min: formData.min,
        max: formData.max,
        equipamentTypeId: parseInt(formData.equipamentTypeId),
      }),
    });

    if (result?.status === 201) {
      toast({
        title: "Campo salvo com sucesso!",
        description: "Você pode adicionar outro campo clicando em 'Mais'.",
      });
      setWasSaved(true);
    } else {
      toast({
        title: "Erro ao salvar campo",
        description: result?.data?.message ?? "Erro desconhecido.",
        variant: "destructive",
      });
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      type: "STRING",
      optional: false,
      min: "",
      max: "",
      equipamentTypeId: formData.equipamentTypeId,
    });
    setWasSaved(false);
  };

  return (
    <main className="flex justify-center items-center p-10">
      <div className="w-full max-w-xl bg-white shadow rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Criar Campo (FieldType)</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Select
            label="Tipo"
            name="type"
            value={formData.type}
            options={FIELD_TYPES.map((type) => ({ value: type, label: type }))}
            onChange={handleChange}
          />

          <Input
            label="Min"
            name="min"
            value={formData.min}
            onChange={handleChange}
          />

          <Input
            label="Max"
            name="max"
            value={formData.max}
            onChange={handleChange}
          />

          <Input
            label="ID do Tipo de Equipamento"
            name="equipamentTypeId"
            value={formData.equipamentTypeId}
            onChange={handleChange}
          />

          <Checkbox
            label="Opcional"
            name="optional"
            checked={formData.optional}
            onChange={handleChange}
          />

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
            >
              Sv
            </button>

            <button
              type="button"
              disabled={!wasSaved}
              onClick={handleResetForm}
              className={`${
                wasSaved
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white px-4 py-2 rounded transition`}
            >
              Mais
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

// Components

type InputProps = {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, name, value, onChange, type = "text" }: InputProps) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

type SelectProps = {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ label, name, value, options, onChange }: SelectProps) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

type CheckboxProps = {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ label, name, checked, onChange }: CheckboxProps) => (
  <div className="flex items-center space-x-2">
    <input
      id={name}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label htmlFor={name} className="text-sm text-gray-700">{label}</label>
  </div>
);