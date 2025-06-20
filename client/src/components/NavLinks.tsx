'use client'

import { ROLE } from '@/common/role.enums'
import Link from 'next/link'
import ButtonLogout from './ButtonLogout'
import { useSession } from 'next-auth/react'
import { ChevronDown} from "lucide-react"; // ícone opcional


export default function NavLinks() {
  const { data: session, status } = useSession()

  if (session?.profile?.role === ROLE.MASTER) {
    return (
      <main>
        <div className="flex flex-row p-4 space-x-4">
          <Link className="py-2 px-2" href="/home">
            Home
          </Link>
          {/* Dropdown Equipamentos */}
          <div className="relative group">
            <button className="py-2 px-2 flex items-center space-x-1">
              <span>Equipamentos</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-10 min-w-[160px]">
              <Link href="/equipament" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                Relatório
              </Link>
              <Link href="/equipament/create" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                + Criar novo
              </Link>
            </div>
          </div>
          {/* Dropdown Categorias */}
          <div className="relative group">
            <button className="py-2 px-2 flex items-center space-x-1">
              <span>Categorias</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-10 min-w-[160px]">
              <Link href="/equipament-type" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                Relatório
              </Link>
              <Link href="/equipament-type/create" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                + Criar novo
              </Link>
            </div>
          </div>
          {/* Dropdown Locais */}
          <div className="relative group">
            <button className="py-2 px-2 flex items-center space-x-1">
              <span>Locais</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-10 min-w-[160px]">
              <Link href="/location" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                Relatório
              </Link>
              <Link href="/location/create" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                + Criar novo
              </Link>
            </div>
          </div>
          <ButtonLogout />
        </div>
      </main>
    )
  } else if (session?.profile?.role === ROLE.ADMIN) {
    return (
      <main>
        <div className="flex flex-row p-4 space-x-4">
          <Link className="py-2 px-2" href="/home">
            Home
          </Link>
          {/* Dropdown Equipamentos */}
          <div className="relative group">
            <button className="py-2 px-2 flex items-center space-x-1">
              <span>Equipamentos</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-10 min-w-[160px]">
              <Link href="/equipament" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                Relatório
              </Link>
              <Link href="/equipament/create" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                + Criar novo
              </Link>
            </div>
          </div>
          {/* Dropdown Categorias */}
          <div className="relative group">
            <button className="py-2 px-2 flex items-center space-x-1">
              <span>Categorias</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-10 min-w-[160px]">
              <Link href="/equipament-type" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                Relatório
              </Link>
              <Link href="/equipament-type/create" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                + Criar novo
              </Link>
            </div>
          </div>
          {/* Dropdown Locais */}
          <div className="relative group">
            <button className="py-2 px-2 flex items-center space-x-1">
              <span>Locais</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-10 min-w-[160px]">
              <Link href="/location" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                Relatório
              </Link>
              <Link href="/location/create" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                + Criar novo
              </Link>
            </div>
          </div>
          <ButtonLogout />
        </div>
      </main>
    )
  } else if (session?.profile?.role === ROLE.USER) {
    return (
      <main>
        <div className="flex flex-row p-4 space-x-4">
          <Link className="py-2 px-2" href="/home">
            Home
          </Link>
          {/* Dropdown Equipamentos */}
          <div className="relative group">
            <button className="py-2 px-2 flex items-center space-x-1">
              <span>Equipamentos</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-10 min-w-[160px]">
              <Link href="/equipament" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                Relatório
              </Link>
              <Link href="/equipament/create" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                + Criar novo
              </Link>
            </div>
          </div>
          {/* Dropdown Categorias */}
          <div className="relative group">
            <button className="py-2 px-2 flex items-center space-x-1">
              <span>Categorias</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-10 min-w-[160px]">
              <Link href="/equipament-type" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                Relatório
              </Link>
              <Link href="/equipament-type/create" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                + Criar novo
              </Link>
            </div>
          </div>
          {/* Dropdown Locais */}
          <div className="relative group">
            <button className="py-2 px-2 flex items-center space-x-1">
              <span>Locais</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-10 min-w-[160px]">
              <Link href="/location" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                Relatório
              </Link>
              <Link href="/location/create" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                + Criar novo
              </Link>
            </div>
          </div>
          <ButtonLogout />
        </div>
      </main>
    )
  } else {
    return (
      <main>
        <div className="flex flex-row p-4 space-x-4">
          <Link className="py-2 px-4" href="/">
            Home
          </Link>
          <Link className="py-2 px-4 rounded-xl text-gray-800 font-bold bg-slate-300 hover:bg-slate-200 transition all duration-300" href="/login">
            Entrar
          </Link>
          <Link className="py-2 px-4 rounded-xl text-gray-800 font-bold bg-slate-300 hover:bg-slate-200 transition all duration-300" href="/register">
            Cadastrar
          </Link>
        </div>
      </main>
    )
  }
}
