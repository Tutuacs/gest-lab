'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useFetch from '@/utils/useFetch'

type LicenseType = {
  id: number
  name: string
  description: string
  createdAt: string
}

export default function LicenseTypeList() {
  const searchParams = useSearchParams()
  const equipamentTypeId = searchParams.get('equipamentTypeId')
  const { fetchWithAuth } = useFetch('Listar tipos de licença')
  const [licenses, setLicenses] = useState<LicenseType[]>([])

  const fetchData = async () => {
    if (equipamentTypeId) {
      const result = await fetchWithAuth(`/equipament-type/${equipamentTypeId}`)
      if (result?.status === 200) {
        setLicenses(result.data.LicenseType || [])
      }
    } else {
      const result = await fetchWithAuth('/license-type', { method: 'GET' })
      if (result?.status === 200) {
        setLicenses(result.data)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [equipamentTypeId])

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Tipos de Licença {equipamentTypeId && `do Tipo ${equipamentTypeId}`}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Descrição</th>
              <th className="py-3 px-4">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {licenses.length > 0 ? (
              licenses.map(license => (
                <tr key={license.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{license.id}</td>
                  <td className="py-3 px-4">{license.name}</td>
                  <td className="py-3 px-4">{license.description}</td>
                  <td className="py-3 px-4">
                    {new Date(license.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Nenhuma licença encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
