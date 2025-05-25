"use client";

import { useState } from "react";

export default function CadastroEquipamentType() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tipo de Equipamento cadastrado:", formData);
    // Aqui você faria a chamada para sua API (ex: POST /api/equipament-type)
  };

  return (
    <main>
      <div className="flex flex-col min-h-full mb-10 p-5">
        <section className="w-full">
          <div className="flex flex-col items-center">
            <h1 className="mb-10 text-4xl sm:text-5xl md:text-6xl font-bold text-center text-black">
              Tipo de Equipamento
            </h1>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-2xl grid grid-cols-1 gap-6 bg-white p-8 rounded-2xl shadow"
            >
              <Input
                label="Nome do Tipo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Notebook, Impressora, Switch"
              />

              <TextArea
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrição opcional do tipo de equipamento..."
              />

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-blue-950 text-white py-3 rounded-xl hover:bg-blue-800 transition"
                >
                  Cadastrar Tipo
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

// COMPONENTES

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

type TextAreaProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({ label, name, value, placeholder, onChange }: TextAreaProps) => (
  <div className="flex flex-col">
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
