'use client'

import useFetch from '@/utils/useFetch'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditCategoryPage() {
  const { fetchWithAuth } = useFetch()
  const { id } = useParams()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true)
      setError(null)

      const result = await fetchWithAuth(`/category/${id}`)

      if (result?.status === 200) {
        const category = result.data
        setFormData({
          name: category.name || '',
          description: category.description || ''
        })
      } else {
        setError('Erro ao carregar categoria.')
      }

      setLoading(false)
    }

    if (id) {
      loadCategory()
    }
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name: formData.name,
      description: formData.description
    }

    const result = await fetchWithAuth(`/category/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (result?.status === 200) {
      router.push('/category')
    } else {
      alert('Erro ao atualizar categoria. Verifique se o nome já está em uso.')
    }
  }

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Carregando categoria...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </main>
    )
  }

  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
      <h1 className="text-4xl font-bold text-black text-center mb-8">
        Editar Categoria
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow max-w-3xl w-full space-y-6"
      >
        <Input
          label="Nome da Categoria"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Pipetas"
        />

        <TextArea
          label="Descrição da Categoria"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Categoria de equipamentos de laboratório para medição de líquidos."
        />

        <button
          type="submit"
          className="w-full py-4 font-bold mt-8 text-white bg-indigo-950 rounded-2xl hover:bg-indigo-900 focus:outline-none transition duration-300"
        >
          Salvar Alterações
        </button>
      </form>
    </main>
  )
}

// COMPONENTES
type InputProps = {
  label: string
  name: string
  value: string
  type?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  note?: string
}

const Input = ({
  label,
  name,
  value,
  type = 'text',
  placeholder,
  onChange,
  note
}: InputProps) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    {note && <span className="text-sm text-red-600 mt-1">{note}</span>}
  </div>
)

type TextAreaProps = {
  label: string
  name: string
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({
  label,
  name,
  value,
  placeholder,
  onChange
}: TextAreaProps) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      rows={4}
      className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
)
