'use client'
import RelEvent from '@/components/RelEvent'

export default function EventPage() {
  return (
    <main className="flex flex-col items-center p-12 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Eventos Cadastrados</h1>
      <div className="w-full max-w-7xl">
        <RelEvent />
      </div>
    </main>
  )
}
