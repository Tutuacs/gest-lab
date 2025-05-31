import NewEvent from "@/components/NewEvent";

export default function CadastroEvent() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex justify-center p-5">
        <section className="w-full max-w-screen-sm">
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-8 text-center">
              Cadastrar Evento
            </h1>
            <NewEvent />
          </div>
        </section>
      </div>
    </main>
  );
}

