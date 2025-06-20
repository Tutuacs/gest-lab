import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
      <h1 className="text-4xl font-bold text-center text-black mb-10">
        Bem vindo ao GestLab App
      </h1>
      <div className="flex flex-col items-center justify-center space-y-8 bg-gray-300 rounded-3xl
       p-12 w-full max-w-3xl">
        <p className="text-lg">Entre ou cadastre-se para ter acesso ao ambiente</p>

        <div className="flex w-full gap-4">
          <Link href="/login" className="w-1/3">
            <button className="w-full py-10 font-bold text-white bg-indigo-700 rounded-3xl hover:bg-indigo-500 transition-all duration-300 ease-in-out">
              Entrar
            </button>
          </Link>
          <Link href="/register" className="w-2/3">
            <button className="w-full py-10 font-bold text-white bg-indigo-950 rounded-3xl hover:bg-indigo-900 transition-all duration-300 ease-in-out">
              Cadastre-se
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
