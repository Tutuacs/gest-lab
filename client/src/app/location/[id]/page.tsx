'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useFetch from '@/utils/useFetch'
import { Button } from '@/components/button'

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
  updatedAt: string
}

export default function LocationDetails() {
  const { fetchWithAuth } = useFetch('Visualização de Local')
  const [location, setLocation] = useState<Location | null>(null)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const fetchLocation = async () => {
      const id = params.id
      if (!id) return

      const res = await fetchWithAuth(`/location/${id}`, { method: 'GET' })
      if (res?.status === 200) setLocation(res.data)
    }

    fetchLocation()
  }, [params.id])

  if (!location) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Carregando dados do local...</p>
      </div>
    )
  }

  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-3xl p-10">
        <h1 className="text-3xl font-bold mb-6 text-indigo-950">
          Detalhes do Local
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          <Detail label="Nome" value={location.name} />
          <Detail label="Responsável" value={location.sponsor} />
          <Detail label="Email" value={location.email} />
          <Detail label="Ramal" value={location.ramal} />
          <Detail label="Bloco" value={location.block} />
          <Detail label="Sala" value={location.room} />
          <Detail
            label="Descrição"
            value={location.description || 'Sem descrição'}
            full
          />
          <Detail
            label="Criado em"
            value={new Date(location.createdAt).toLocaleDateString('pt-BR')}
          />
          <Detail
            label="Atualizado em"
            value={new Date(location.updatedAt).toLocaleDateString('pt-BR')}
          />
        </div>

        <div className="mt-10 flex justify-end">
          <Button onClick={() => router.push('/location')}>Voltar</Button>
        </div>
      </div>
    </main>
  )
}

// COMPONENTE DE DETALHE
type DetailProps = {
  label: string
  value: string
  full?: boolean
}
function Detail({ label, value, full = false }: DetailProps) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
  )
}
