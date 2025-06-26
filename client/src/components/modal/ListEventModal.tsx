'use client'

import React from 'react'
import { Dialog } from '@headlessui/react'

interface ListEventModalProps {
  isOpen: boolean
  onClose: () => void
  events: any[]
}

export default function ListEventModal({
  isOpen,
  onClose,
  events
}: ListEventModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-xl w-full p-6 space-y-4">
          <Dialog.Title className="text-xl font-semibold text-blue-900">
            Eventos Registrados
          </Dialog.Title>
          {events.length > 0 ? (
            <ul className="space-y-3 max-h-[300px] overflow-auto">
              {events.map(event => (
                <li key={event.id} className="border p-3 rounded-xl shadow-sm">
                  <p>
                    <strong>Tipo:</strong> {event.eventType}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {event.description}
                  </p>
                  <p>
                    <strong>Período:</strong>{' '}
                    {new Date(event.from).toLocaleDateString()} -{' '}
                    {new Date(event.to).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Valor:</strong> R$ {event.value.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhum evento registrado.</p>
          )}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
            >
              Fechar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
