import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { ROLE } from '@/common/role.enums'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const role = session?.profile?.role as ROLE | undefined

  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
      <h1 className="text-4xl font-bold text-center text-black mb-10">
        Bem vindo ao GestLab App
      </h1>

      <div className="bg-white shadow rounded-3xl p-12 w-full max-w-3xl grid grid-cols-1 md:grid-cols-[1fr_10px_1fr] gap-6">
        <div className="flex flex-col gap-4">
          <Link href="/equipament">
            <button className="w-full py-10 text-white font-semibold bg-green-600 border-gray-200 rounded-3xl hover:bg-green-800 transition-all duration-300 ease-in-out">
              Equipamentos
            </button>
          </Link>
          <Link href="/event">
            <button className="w-full py-10 text-white font-semibold bg-indigo-900 border border-gray-200 rounded-3xl hover:bg-indigo-950 transition-all duration-300 ease-in-out">
              Eventos
            </button>
          </Link>
        </div>

        <div className="md:border-l border-t md:border-t-0 border-gray-200 h-full md:w-full md:h-auto" />

        <div className="flex flex-col gap-4">
          {(role === 'MASTER' || role === 'ADMIN') && (
            <Link href="/profile">
              <button className="w-full py-5 text-gray-900 font-semibold bg-white border border-gray-300 rounded-2xl hover:bg-gray-100 transition-all duration-300 ease-in-out">
                Perfis
              </button>
            </Link>
          )}

          {role === 'USER' && (
            <Link href="/profile/edit/${session?.profile?.id}">
              <button className="w-full py-5 text-gray-900 font-semibold bg-white border border-gray-300 rounded-2xl hover:bg-gray-100 transition-all duration-300 ease-in-out">
                Meu Perfil
              </button>
            </Link>
          )}

          <Link href="/category">
            <button className="w-full py-5 text-gray-900 font-semibold bg-white border border-gray-300 rounded-2xl hover:bg-gray-100 transition-all duration-300 ease-in-out">
              Categorias
            </button>
          </Link>
          <Link href="/location">
            <button className="w-full py-5 text-gray-900 font-semibold bg-white border border-gray-300 rounded-2xl hover:bg-gray-100 transition-all duration-300 ease-in-out">
              Locais
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
