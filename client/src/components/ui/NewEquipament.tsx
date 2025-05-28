"use client"

import useFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewEquipamentForm() {
    const [formData, setFormData] = useState({
        name: "",
        patrimonio: "",
        tag: "",
        serie: "",
        fabricante: "",
        modelo: "",
        description: "",
        status: "INACTIVE",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Equipamento cadastrado:", formData);
        // Aqui você pode fazer uma requisição para sua API
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow"
        >
        <Input
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=""
        />
        <Input
            label="Nº Patrimônio"
            name="patrimonio"
            value={formData.patrimonio}
            onChange={handleChange}
            placeholder="123456"
        />
        <Input
            label="Tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="TAG-001"
        />
        <Input
            label="Nº de Série"
            name="serie"
            value={formData.serie}
            onChange={handleChange}
            placeholder="SN123456789"
        />
        <Input
            label="Fabricante"
            name="fabricante"
            value={formData.fabricante}
            onChange={handleChange}
            placeholder=""
        />
        <Input
            label="Modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            placeholder=""
        />
        <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
            { value: "ACTIVE", label: "Ativo" },
            { value: "INACTIVE", label: "Inativo" },
            { value: "MANUTENCAO", label: "Em Manutenção" },
            ]}
        />
        <TextArea
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição do equipamento..."
        />

        <div className="col-span-1 md:col-span-2 mt-8">
            <button
            type="submit"
            className="w-full bg-blue-950 text-white py-3 rounded-xl hover:bg-blue-800 transition"
            >
            Cadastrar Equipamento
            </button>
        </div>
        </form>
    );
}

//COMPONENTES

type InputProps = {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, name, value, type = "text", placeholder, onChange }: InputProps) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

type SelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
};

const Select = ({ label, name, value, onChange, options }: SelectProps) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

type TextAreaProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({ label, name, value, placeholder, onChange }: TextAreaProps) => (
  <div className="flex flex-col col-span-1 md:col-span-2">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      rows={4}
      className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);