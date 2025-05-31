"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/utils/useFetch";
import { useToast } from "@/components/ui/use-toast";

export default function CadastroEvento() {
  const router = useRouter(); // Usado para redirecionar o usuário após o cadastro
  const { fetchWithAuth } = useFetch(); // Usado para se comunicar com o backend
  const { toast } = useToast();   // Componenete UI para exibir mensagem pop-up

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    eventTypeId: "",
    description: "",
    from: "",
    to: "",
    value: "",
  });

  // Função assíncrona ao submeter o formulário (botão "Cadastrar Evento")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se todos os campos obrigatórios estão preenchidos
    const result = await fetchWithAuth("/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: formData.description,
        eventTypeId: parseInt(formData.eventTypeId),
        from: formData.from,
        to: formData.to,
        value: parseFloat(formData.value),
      }),
    });

    // Verifica se sucesso (201) e redireciona
    if (result?.status === 201) {
      toast({
        title: "Evento cadastrado com sucesso!",
        description: "Redirecionando...",
      });
      router.push("/event");
    } else {
      toast({
        title: "Erro",
        description: result?.data?.message || "Não foi possível cadastrar o evento.",
        variant: "destructive",
      });
    }
  };

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  return (
    <div className="mx-auto bg-white rounded-xl shadow-md p-8">

    <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >

        <Select
        label="Tipo de Evento"
        name="eventTypeId"
        value={formData.eventTypeId}
        onChange={handleChange}
        options={[
            { value: "1", label: "Manutenção Corretiva" },
            { value: "2", label: "Manutenção Preventiva" },
            { value: "3", label: "Calibração" },
        ]}
        />

        <TextArea
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Informe uma descrição detalhada"
        />

        <Input
        label="Data de Início"
        name="from"
        type="date"
        value={formData.from}
        onChange={handleChange}
        />

        <Input
        label="Data de Término"
        name="to"
        type="date"
        value={formData.to}
        onChange={handleChange}
        />

        <Input
        label="Valor"
        name="value"
        type="number"
        value={formData.value}
        onChange={handleChange}
        placeholder="R$ "
        />

        <div className="col-span-1 md:col-span-2 mt-4">
        <button
            type="submit"
            className="w-full bg-blue-950 text-white py-3 rounded-xl hover:bg-blue-800 transition"
        >
            Cadastrar Evento
        </button>
        </div>
    </form>
    </div>
  );
}


// Componentes para inputs de texto, número ou data
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

// Componente para select (dropdown) de opções
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
      <option value="" disabled>Selecione uma opção</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// Componente para textarea (campo de texto grande)
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
      required
    />
  </div>
);
