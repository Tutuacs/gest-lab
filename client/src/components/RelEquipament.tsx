'use client'

import useFetch from '@/utils/useFetch'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Equipament = {
  id: string
  name: string
  patrimonio: string
  tag: string
  serie: string
  modelo: string
  fabricante: string
  status: string
  locationId: number
  equipamentTypeId: number
}

type Location = {
  id: number
  block: string
  room: string
}

type EquipamentType = {
  id: number
  name: string
}

export default function EquipamentRelatorio() {
  const { fetchWithAuth } = useFetch('Listagem de Equipamentos')
  const router = useRouter()

  const [equipaments, setEquipaments] = useState<Equipament[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [equipamentTypes, setEquipamentTypes] = useState<EquipamentType[]>([])

  // Buscar dados de equipamentos, locais e tipos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [equipamentRes, locRes, typeRes] = await Promise.all([
          fetchWithAuth('/equipament', { method: 'GET' }),
          fetchWithAuth('/location', { method: 'GET' }),
          fetchWithAuth('/category', { method: 'GET' })
        ])

        if (equipamentRes?.status === 200) setEquipaments(equipamentRes.data)
        if (locRes?.status === 200) setLocations(locRes.data)
        if (typeRes?.status === 200) setEquipamentTypes(typeRes.data)
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

  const getTypeName = (id: number) => {
    const type = equipamentTypes.find(t => t.id === id)
    return type?.name || '-'
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
            <th className="py-3 px-4 text-left">Modelo</th>
            <th className="py-3 px-4 text-left">Fabricante</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Local</th>
            <th className="py-3 px-4 text-left">Categoria</th>
            <th className="py-3 px-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipaments.map(equip => (
            <tr key={equip.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-3 px-4">{equip.name}</td>
              <td className="py-3 px-4">{equip.patrimonio}</td>
              <td className="py-3 px-4">{equip.tag}</td>
              <td className="py-3 px-4">{equip.serie}</td>
              <td className="py-3 px-4">{equip.modelo}</td>
              <td className="py-3 px-4">{equip.fabricante}</td>
              <td className="py-3 px-4">{equip.status}</td>
              <td className="py-3 px-4">{getLocationName(equip.locationId)}</td>
              <td className="py-3 px-4">
                {getTypeName(equip.equipamentTypeId)}
              </td>
              <td className="py-3 px-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => router.push(`/equipament/${equip.id}`)}
                >
                  Ver detalhes
                </button>
              </td>
            </tr>
          ))}
          {equipaments.length === 0 && (
            <tr>
              <td colSpan={10} className="text-center py-6 text-gray-500">
                Nenhum equipamento cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
