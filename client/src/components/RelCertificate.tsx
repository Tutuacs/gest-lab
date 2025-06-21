'use client'

import { Trash2 } from 'lucide-react'

export type License = {
  id: number
  name: string
  description?: string
}

interface LicenseListProps {
  licenses: License[]
  onDelete: (id: number) => void
  equipamentTypeId?: number
}

export default function LicenseList({ licenses, onDelete }: LicenseListProps) {
  if (!licenses.length) {
    return <p className="text-gray-500 p-4">Nenhum certificado cadastrado ainda.</p>
  }

  return (
    <ul className="space-y-3">
      {licenses.map(license => (
        <li
          key={license.id}
          className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md shadow-sm"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{license.name}</span>
            <span className="text-sm text-gray-600">
              {license.description || 'Sem descrição'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onDelete(license.id)}
            className="text-red-600 hover:text-red-800 transition"
            title="Excluir licença"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  )
}
