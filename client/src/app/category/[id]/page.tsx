'use client'

import useFetch from '@/utils/useFetch'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ViewCategoryPage() {
  const { id } = useParams()
  const { fetchWithAuth } = useFetch()
  const router = useRouter()

  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true)
      setError(null)

      const result = await fetchWithAuth(`/category/${id}`)

      if (result?.status === 200) {
        setCategory(result.data)
      } else {
        setError('Erro ao carregar categoria.')
      }

      setLoading(false)
    }

    if (id) {
      loadCategory()
    }
  }, [id])

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Carregando categoria...</p>
      </main>
    )
  }

  if (error || !category) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">
          {error || 'Categoria não encontrada.'}
        </p>
      </main>
    )
  }

  const brandsList = category.brands
    ? category.brands
        .split(',')
        .map((b: string) => b.trim())
        .filter((b: string) => b !== '')
    : []

  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow max-w-4xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-center text-indigo-950 mb-6">
          Detalhes da Categoria
        </h1>

        <InfoRow label="Nome da Categoria" value={category.name} />
        <InfoRow label="Descrição da Categoria" value={category.description} />

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Marcas
          </label>
          <div className="flex flex-wrap gap-2">
            {brandsList.length > 0 ? (
              brandsList.map((brand: string, index: number) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {brand}
                </span>
              ))
            ) : (
              <span className="text-gray-500">Nenhuma marca registrada.</span>
            )}
          </div>
        </div>

        <InfoRow
          label="Descrição do Certificado"
          value={category.CertifiedType?.description || 'N/A'}
        />

        <InfoRow
          label="Renovação (em anos)"
          value={
            category.CertifiedType?.renovateInDays
              ? (category.CertifiedType.renovateInDays / 365).toFixed(2)
              : '0'
          }
        />

        <div className="pt-6 text-center">
          <button
            onClick={() => router.push('/category')}
            className="bg-indigo-950 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-900"
          >
            Voltar para Listagem
          </button>
        </div>
      </div>
    </main>
  )
}

type InfoRowProps = {
  label: string
  value: string
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <p className="text-gray-800 text-base border border-gray-300 rounded-xl px-3 py-2 bg-gray-50">
      {value}
    </p>
  </div>
)
