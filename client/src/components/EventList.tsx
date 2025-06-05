'use client'

import { Trash2 } from 'lucide-react'

export type Event = {
  id: number
  name: string
  description: string
}

interface EventListProps {
  events: Event[]
  onDelete: (id: number) => void
}

export default function EventList({ events, onDelete }: EventListProps) {
  if (!events.length) {
    return <p className="text-gray-500">Nenhum evento cadastrado ainda.</p>
  }

  return (
    <ul className="space-y-3">
      {events.map(event => (
        <li
          key={event.id}
          className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md shadow-sm"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{event.name}</span>
            <span className="text-sm text-gray-600">
              {event.description || 'Sem descrição'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onDelete(event.id)}
            className="text-red-600 hover:text-red-800 transition"
            title="Excluir evento"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  )
}
