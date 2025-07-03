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
    Equipament: {
      id: number
      name: string
      Category?: {
        id: number
        name: string
      }
    }
  }

  const [events, setEvents] = useState<Event[]>([])
  const [equipaments, setEquipaments] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [filters, setFilters] = useState({
    equipamentId: '',
    categoryId: '',
    locationId: '',
    startDate: '',
    endDate: '',
    eventType: '',
    orderValue: '',
    search: ''
  })
  const [locations, setLocations] = useState<any[]>([])

  const fetchEvents = async () => {
    try {
      const query = new URLSearchParams()

      if (filters.equipamentId) query.append('equipamentId', filters.equipamentId)
      if (filters.categoryId) query.append('categoryId', filters.categoryId)
        if (filters.locationId) query.append('locationId', filters.locationId)
      if (filters.startDate) query.append('startDate', filters.startDate)
      if (filters.endDate) query.append('endDate', filters.endDate)
      if (filters.eventType) query.append('eventType', filters.eventType)
      if (filters.orderValue) query.append('orderValue', filters.orderValue)
      if (filters.search) query.append('search', filters.search)

      const res = await fetchWithAuth(`/event?${query.toString()}`, { method: 'GET' })
      if (res?.status === 200) setEvents(res.data.filter || [])
    } catch (err) {
      console.error('Erro ao buscar eventos:', err)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const [equipRes, catRes, locRes] = await Promise.all([
        fetchWithAuth('/equipament', { method: 'GET' }),
        fetchWithAuth('/category', { method: 'GET' }),
        fetchWithAuth('/location', { method: 'GET' })
      ])
      if (equipRes?.status === 200) setEquipaments(equipRes.data)
      if (catRes?.status === 200) setCategories(catRes.data)
      if (locRes?.status === 200) setLocations(locRes.data)
    }
    loadData()
    fetchEvents()
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
      <div className="flex flex-nowrap gap-4 p-4 bg-white shadow rounded-xl mb-6 overflow-x-auto">
        <select
          value={filters.locationId}
          onChange={e =>
            setFilters(prev => ({ ...prev, locationId: e.target.value }))
          }
          className="border px-3 py-2 rounded-xl"
        >
          <option value="">Todos Locais</option>
          {locations.map(l => (
            <option key={l.id} value={l.id}>
              {l.block} / Sala {l.room}
            </option>
          ))}
        </select>
        <select
          value={filters.equipamentId}
          onChange={e =>
            setFilters(prev => ({ ...prev, equipamentId: e.target.value }))
          }
          className="border px-3 py-2 rounded-xl"
        >
          <option value="">Todos Equipamentos</option>
          {equipaments.map(eq => (
            <option key={eq.id} value={eq.id}>
              {eq.name}
            </option>
          ))}
        </select>

        <select
          value={filters.categoryId}
          onChange={e =>
            setFilters(prev => ({ ...prev, categoryId: e.target.value }))
          }
          className="border px-3 py-2 rounded-xl"
        >
          <option value="">Todas Categorias</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filters.startDate}
          onChange={e =>
            setFilters(prev => ({ ...prev, startDate: e.target.value }))
          }
          className="border px-3 py-2 rounded-xl"
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={e =>
            setFilters(prev => ({ ...prev, endDate: e.target.value }))
          }
          className="border px-3 py-2 rounded-xl"
        />

        <select
          value={filters.eventType}
          onChange={e =>
            setFilters(prev => ({ ...prev, eventType: e.target.value }))
          }
          className="border px-3 py-2 rounded-xl"
        >
          <option value="">Todos Tipos</option>
          <option value="CALIBRATION">Calibração</option>
          <option value="VERIFICATION">Verificação</option>
          <option value="MAINTENANCE_CORRECTIVE">Manutenção Corretiva</option>
          <option value="MAINTENANCE_PREVENTIVE">Manutenção Preventiva</option>
        </select>

        <select
          value={filters.orderValue}
          onChange={e => setFilters(prev => ({ ...prev, orderValue: e.target.value }))}
          className="border px-3 py-2 rounded-xl"
        >
          <option value="">Ordenar por Valor</option>
          <option value="asc">Menor para Maior</option>
          <option value="desc">Maior para Menor</option>
        </select>

        <input
          type="text"
          placeholder="Buscar descrição"
          value={filters.search}
          onChange={e =>
            setFilters(prev => ({ ...prev, search: e.target.value }))
          }
          className="border px-3 py-2 rounded-xl flex-grow"
        />

        <button
          onClick={fetchEvents}
          className="bg-blue-950 text-white px-4 py-2 rounded-xl hover:bg-blue-900"
        >
          Filtrar
        </button>
        <button
          onClick={() => {
            setFilters({
                          equipamentId: '',
                          categoryId: '',
                          locationId: '',
                          startDate: '',
                          endDate: '',
                          eventType: '',
                          orderValue: '',
                          search: ''
                        })
            setTimeout(fetchEvents, 0)
          }}
          className="text-gray-500 hover:text-red-800 text-xl px-2"
          title="Remover Filtros"
        >
          ×
        </button>
      </div>

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
              <td className="py-3 px-4">{new Date(event.from).toLocaleDateString('pt-BR')}</td>
              <td className="py-3 px-4">{new Date(event.to).toLocaleDateString('pt-BR')}</td>
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
