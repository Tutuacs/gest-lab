'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import useFetch from '@/utils/useFetch'

export default function NewLocationForm({
  initialData,
  editMode = false
}: {
  initialData?: any
  editMode?: boolean
}) {
  const router = useRouter()
  const { toast } = useToast()
  const { fetchWithAuth } = useFetch()

  const [formData, setFormData] = useState({
    name: '',
    sponsor: '',
    email: '',
    ramal: '',
    block: '',
    room: '',
    description: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const method = editMode ? 'PATCH' : 'POST'
    const endpoint = editMode ? `/location/${initialData?.id}` : '/location'

    const payload = Object.fromEntries(
      Object.entries(formData).filter(
        ([key]) => !['id', 'createdAt', 'updatedAt', 'message'].includes(key)
      )
    )

    const result = await fetchWithAuth(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (result?.status === 200 || result?.status === 201) {
      toast({
        title: editMode
          ? 'Local atualizado com sucesso!'
          : 'Local cadastrado com sucesso!',
        description: 'Redirecionando...'
      })
      router.push('/location')
    } else {
      toast({
        title: 'Erro',
        description: result?.data?.message || 'Falha ao salvar local.',
        variant: 'destructive'
      })
    }
  }

  return (
    <section className="w-full">
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow"
        >
          <Input
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Responsável"
            name="sponsor"
            value={formData.sponsor}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Ramal"
            name="ramal"
            value={formData.ramal}
            onChange={handleChange}
            placeholder="0000"
          />

          <Input
            label="Bloco"
            name="block"
            value={formData.block}
            onChange={handleChange}
          />

          <Input
            label="Sala"
            name="room"
            value={formData.room}
            onChange={handleChange}
          />

          <TextArea
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição do local..."
          />

          <div className="col-span-1 md:col-span-2 mt-8">
            <button
              type="submit"
              className="w-full py-4 font-bold text-white bg-indigo-950 rounded-2xl hover:bg-indigo-900 focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </section>
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
  <div className="flex flex-col col-span-1 md:col-span-2">
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
