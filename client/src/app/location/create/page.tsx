import NewLocationForm from "@/components/NewLocation";

export default function NewLocation() {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
      <h1 className="text-4xl font-bold text-black text-center mb-8">
        Cadastrar Local
      </h1>
      <div className="bg-white shadow rounded-3xl w-full max-w-3xl overflow-hidden">
        <NewLocationForm />
      </div>
          
    </main>
  );
}


