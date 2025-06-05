'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import useFetch from '@/utils/useFetch'
import { useSession } from 'next-auth/react'

type FieldType = {
  id: number
  name: string
  type: string
  optional: boolean
  min: string
  max: string
  equipamentTypeId: number
}

export default function FieldTypeListPage() {
  const searchParams = useSearchParams()
  const equipamentTypeId = searchParams.get('equipamentTypeId')
  const { fetchWithAuth } = useFetch('Listar campos personalizados')
  const [fieldTypes, setFieldTypes] = useState<FieldType[]>([])
  const { data: session, status } = useSession()

  const fetchData = async () => {
    if (!equipamentTypeId) {
      const result = await fetchWithAuth('/field-type', { method: 'GET' })
      console.log('Resultado da request GET /field-type:', result)

      if (result?.status === 200) {
        setFieldTypes(result.data)
      } else {
        console.error('Erro ao buscar campos personalizados:', result)
      }
      return
    }

    const result = await fetchWithAuth(`/equipament-type/${equipamentTypeId}`, {
      method: 'GET'
    })

    if (result?.status === 200) {
      setFieldTypes(result.data.FieldType || [])
    } else {
      console.error('Erro ao buscar campos personalizados:', result)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData()
    }
  }, [equipamentTypeId, status])

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Campos Personalizados do Tipo {equipamentTypeId}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-blue-950 text-white text-left">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Tipo</th>
              <th className="py-3 px-4">Opcional</th>
              <th className="py-3 px-4">Min</th>
              <th className="py-3 px-4">Max</th>
              <th className="py-3 px-4">Tipo de Equipamento</th>
            </tr>
          </thead>
          <tbody>
            {fieldTypes.length > 0 ? (
              fieldTypes.map(field => (
                <tr
                  key={field.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{field.id}</td>
                  <td className="py-3 px-4">{field.name}</td>
                  <td className="py-3 px-4">{field.type}</td>
                  <td className="py-3 px-4">
                    {field.optional ? 'Sim' : 'Não'}
                  </td>
                  <td className="py-3 px-4">{field.min}</td>
                  <td className="py-3 px-4">{field.max}</td>
                  <td className="py-3 px-4">{field.equipamentTypeId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Nenhum campo personalizado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
