'use client'

import useFetch from '@/utils/useFetch'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Edit, Trash } from 'lucide-react'

type Category = {
  id: number
  name: string
  description?: string
  createdAt: string
  Equipament: { id: number }[]
  brands: string
}

export default function CategoryTable() {
  const { fetchWithAuth } = useFetch('Listagem de Categorias')
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      setError(null)

      const result = await fetchWithAuth('/category', {
        method: 'GET'
      })

      if (result?.status === 200) {
        setCategories(result.data)
      } else {
        setError('Erro ao carregar categorias.')
      }

      setLoading(false)
    }

    fetchCategories()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      'Tem certeza que deseja excluir esta categoria?'
    )
    if (!confirmDelete) return

    const result = await fetchWithAuth(`/category/${id}`, {
      method: 'DELETE'
    })

    if (result?.status === 200) {
      setCategories(prev => prev.filter(cat => cat.id !== id))
    } else {
      alert('Erro ao excluir categoria.')
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow overflow-hidden">
        <thead>
          <tr className="bg-blue-950 text-white">
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Nome</th>
            <th className="py-3 px-4 text-left">Descrição</th>
            <th className="py-3 px-4 text-left">Marcas</th>
            <th className="py-3 px-4 text-left">Criado em</th>
            <th className="py-3 px-4 text-left">Visualizar</th>
            <th className="py-3 px-4 text-left">Editar</th>
            <th className="py-3 px-4 text-left">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                Carregando categorias...
              </td>
            </tr>
          )}

          {!loading && error && (
            <tr>
              <td colSpan={7} className="text-center py-6 text-red-500">
                {error}
              </td>
            </tr>
          )}

          {!loading && !error && categories.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                Nenhuma categoria cadastrada.
              </td>
            </tr>
          )}

          {!loading &&
            !error &&
            [...categories]
              .sort((a, b) => a.id - b.id)
              .map(category => (
                <tr
                  key={category.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{category.id}</td>
                  <td className="py-3 px-4">{category.name}</td>
                  <td className="py-3 px-4">{category.description || '-'}</td>
                  <td className="py-3 px-4">
                    {(category.brands || '-')
                      .split(',')
                      .map(b => b.trim())
                      .filter(b => b)
                      .join(', ')}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => router.push(`/category/${category.id}`)}
                      className="text-blue-700 hover:text-blue-900 transition"
                      aria-label="Visualizar categoria"
                      title="Visualizar"
                    >
                      <Search size={18} />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() =>
                        router.push(`/category/edit/${category.id}`)
                      }
                      className="text-yellow-600 hover:text-yellow-800 transition"
                      aria-label="Editar categoria"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800 transition"
                      aria-label="Excluir categoria"
                      title="Excluir"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
