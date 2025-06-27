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
  locationId: number
  categoryId: number
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [equipamentRes, locRes, catRes] = await Promise.all([
          fetchWithAuth('/equipament', { method: 'GET' }),
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

    fetchData()
  }, [])

  const getLocationName = (id: number) => {
    const loc = locations.find(l => l.id === id)
    return loc ? `${loc.block} / Sala ${loc.room}` : '-'
  }

  const getCategoryName = (id: number) => {
    const cat = categories.find(c => c.id === id)
    return cat?.name || '-'
  }

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
              <td className="py-3 px-4">{getCategoryName(equip.categoryId)}</td>
              <td className="py-3 px-4">{equip.brand || '-'}</td>
              <td className="py-3 px-4">{equip.status}</td>
              <td className="py-3 px-4">{getLocationName(equip.locationId)}</td>
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
