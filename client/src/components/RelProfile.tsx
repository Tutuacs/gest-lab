'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useFetch from '@/utils/useFetch'
import { Search, Edit, Trash, Eye } from 'lucide-react'

export default function RelProfile() {
  const { fetchWithAuth } = useFetch('Listagem de Perfis')
  const router = useRouter()
  const [profiles, setProfiles] = useState<any[]>([])

  useEffect(() => {
    const loadProfiles = async () => {
      const res = await fetchWithAuth('/profile', { method: 'GET' })
      if (res?.status === 200) {
        const data = res.data
        setProfiles(Array.isArray(data) ? data : [data])
      }
    }
    loadProfiles()
  }, [])

  return (
    <main className="p-12 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Perfis Cadastrados
      </h1>
      <div className="overflow-x-auto rounded-3xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Função</th>
              <th className="py-3 px-4 text-left">Local</th>
              <th className="py-3 px-4 text-left">Período Pendências</th>
              <th className="py-3 px-4 text-left">Visualizar</th>
              <th className="py-3 px-4 text-left">Editar</th>
              <th className="py-3 px-4 text-left">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map(profile => (
              <tr key={profile.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{profile.name || '-'}</td>
                <td className="py-3 px-4">{profile.email}</td>
                <td className="py-3 px-4">{profile.role}</td>
                <td className="py-3 px-4">
                  {profile.Location
                    ? `${profile.Location.block} / Sala ${profile.Location.room}`
                    : '-'}
                </td>
                <td className="py-3 px-4">{profile.periodicity} dias</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => router.push(`/profile/${profile.id}`)}
                    className="text-blue-700 hover:text-blue-900 transition"
                    title="Visualizar"
                  >
                    <Eye size={18} />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => router.push(`/profile/edit/${profile.id}`)}
                    className="text-yellow-600 hover:text-yellow-800 transition"
                    title="Editar"
                  >
                    <Edit size={18} />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button
                    disabled
                    className="cursor-not-allowed text-gray-400"
                    title="Excluir não permitido"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {profiles.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  Nenhum perfil encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
