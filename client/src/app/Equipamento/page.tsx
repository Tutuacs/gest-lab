import NewEquipamentForm from "@/components/ui/NewEquipament";

export default function CadastroEquipamentType() {
  return (
    <main>
      <div className="flex flex-col min-h-full mb-10 p-5">
        <section className="w-full">
          <div className="flex flex-col items-center">
            <h1 className="mb-10 text-4xl sm:text-5xl md:text-6xl font-bold text-center text-black">
              Equipamento
            </h1>
            <NewEquipamentForm />
          </div>
        </section>
      </div>
    </main>
  );
}