'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useFetch from '@/utils/useFetch'

type EventType = {
  id: number
  name: string
  description: string
  createdAt: string
}

export default function EventTypeList() {
  const searchParams = useSearchParams()
  const equipamentTypeId = searchParams.get('equipamentTypeId')
  const { fetchWithAuth } = useFetch('Listar tipos de evento')
  const [events, setEvents] = useState<EventType[]>([])

  const fetchData = async () => {
    if (equipamentTypeId) {
      const result = await fetchWithAuth(`/equipament-type/${equipamentTypeId}`)
      if (result?.status === 200) {
        setEvents(result.data.EventType || [])
      }
    } else {
      const result = await fetchWithAuth('/event-type', { method: 'GET' })
      if (result?.status === 200) {
        setEvents(result.data)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [equipamentTypeId])

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Tipos de Evento {equipamentTypeId && `do Tipo ${equipamentTypeId}`}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Descrição</th>
              <th className="py-3 px-4">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map(event => (
                <tr key={event.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{event.id}</td>
                  <td className="py-3 px-4">{event.name}</td>
                  <td className="py-3 px-4">{event.description}</td>
                  <td className="py-3 px-4">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Nenhum evento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
