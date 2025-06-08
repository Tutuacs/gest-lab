import EquipamentoRelatorio from "@/components/RelatorioEquipament";

export default function EquipamentRelatorio() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex justify-center p-5">
        <section className="w-full max-w-screen-xl">
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-8 text-center">
              Equipamentos Cadastrados
            </h1>
            <EquipamentoRelatorio />
          </div>
        </section>
      </div>
    </main>
  );
}