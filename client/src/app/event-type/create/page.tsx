'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import EventList from '@/components/EventList'
import useFetch from '@/utils/useFetch'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Button } from '@/components/button'
import { toast } from '@/components/ui/use-toast'

export default function CreateEventTypePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { fetchWithAuth } = useFetch()

  const equipamentTypeId = searchParams.get('equipamentTypeId')
  const nameFromUrl = searchParams.get('name') || ''
  const descriptionFromUrl = searchParams.get('description') || ''

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const [eventTypes, setEventTypes] = useState<
    { id: number; name: string; description: string }[]
  >([])

  const fetchEventTypes = async () => {
    if (!equipamentTypeId) return
    const result = await fetchWithAuth(`/equipament-type/${equipamentTypeId}`)
    if (result?.status === 200) {
      setEventTypes(result.data.EventType || [])
    }
  }

  const deleteEventType = async (id: number) => {
    const result = await fetchWithAuth(`/event-type/${id}`, {
      method: 'DELETE'
    })

    if (result?.status === 200) {
      toast({ title: 'Evento excluído com sucesso' })
      fetchEventTypes()
    } else {
      toast({
        title: 'Erro ao excluir evento',
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    fetchEventTypes()
    setFormData({ name: '', description: '' })
  }, [equipamentTypeId, nameFromUrl, descriptionFromUrl])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!equipamentTypeId) return

    const result = await fetchWithAuth('/event-type', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        equipamentTypeId: Number(equipamentTypeId)
      })
    })

    if (result?.status === 201) {
      toast({
        title: 'Evento criado com sucesso',
        description: 'O evento foi vinculado ao tipo de equipamento.'
      })
      setFormData({ name: '', description: '' })
      fetchEventTypes()
    }
  }

  const handleContinue = () => {
    router.push(
      `/equipament-type/create?equipamentTypeId=${equipamentTypeId}&name=${nameFromUrl}&description=${descriptionFromUrl}`
    )
  }

  return (
    <main className="flex justify-center p-10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10">
        {/* Formulário para criar evento */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Criar Novo Evento</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-1/2">
              <Label htmlFor="name">Nome</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <Button type="submit" className="w-full">
                Adicionar
              </Button>
              <Button
                type="button"
                onClick={handleContinue}
                className="w-full bg-green-700 text-white hover:bg-green-800"
              >
                Continuar
              </Button>
            </div>
          </form>
        </div>

        {/* Lista dos eventos vinculados */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Eventos Vinculados</h2>
          <EventList events={eventTypes} onDelete={deleteEventType} />
        </div>
      </div>
    </main>
  )
}
