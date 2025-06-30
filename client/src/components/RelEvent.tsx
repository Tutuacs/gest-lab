'use client'

import { useEffect, useState } from 'react'
import useFetch from '@/utils/useFetch'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow">
        <thead>
          <tr className="bg-blue-950 text-white">
            <th className="py-3 px-4 text-left">Descrição</th>
            <th className="py-3 px-4 text-left">Tipo</th>
            <th className="py-3 px-4 text-left">Valor</th>
            <th className="py-3 px-4 text-left">Data Início</th>
            <th className="py-3 px-4 text-left">Data Fim</th>
            <th className="py-3 px-4 text-left">Visualizar</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4">{event.description}</td>
              <td className="py-3 px-4">{event.eventType}</td>
              <td className="py-3 px-4">{event.value}</td>
              <td className="py-3 px-4">
                {new Date(event.from).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                {new Date(event.to).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => router.push(`/event/${event.id}`)}
                  className="text-blue-700 hover:text-blue-900 transition"
                  aria-label="Visualizar"
                >
                  <Search size={18} />
                </button>
              </td>
            </tr>
          ))}
          {events.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                Nenhum evento registrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
