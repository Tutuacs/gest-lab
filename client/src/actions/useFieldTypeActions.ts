import { toast } from "@/components/ui/use-toast";
import useFetch from "@/utils/useFetch";

export function useFieldTypeActions() {
  const { fetchWithAuth } = useFetch("FieldType Actions");

  async function fetchFieldTypes(equipamentTypeId: string) {
    const response = await fetchWithAuth(`/field-type?equipamentTypeId=${equipamentTypeId}`);
    if (response?.status === 200) {
      return response.data;
    } else {
      toast({
        title: "Erro ao carregar campos",
        description: response?.data?.message || "Erro desconhecido.",
        variant: "destructive",
      });
      return [];
    }
  }

  async function createFieldType(data: any) {
    const response = await fetchWithAuth("/field-type", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response?.status === 201) {
      toast({
        title: "Campo criado com sucesso",
        description: "O campo foi vinculado ao tipo de equipamento.",
      });
      return response.data;
    } else {
      toast({
        title: "Erro ao criar campo",
        description: response?.data?.message || "Erro desconhecido.",
        variant: "destructive",
      });
      return null;
    }
  }

  async function deleteFieldType(id: number) {
    const response = await fetchWithAuth(`/field-type/${id}`, {
      method: "DELETE",
    });

    if (response?.status === 200) {
      toast({
        title: "Campo removido",
        description: "O campo foi desvinculado com sucesso.",
      });
      return true;
    } else {
      toast({
        title: "Erro ao remover campo",
        description: response?.data?.message || "Erro desconhecido.",
        variant: "destructive",
      });
      return false;
    }
  }

  return {
    fetchFieldTypes,
    createFieldType,
    deleteFieldType,
  };
}
