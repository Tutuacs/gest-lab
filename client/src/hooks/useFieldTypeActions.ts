"use client";

import { useState, useEffect } from "react";
import useFetch from "@/utils/useFetch";
import { useToast } from "@/components/ui/use-toast";

export function useFieldTypeActions() {
  const { fetchWithAuth } = useFetch("Gerenciar campos");
  const { toast } = useToast();

  const [fieldTypes, setFieldTypes] = useState<any[]>([]);

  // Busca todos os campos vinculados a um tipo de equipamento
  async function fetchFieldTypes(equipamentTypeId: number) {
    try {
      const result = await fetchWithAuth(`/equipament-type/${equipamentTypeId}`);
      if (result?.status === 200) {
        setFieldTypes(result.data.FieldType || []);
      } else {
        toast({
          title: "Erro ao buscar campos",
          description: result?.data?.message || "Erro inesperado.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar os campos vinculados.",
        variant: "destructive",
      });
    }
  }

  // Cria um novo campo
  async function createFieldType(field: any) {
    try {
      const result = await fetchWithAuth("/field-type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(field),
      });

      if (result?.status === 201) {
        toast({
          title: "Campo criado",
          description: "Novo campo adicionado com sucesso.",
        });
        setFieldTypes((prev) => [...prev, result.data]);
        return true;
      } else {
        toast({
          title: "Erro ao criar campo",
          description: result?.data?.message || "Erro inesperado.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar campo.",
        variant: "destructive",
      });
      return false;
    }
  }

  // Exclui um campo da lista vinculada
  async function deleteFieldType(fieldId: number) {
    try {
      const result = await fetchWithAuth(`/field-type/${fieldId}`, {
        method: "DELETE",
      });

      if (result?.status === 200) {
        setFieldTypes((prev) => prev.filter((f) => f.id !== fieldId));
        toast({ title: "Campo removido" });
      } else {
        toast({
          title: "Erro ao excluir campo",
          description: result?.data?.message || "Erro inesperado.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir campo.",
        variant: "destructive",
      });
    }
  }

  return {
    fieldTypes,
    fetchFieldTypes,
    createFieldType,
    deleteFieldType,
  };
}
