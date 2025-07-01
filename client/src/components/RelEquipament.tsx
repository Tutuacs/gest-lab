'use client'

import useFetch from '@/utils/useFetch'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Edit, Trash } from 'lucide-react'

type Equipament = {
  id: number
  name: string
  patrimonio: string
  tag: string
  serie: string
  brand: string
  status: string
  Location: {
    id: number
    block: string
    room: string
  }
  Category?: {
    id: number
    name: string
  }
}

type Location = {
  id: number
  block: string
  room: string
}

type Category = {
  id: number
  name: string
}

export default function EquipamentRelatorio() {
  const { fetchWithAuth } = useFetch('Listagem de Equipamentos')
  const router = useRouter()

  const [equipaments, setEquipaments] = useState<Equipament[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filters, setFilters] = useState({
    categoryId: '',
    locationId: '',
    status: '',
    brand: '',
    search: ''
  })

  const fetchEquipaments = async () => {
    try {
      const query = new URLSearchParams()

      if (filters.categoryId) query.append('categoryId', filters.categoryId)
      if (filters.locationId) query.append('locationId', filters.locationId)
      if (filters.status) query.append('status', filters.status)
      if (filters.brand) query.append('brand', filters.brand)
      if (filters.search) query.append('search', filters.search)

      const [equipamentRes, locRes, catRes] = await Promise.all([
        fetchWithAuth(`/equipament?${query.toString()}`, { method: 'GET' }),
        fetchWithAuth('/location', { method: 'GET' }),
        fetchWithAuth('/category', { method: 'GET' })
      ])

      if (equipamentRes?.status === 200) setEquipaments(equipamentRes.data)
      if (locRes?.status === 200) setLocations(locRes.data)
      if (catRes?.status === 200) setCategories(catRes.data)
    } catch (err) {
      console.error('Erro ao buscar dados:', err)
    }
  }

  useEffect(() => {
    fetchEquipaments()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      'Tem certeza que deseja excluir este equipamento?'
    )
    if (!confirmDelete) return

    const result = await fetchWithAuth(`/equipament/${id}`, {
      method: 'DELETE'
    })

    if (result?.status === 200) {
      setEquipaments(prev => prev.filter(eq => eq.id !== id))
    } else {
      alert('Erro ao excluir equipamento.')
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded-xl mb-6">
        <select
          value={filters.categoryId}
          onChange={e => setFilters(prev => ({ ...prev, categoryId: e.target.value }))}
          className="border px-3 py-2 rounded-xl"
        >
          <option value="">Todas Categorias</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          value={filters.locationId}
          onChange={e => setFilters(prev => ({ ...prev, locationId: e.target.value }))}
          className="border px-3 py-2 rounded-xl"
        >
          <option value="">Todos Locais</option>
          {locations.map(l => (
            <option key={l.id} value={l.id}>{l.block} / Sala {l.room}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="border px-3 py-2 rounded-xl"
        >
          <option value="">Todos Status</option>
          <option value="ACTIVE">Ativo</option>
          <option value="INACTIVE">Inativo</option>
          <option value="MAINTENANCE">Manutenção</option>
        </select>

        <input
          type="text"
          placeholder="Marca"
          value={filters.brand}
          onChange={e => setFilters(prev => ({ ...prev, brand: e.target.value }))}
          className="border px-3 py-2 rounded-xl"
        />

        <input
          type="text"
          placeholder="Buscar por Série, Patrimônio ou Tag"
          value={filters.search}
          onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="border px-3 py-2 rounded-xl flex-grow"
        />

        <button
          onClick={fetchEquipaments}
          className="bg-blue-950 text-white px-4 py-2 rounded-xl hover:bg-blue-900"
        >
          Filtrar
        </button>
      </div>

      <table className="min-w-full bg-white shadow overflow-hidden">
        <thead>
          <tr className="bg-blue-950 text-white">
            <th className="py-3 px-4 text-left">Nome</th>
            <th className="py-3 px-4 text-left">Patrimônio</th>
            <th className="py-3 px-4 text-left">Tag</th>
            <th className="py-3 px-4 text-left">Nº de Série</th>
            <th className="py-3 px-4 text-left">Categoria</th>
            <th className="py-3 px-4 text-left">Marca</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Local</th>
            <th className="py-3 px-4 text-left">Visualizar</th>
            <th className="py-3 px-4 text-left">Editar</th>
            <th className="py-3 px-4 text-left">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {equipaments.map(equip => (
            <tr key={equip.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-3 px-4">{equip.name}</td>
              <td className="py-3 px-4">{equip.patrimonio}</td>
              <td className="py-3 px-4">{equip.tag}</td>
              <td className="py-3 px-4">{equip.serie}</td>
              <td className="py-3 px-4">{equip.Category?.name || '-'}</td>
              <td className="py-3 px-4">{equip.brand || '-'}</td>
              <td className="py-3 px-4">{equip.status}</td>
              <td className="py-3 px-4">
                {equip.Location ? `${equip.Location.block} / Sala ${equip.Location.room}` : '-'}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => router.push(`/equipament/${equip.id}`)}
                  className="text-blue-700 hover:text-blue-900 transition"
                  aria-label="Visualizar"
                  title="Visualizar"
                >
                  <Search size={18} />
                </button>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => router.push(`/equipament/edit/${equip.id}`)}
                  className="text-yellow-600 hover:text-yellow-800 transition"
                  aria-label="Editar"
                  title="Editar"
                >
                  <Edit size={18} />
                </button>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleDelete(equip.id)}
                  className="text-red-600 hover:text-red-800 transition"
                  aria-label="Excluir"
                  title="Excluir"
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}

          {equipaments.length === 0 && (
            <tr>
              <td colSpan={12} className="text-center py-6 text-gray-500">
                Nenhum equipamento cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
