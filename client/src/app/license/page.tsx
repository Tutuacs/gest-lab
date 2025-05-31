"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/utils/useFetch";
import { useToast } from "@/components/ui/use-toast";

export default function CadastroLicenca() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchWithAuth } = useFetch();
  const { toast } = useToast();

  const [licenseTypes, setLicenseTypes] = useState<{ id: number; name: string }[]>([]);
  const [equipaments, setEquipaments] = useState<{ id: number; name: string }[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    licenseTypeId: "",
    equipamentId: "",
    from: "",
    to: "",
    valid: "INACTIVE",
  });

  useEffect(() => {
    const fetchOptions = async () => {
      const [licenses, equips] = await Promise.all([
        fetchWithAuth("/license-type"),
        fetchWithAuth("/equipament"),
      ]);

      if (licenses?.status === 200) setLicenseTypes(licenses.data);
      if (equips?.status === 200) setEquipaments(equips.data);
    };

    fetchOptions();

    // Pré-selecionar equipamentId via query param
    const equipId = searchParams.get("equipamentId");
    if (equipId) {
      setFormData((prev) => ({ ...prev, equipamentId: equipId }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("licenseTypeId", formData.licenseTypeId);
    form.append("equipamentId", formData.equipamentId);
    form.append("from", formData.from);
    form.append("to", formData.to);
    form.append("valid", formData.valid);
    if (pdfFile) form.append("pdf", pdfFile); // campo PDF opcional

    const result = await fetchWithAuth("/license", {
      method: "POST",
      body: form,
    });

    if (result?.status === 201) {
      toast({ title: "Licença cadastrada com sucesso!", description: "Redirecionando..." });
      router.push("/license");
    } else {
      toast({
        title: "Erro",
        description: result?.data?.message || "Não foi possível cadastrar a licença.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-950 mb-8 text-center">Cadastrar Licença</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Tipo de Licença"
            name="licenseTypeId"
            value={formData.licenseTypeId}
            onChange={handleChange}
            options={licenseTypes.map((lt) => ({
              value: lt.id.toString(),
              label: lt.name,
            }))}
          />

          <Select
            label="Equipamento"
            name="equipamentId"
            value={formData.equipamentId}
            onChange={handleChange}
            options={equipaments.map((e) => ({
              value: e.id.toString(),
              label: e.name,
            }))}
          />

          <Input
            label="Data de Início"
            name="from"
            type="date"
            value={formData.from}
            onChange={handleChange}
          />

          <Input
            label="Data de Validade"
            name="to"
            type="date"
            value={formData.to}
            onChange={handleChange}
          />

          <Select
            label="Status da Licença"
            name="valid"
            value={formData.valid}
            onChange={handleChange}
            options={[
              { value: "ACTIVE", label: "Ativa" },
              { value: "INACTIVE", label: "Inativa" },
            ]}
          />

          {/* Upload de PDF */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label htmlFor="pdf" className="mb-1 text-sm font-medium text-gray-700">Arquivo PDF (opcional)</label>
            <input
              id="pdf"
              name="pdf"
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {pdfFile && (
              <p className="text-sm text-blue-700 mt-2">Arquivo selecionado: {pdfFile.name}</p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-3 rounded-xl hover:bg-blue-800 transition"
            >
              Cadastrar Licença
            </button>
          </div>
        </form>
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