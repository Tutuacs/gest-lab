"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/utils/useFetch";
import { useToast } from "@/components/ui/use-toast";

export default function CadastroEvento() {
  const router = useRouter();
  const { fetchWithAuth } = useFetch();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    eventTypeId: "",
    description: "",
    from: "",
    to: "",
    value: "",
    tipoCalibracao: "",
    periodicidadeCalibracao: "",
    proximaCalibracao: "",
    programada: "",
    periodicidadeManutencao: "",
    observacao: "",
    problema: "",
    custoDefinido: false,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;

    if (name === "custoDefinido") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      const updated = { ...formData, [name]: value };

      if (name === "from" && formData.eventTypeId === "3" && formData.periodicidadeCalibracao) {
        updated.proximaCalibracao = calcularProximaCalibracao(value, formData.periodicidadeCalibracao);
      }

      if (name === "periodicidadeCalibracao" && formData.eventTypeId === "3" && formData.from) {
        updated.proximaCalibracao = calcularProximaCalibracao(formData.from, value);
      }

      setFormData(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      eventTypeId: parseInt(formData.eventTypeId),
      description: formData.description,
      from: formData.from,
      to: formData.to,
      value: formData.custoDefinido ? parseFloat(formData.value) : 0,
      extraData: {
        tipoCalibracao: formData.tipoCalibracao,
        periodicidadeCalibracao: formData.periodicidadeCalibracao,
        proximaCalibracao: formData.proximaCalibracao,
        programada: formData.programada,
        periodicidadeManutencao: formData.periodicidadeManutencao,
        observacao: formData.observacao,
        problema: formData.problema,
      },
    };

    const result = await fetchWithAuth("/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (result?.status === 201) {
      toast({ title: "Evento cadastrado com sucesso!", description: "Redirecionando..." });
      router.push("/event");
    } else {
      toast({
        title: "Erro",
        description: result?.data?.message || "Não foi possível cadastrar o evento.",
        variant: "destructive",
      });
    }
  };

  const tipoEvento = formData.eventTypeId;

  return (
    <div className="mx-auto bg-white rounded-xl shadow-md p-8 max-w-4xl">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

        {tipoEvento === "3" && (
          <>
            <TextArea
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <Select
              label="Tipo de Calibração"
              name="tipoCalibracao"
              value={formData.tipoCalibracao}
              onChange={handleChange}
              options={[
                { value: "analógico", label: "Analógico" },
                { value: "digital", label: "Digital" },
              ]}
            />
            <Input
              label="Data Calibração"
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
            />
            <Input
              label="Periodicidade (anos)"
              name="periodicidadeCalibracao"
              type="number"
              value={formData.periodicidadeCalibracao}
              onChange={handleChange}
            />
          </>
        )}

        {tipoEvento === "2" && (
          <>
            <TextArea
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <Input
              label="Data Programada"
              name="programada"
              type="date"
              value={formData.programada}
              onChange={handleChange}
            />
            <Input
              label="Periodicidade (meses)"
              name="periodicidadeManutencao"
              type="number"
              value={formData.periodicidadeManutencao}
              onChange={handleChange}
            />
            <TextArea
              label="Observação"
              name="observacao"
              value={formData.observacao}
              onChange={handleChange}
            />
          </>
        )}

        {tipoEvento === "1" && (
          <>
            <TextArea
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <Input
              label="Data do Problema"
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
            />
          </>
        )}

        <div className="col-span-1 md:col-span-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="custoDefinido"
              checked={formData.custoDefinido}
              onChange={handleChange}
            />
            <span className="text-sm font-medium text-gray-700">Custo Definido</span>
          </label>
        </div>

        {formData.custoDefinido && (
          <Input
            label="Valor (R$)"
            name="value"
            type="number"
            value={formData.value}
            onChange={handleChange}
            placeholder="0.00"
          />
        )}

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

// ===================== COMPONENTES =====================

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
