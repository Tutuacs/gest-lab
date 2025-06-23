'use client'

import useFetch from '@/utils/useFetch'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function FormularioCategory() {
  const { fetchWithAuth } = useFetch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    name: searchParams.get('name') || '',
    description: searchParams.get('description') || ''
  })

  const [createdId, setCreatedId] = useState<number | null>(null)

  useEffect(() => {
    const idFromUrl = searchParams.get('equipamentTypeId')
    const nameFromUrl = searchParams.get('name')
    const descriptionFromUrl = searchParams.get('description')
    if (idFromUrl) {
      setCreatedId(Number(idFromUrl))
      if (
        !formData.name &&
        !formData.description &&
        (!nameFromUrl || !descriptionFromUrl)
      ) {
        fetchWithAuth(`/category/${idFromUrl}`).then(result => {
          if (result?.status === 200) {
            setFormData({
              name: result.data.name || '',
              description: result.data.description || ''
            })
          }
        })
      }
    }
    if (nameFromUrl || descriptionFromUrl) {
      setFormData({
        name: nameFromUrl || '',
        description: descriptionFromUrl || ''
      })
    }
  }, [searchParams])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await fetchWithAuth('/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (result?.status === 201) {
      setCreatedId(result.data.id)
    } else {
      console.error('Erro ao cadastrar categoria:', result?.status)
    }
  }

  const redirectTo = (type: 'field' | 'license') => {
    if (!createdId) return
    const base =
      type === 'field' ? '/field-type/create' : '/license-type/create'
    const queryParams = new URLSearchParams({
      equipamentTypeId: createdId.toString(),
      name: formData.name,
      description: formData.description
    }).toString()
    router.push(`${base}?${queryParams}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl space-y-6 bg-white p-8 rounded-2xl shadow"
    >
      <Input
        label="Categoria"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ex: Notebook, Impressora, Switch"
      />

      <TextArea
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descrição opcional do tipo de equipamento..."
      />

      {!createdId && (
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-4 font-bold mt-8 text-white bg-indigo-950 rounded-2xl hover:bg-indigo-900 focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
          >
            Cadastrar Tipo
          </button>
        </div>
      )}

      {createdId && (
        <div className="flex flex-col gap-4 mt-8">
          <button
            type="button"
            onClick={() => redirectTo('field')}
            className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition"
          >
            ➕ Adicionar Campos
          </button>
          <button
            type="button"
            onClick={() => redirectTo('license')}
            className="w-full bg-yellow-600 text-white py-3 rounded-xl hover:bg-yellow-700 transition"
          >
            ➕ Adicionar Certificados
          </button>
          <button
            type="button"
            onClick={() =>
              router.push(
                `/event-type/create?equipamentTypeId=${createdId}&name=${formData.name}&description=${formData.description}`
              )
            }
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            ➕ Adicionar Eventos
          </button>
          <button
            type="button"
            onClick={() => router.push('/home')}
            className="w-full py-4 font-bold mt-8 text-white bg-indigo-950 rounded-2xl hover:bg-indigo-900 focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
          >
            Finalizar Cadastro
          </button>
        </div>
      )}
    </form>
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
}

const Input = ({
  label,
  name,
  value,
  type = 'text',
  placeholder,
  onChange
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
    />
  </div>
)
