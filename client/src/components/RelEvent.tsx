'use client'

import { useEffect, useState } from 'react'
import useFetch from '@/utils/useFetch'
import { useRouter } from 'next/navigation'
import { Search, Edit, Trash } from 'lucide-react'

export default function RelEvent() {
  const { fetchWithAuth } = useFetch('Listagem de Eventos')
  const router = useRouter()
  interface Event {
    id: string
    description: string
    eventType: string
    value: number
    from: string
    to: string
  }

  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchWithAuth('/event', { method: 'GET' })
      if (res?.status === 200) setEvents(res.data.filter || [])
    }
    fetchData()
  }, [])

  const handleDelete = (id: string) => {
    alert('Excluir não permitido neste CRUD (apenas simulação).')
  }

  const formatUTCDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getUTCDate().toString().padStart(2, '0')}/${(
      d.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${d.getUTCFullYear()}`
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow overflow-hidden">
        <thead>
          <tr className="bg-blue-950 text-white">
            <th className="py-3 px-4 text-left">Descrição</th>
            <th className="py-3 px-4 text-left">Tipo</th>
            <th className="py-3 px-4 text-left">Valor</th>
            <th className="py-3 px-4 text-left">Data Início</th>
            <th className="py-3 px-4 text-left">Data Fim</th>
            <th className="py-3 px-4 text-left">Visualizar</th>
            <th className="py-3 px-4 text-left">Editar</th>
            <th className="py-3 px-4 text-left">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-3 px-4">{event.description}</td>
              <td className="py-3 px-4">{event.eventType}</td>
              <td className="py-3 px-4">{event.value}</td>
              <td className="py-3 px-4">{formatUTCDate(event.from)}</td>
              <td className="py-3 px-4">{formatUTCDate(event.to)}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => router.push(`/event/${event.id}`)}
                  className="text-blue-700 hover:text-blue-900 transition"
                  aria-label="Visualizar"
                  title="Visualizar"
                >
                  <Search size={18} />
                </button>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => router.push(`/event/edit/${event.id}`)}
                  className="text-yellow-600 hover:text-yellow-800 transition"
                  aria-label="Editar"
                  title="Editar"
                >
                  <Edit size={18} />
                </button>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-gray-600 hover:text-gray-800 transition"
                  aria-label="Excluir"
                  title="Excluir"
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
          {events.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center py-6 text-gray-500">
                Nenhum evento registrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
