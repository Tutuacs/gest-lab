'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import useFetch from '@/utils/useFetch'
import { toast } from '@/components/ui/use-toast'
import { ViewEquipamentDetails } from '@/components/ViewEquipamentDetails'
import { EventActions } from '@/components/EventActions'

export default function ViewEquipamentPage() {
  const { id } = useParams()
  const { fetchWithAuth } = useFetch('Detalhes do Equipamento')
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchDetails = async () => {
      const result = await fetchWithAuth(`/equipament/${id}`, {
        method: 'GET'
      })

      if (result?.status === 200) {
        setData(result.data)
      } else {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados do equipamento',
          variant: 'destructive'
        })
      }
    }

    fetchDetails()
  }, [id])

  if (!data) {
    return (
      <main className="flex-1 w-full flex items-center justify-center p-12 bg-gray-200">
        <p className="text-gray-600 text-lg">Carregando detalhes...</p>
      </main>
    )
  }

  return (
    <main className="flex-1 w-full p-12 bg-gray-200">
      <h1 className="text-3xl font-bold text-center mb-8">
        Visualizar Equipamento
      </h1>

      <div className="flex flex-col gap-6">
        <ViewEquipamentDetails data={data} />
        <EventActions equipamentId={id?.toString() || ''} />
      </div>
    </main>
  )
}