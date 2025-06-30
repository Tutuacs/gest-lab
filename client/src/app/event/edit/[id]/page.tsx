'use client'
import { useParams } from 'next/navigation'
import EventForm from '@/components/EventForm'

export default function EventEditPage() {
  const { id } = useParams()
  return (
    <main className="flex flex-col items-center p-12 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Editar Evento</h1>
      <EventForm mode="edit" id={id?.toString()} />
    </main>
  )
}
