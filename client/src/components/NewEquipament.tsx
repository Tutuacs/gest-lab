"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/utils/useFetch";

export default function NewEquipamentForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { fetchWithAuth } = useFetch();


  const [formData, setFormData] = useState({
    name: "",
    patrimonio: "",
    tag: "",
    serie: "",
    fabricante: "",      
    modelo: "",      
    description: "",
    locationId: "",
    equipamentTypeId: "",
  });


  const [locations, setLocations] = useState([]);
  const [equipamentTypes, setEquipamentTypes] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locRes, typeRes] = await Promise.all([
          fetchWithAuth("/location", { method: "GET" }),
          fetchWithAuth("/equipament-type", { method: "GET" }),
        ]);
        if (locRes?.status === 200) setLocations(locRes.data);
        if (typeRes?.status === 200) setEquipamentTypes(typeRes.data);
      } catch (err) {
        console.error("Erro ao buscar opções:", err);
      }
    };
    fetchData();
  }, []);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await fetchWithAuth("/equipament", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        patrimonio: formData.patrimonio,
        tag: formData.tag,
        serie: formData.serie,
        fabricante: formData.fabricante,   
        modelo: formData.modelo,     
        description: formData.description,
        locationId: parseInt(formData.locationId),
        equipamentTypeId: parseInt(formData.equipamentTypeId),
      }),
    });
    if (result?.status === 201) {
      toast({
        title: "Equipamento cadastrado com sucesso!",
        description: "Redirecionando...",
      });
      router.push("/equipament");
    } else {
      const msg = result?.data?.message || "Erro ao cadastrar equipamento.";
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
            label="Nº Patrimônio" 
            name="patrimonio" 
            value={formData.patrimonio} 
            onChange={handleChange} 
            />

            <Input 
            label="Tag" 
            name="tag" 
            value={formData.tag} 
            onChange={handleChange} 
            />

            <Input 
            label="Nº de Série" 
            name="serie" 
            value={formData.serie} 
            onChange={handleChange} 
            />

            <Input
            label="Fabricante"
            name="fabricante"
            value={formData.fabricante}
            onChange={handleChange}
            />

            <Input
            label="Modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            />

            <Select
            label="Local"
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            options={locations.map((loc: any) => ({
                value: loc.id.toString(),
                label: `${loc.block} - Sala ${loc.room}`,
            }))}
            />

            <Select
            label="Categoria"
            name="equipamentTypeId"
            value={formData.equipamentTypeId}
            onChange={handleChange}
            options={equipamentTypes.map((type: any) => ({
                value: type.id.toString(),
                label: type.name,
            }))}
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
              className="w-full py-4 font-bold text-white bg-indigo-950 rounded-2xl hover:bg-indigo-900 focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
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