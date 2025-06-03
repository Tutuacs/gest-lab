"use client";

import { useSearchParams } from "next/navigation";

/**
 * Hook que retorna um parâmetro da URL como string (ou null se não existir).
 * Exemplo de uso: const equipamentTypeId = useQueryParam("equipamentTypeId")
 */
export function useQueryParam(key: string): string | null {
  const searchParams = useSearchParams();
  const value = searchParams.get(key);
  return value;
}
