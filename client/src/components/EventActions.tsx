'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import ListEventModal from '@/components/modal/ListEventModal'
import useFetch from '@/utils/useFetch'

export function EventActions({ equipamentId }: { equipamentId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [events, setEvents] = useState<any[]>([])
  const { fetchWithAuth } = useFetch('Listagem de Eventos')

  const loadEvents = async () => {
    const res = await fetchWithAuth(`/event?equipamentId=${equipamentId}`, {
      method: 'GET'
    })

    if (res?.status === 200) {
      setEvents(res.data)
    } else {
      setEvents([])
    }

    setIsOpen(true)
  }

  return (
    <div className="flex justify-center space-x-3">
      <Button onClick={loadEvents}>Listar Eventos</Button>
      <Button
        onClick={() =>
          window.location.assign(`/event/create?equipamentId=${equipamentId}`)
        }
        className="bg-green-600 hover:bg-green-700"
      >
        Novo Evento +
      </Button>
      <ListEventModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        events={events}
      />
    </div>
  )
}
