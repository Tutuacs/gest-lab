"use client";

import FieldList from "@/components/FieldList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldTypeActions } from "@/hooks/useFieldTypeActions";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { toast } from "@/components/ui/use-toast";

export default function CreateFieldTypePage() {
  const searchParams = useSearchParams();
  const equipamentTypeId = searchParams.get("equipamentTypeId");
  const { fieldTypes, fetchFieldTypes, createFieldType, deleteFieldType } = useFieldTypeActions();

  const [formData, setFormData] = useState({
    name: "",
    type: "STRING",
    optional: false,
    min: "",
    max: "",
  });

  const [wasSaved, setWasSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (equipamentTypeId && fieldTypes.length === 0) {
      fetchFieldTypes(Number(equipamentTypeId));
    }
  }, [equipamentTypeId, fieldTypes.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!equipamentTypeId) return;
    setLoading(true);

    const result = await createFieldType({
      ...formData,
      equipamentTypeId: Number(equipamentTypeId),
    });

    setLoading(false);

    if (result) {
      toast({
        title: "Campo criado com sucesso",
        description: "O campo foi vinculado ao tipo de equipamento.",
      });
      setFormData({
        name: "",
        type: "STRING",
        optional: false,
        min: "",
        max: "",
      });
      setWasSaved(true);
      fetchFieldTypes(Number(equipamentTypeId));
    }
  };

  return (
    <main className="flex justify-center p-10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10">
        {/* Formulário para criar campo */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Criar Novo Campo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
              >
                <option value="STRING">STRING</option>
                <option value="NUMBER">NUMBER</option>
                <option value="BOOLEAN">BOOLEAN</option>
                <option value="DATE">DATE</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="min">Min</Label>
                <Input name="min" value={formData.min} onChange={handleChange} />
              </div>
              <div className="w-1/2">
                <Label htmlFor="max">Max</Label>
                <Input name="max" value={formData.max} onChange={handleChange} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="optional"
                checked={formData.optional}
                onChange={handleChange}
              />
              <Label htmlFor="optional">Opcional</Label>
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <Button type="submit" disabled={loading} className="w-full">
                Salvar
              </Button>
              <Button
                type="button"
                disabled={!wasSaved}
                onClick={() => setWasSaved(false)}
                className="w-full"
              >
                Mais
              </Button>
            </div>
          </form>
        </div>

        {/* Lista dos campos já criados para o tipo */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Campos Vinculados</h2>
          <FieldList
            fields={fieldTypes}
            onDelete={deleteFieldType}
            equipamentTypeId={Number(equipamentTypeId)}
          />
        </div>
      </div>
    </main>
  );
}
