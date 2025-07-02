'use client'

import useFetch from '@/utils/useFetch'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Edit, Trash } from 'lucide-react'

type Location = {
  id: number
  name: string
  sponsor: string
  email: string
  ramal: string
  block: string
  room: string
  description?: string
  createdAt: string
}

export default function LocationRelatorio() {
  const { fetchWithAuth } = useFetch('Listagem de Locais')
  const [locations, setLocations] = useState<Location[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithAuth('/location', { method: 'GET' })
        if (res?.status === 200) setLocations(res.data)
      } catch (err) {
        console.error('Erro ao buscar locais:', err)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Tem certeza que deseja excluir este local?')
    if (!confirmed) return

    const res = await fetchWithAuth(`/location/${id}`, { method: 'DELETE' })
    if (res?.status === 200) {
      setLocations(prev => prev.filter(loc => loc.id !== id))
      alert('Local excluído com sucesso.')
    } else {
      alert('Erro ao excluir o local.')
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow overflow-hidden">
        <thead>
          <tr className="bg-blue-950 text-white">
            <th className="py-3 px-4 text-left">Nome</th>
            <th className="py-3 px-4 text-left">Responsável</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Ramal</th>
            <th className="py-3 px-4 text-left">Bloco</th>
            <th className="py-3 px-4 text-left">Sala</th>
            <th className="py-3 px-4 text-left">Descrição</th>
            <th className="py-3 px-4 text-left">Criado em</th>
            <th className="py-3 px-4 text-left">Visualizar</th>
            <th className="py-3 px-4 text-left">Editar</th>
            <th className="py-3 px-4 text-left">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(loc => (
            <tr key={loc.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-3 px-4">{loc.name}</td>
              <td className="py-3 px-4">{loc.sponsor}</td>
              <td className="py-3 px-4">{loc.email}</td>
              <td className="py-3 px-4">{loc.ramal}</td>
              <td className="py-3 px-4">{loc.block}</td>
              <td className="py-3 px-4">{loc.room}</td>
              <td className="py-3 px-4">{loc.description || '-'}</td>
              <td className="py-3 px-4">
                {new Date(loc.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => router.push(`/location/${loc.id}`)}
                  title="Visualizar"
                  className="text-blue-700 hover:text-blue-900 transition"
                >
                  <Search size={18} />
                </button>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => router.push(`/location/edit/${loc.id}`)}
                  title="Editar"
                  className="text-yellow-600 hover:text-yellow-800 transition"
                >
                  <Edit size={18} />
                </button>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleDelete(loc.id)}
                  title="Excluir"
                  className="text-gray-600 hover:text-gray-800 transition"
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
          {locations.length === 0 && (
            <tr>
              <td colSpan={11} className="text-center py-6 text-gray-500">
                Nenhum local cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
