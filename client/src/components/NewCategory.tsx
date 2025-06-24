'use client'

import useFetch from '@/utils/useFetch'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function FormularioCategory() {
  const { fetchWithAuth } = useFetch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brands: '',
    certifiedType: {
      description: '',
      renovateInDays: 0
    }
  })

  const [createdId, setCreatedId] = useState<number | null>(null)

  useEffect(() => {
    const nameFromUrl = searchParams.get('name')
    const descriptionFromUrl = searchParams.get('description')
    if (nameFromUrl || descriptionFromUrl) {
      setFormData(prev => ({
        ...prev,
        name: nameFromUrl || '',
        description: descriptionFromUrl || ''
      }))
    }
  }, [searchParams])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (name.startsWith('certifiedType.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        certifiedType: {
          ...prev.certifiedType,
          [field]: field === 'renovateInDays' ? Number(value) : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name: formData.name,
      description: formData.description,
      brands: formData.brands,
      certifiedType: {
        description: formData.certifiedType.description,
        renovateInDays: Number(formData.certifiedType.renovateInDays)
      }
    }

    const result = await fetchWithAuth('/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (result?.status === 201) {
      setCreatedId(result.data.id)
      router.push('/category')
    } else {
      console.error('Erro ao cadastrar categoria:', result?.status)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl space-y-6 bg-white p-8 rounded-2xl shadow"
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

      <Input
        label="Marcas"
        name="brands"
        value={formData.brands}
        onChange={handleChange}
        placeholder="Ex: Paralela, MarcaX, MarcaY"
      />

      <TextArea
        label="Descrição do Certificado"
        name="certifiedType.description"
        value={formData.certifiedType.description}
        onChange={handleChange}
        placeholder="Faixa de atuação 10, 20, 30... Renovação a cada 1 ano."
      />

      <Input
        label="Renovação (em anos)"
        name="certifiedType.renovateInDays"
        type="number"
        value={formData.certifiedType.renovateInDays.toString()}
        onChange={handleChange}
        placeholder="Ex: 365"
      />

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full py-4 font-bold mt-8 text-white bg-indigo-950 rounded-2xl hover:bg-indigo-900 focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
        >
          Cadastrar
        </button>
      </div>
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
      required
    />
  </div>
)
