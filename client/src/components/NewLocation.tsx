"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/utils/useFetch";

export default function NewLocationForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { fetchWithAuth } = useFetch();

  const [formData, setFormData] = useState({
    name: "",
    sponsor: "",
    email: "",
    ramal: "",
    block: "",      
    room: "",      
    description: "",
  });

  
  // Atualiza o estado do formulário quando os inputs mudam
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Gravação dos dados no banco após clicar o botão de submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await fetchWithAuth("/equipament", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        patrimonio: formData.sponsor,
        tag: formData.email,
        serie: formData.ramal,
        fabricante: formData.block,   
        modelo: formData.room,     
        description: formData.description,
      }),
    });

    if (result?.status === 201) {
      toast({
        title: "Local cadastrado com sucesso!",
        description: "Redirecionando...",
      });
      router.push("/equipament");
    } else {
      const msg = result?.data?.message || "Erro ao cadastrar local.";
      toast({
        title: "Erro",
        description: msg,
        variant: "destructive",
      });
    }
  };


  return (
    <section className="w-full">
        <div className="flex flex-col items-center">

        <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow"
        >
            <Input 
            label="Nome" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            />

            <Input 
            label="Responsável" 
            name="sponsor" 
            value={formData.sponsor} 
            onChange={handleChange} 
            />

            <Input 
            label="Email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            />

            <Input 
            label="Ramal" 
            name="ramal" 
            value={formData.ramal} 
            onChange={handleChange} 
            />

            <Input 
            label="Bloco" 
            name="block" 
            value={formData.block} 
            onChange={handleChange} 
            />

            <Input 
            label="Sala" 
            name="room" 
            value={formData.room} 
            onChange={handleChange} 
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
                Salvar
            </button>
            </div>
        </form>
        </div>
    </section>
  );
}


// COMPONENTES

// Componentes auxiliares para os inputs, select e textarea
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
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
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

// Componente Select para dropdowns
type SelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
};
const Select = ({ label, name, value, onChange, options }: SelectProps) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
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
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// Componente TextArea para descrições
type TextAreaProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
const TextArea = ({ label, name, value, placeholder, onChange }: TextAreaProps) => (
  <div className="flex flex-col col-span-1 md:col-span-2">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
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