'use client'
import EventForm from '@/components/EventForm'

export default function EventCreatePage() {
  return (
    <main className="flex flex-col items-center p-12 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Cadastrar Evento</h1>
      <EventForm mode="create" />
    </main>
  )
}
