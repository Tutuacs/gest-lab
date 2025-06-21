"use client";

import { Button } from "@/components/button";
import EquipamentoRelatorio from "@/components/RelEquipament";
import { useRouter } from "next/navigation";

export default function EquipamentRelatorio() {
  const router = useRouter();

  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full mb-4 space-x-4">
        <div></div> 
        <h1 className="text-4xl font-bold text-black text-center">
          Equipamentos Cadastrados
        </h1>
        <div className="flex justify-end">
          <Button
            onClick={() => router.push("/equipament/create")}
            className="font-bold"
          >
            Novo Equipamento
          </Button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-3xl w-full overflow-hidden">
        <EquipamentoRelatorio />
      </div>
      
    </main>
  )
}