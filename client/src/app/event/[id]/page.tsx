'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useFetch from '@/utils/useFetch'
import { toast } from '@/components/ui/use-toast'

export default function EventDetailPage() {
  const { id } = useParams()
  const { fetchWithAuth } = useFetch('Detalhes do Evento')
  const router = useRouter()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetchWithAuth(`/event/${id}`, { method: 'GET' })
      if (res?.status === 200) {
        setData(res.data)
      } else {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar o evento',
          variant: 'destructive'
        })
      }
    }
    fetchDetails()
  }, [id])

  if (!data)
    return (
      <main className="flex items-center justify-center p-12 bg-gray-200">
        <p>Carregando...</p>
      </main>
    )

  return (
    <main className="flex flex-col items-center p-12 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Detalhes do Evento</h1>
      <div className="bg-white rounded-xl shadow p-6 space-y-4 max-w-3xl w-full">
        <p>
          <strong>Descrição:</strong> {data.description}
        </p>
        <p>
          <strong>Tipo:</strong> {data.eventType}
        </p>
        <p>
          <strong>Valor:</strong> {data.value}
        </p>
        <p>
          <strong>Data Início:</strong>{' '}
          {new Date(data.from).toLocaleDateString()}
        </p>
        <p>
          <strong>Data Fim:</strong> {new Date(data.to).toLocaleDateString()}
        </p>
        <p>
          <strong>Equipamento:</strong> {data.Equipament?.name} (Patrimônio:{' '}
          {data.Equipament?.patrimonio})
        </p>
      </div>
      <button
        onClick={() => router.push('/event')}
        className="mt-6 px-6 py-3 bg-indigo-950 text-white rounded-xl hover:bg-indigo-900"
      >
        Voltar para Listagem
      </button>
    </main>
  )
}
