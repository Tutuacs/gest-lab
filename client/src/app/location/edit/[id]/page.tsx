'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useFetch from '@/utils/useFetch'
import NewLocationForm from '@/components/NewLocation'
import { toast } from '@/components/ui/use-toast'

export default function EditLocation() {
  const { fetchWithAuth } = useFetch('Editar Local')
  const router = useRouter()
  const { id } = useParams()

  const [locationData, setLocationData] = useState<any>(null)

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await fetchWithAuth(`/location/${id}`, { method: 'GET' })
      if (res?.status === 200) {
        setLocationData(res.data)
      } else {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados do local',
          variant: 'destructive'
        })
        router.push('/location')
      }
    }

    fetchLocation()
  }, [id])

  if (!locationData) {
    return (
      <main className="flex-1 w-full flex items-center justify-center p-12 bg-gray-200">
        <p className="text-gray-500">Carregando dados...</p>
      </main>
    )
  }

  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
      <h1 className="text-4xl font-bold text-black text-center mb-8">
        Editar Local
      </h1>
      <div className="bg-white shadow rounded-3xl w-full max-w-3xl overflow-hidden">
        <NewLocationForm initialData={locationData} editMode />
      </div>
    </main>
  )
}
