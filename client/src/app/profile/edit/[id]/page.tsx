'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useFetch from '@/utils/useFetch'
import { toast } from '@/components/ui/use-toast'

export default function EditProfilePage() {
  const { id } = useParams()
  const { fetchWithAuth } = useFetch('Editar Perfil')
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    periodicity: '30',
    role: '',
    locationId: ''
  })
  const [locations, setLocations] = useState<any[]>([])
  const [loggedUserRole, setLoggedUserRole] = useState<string>('')

  useEffect(() => {
    const load = async () => {
      // Carrega o perfil a ser editado
      const profileRes = await fetchWithAuth(`/profile/${id}`, {
        method: 'GET'
      })
      if (profileRes?.status === 200) {
        const p = profileRes.data
        setFormData({
          name: p.name || '',
          email: p.email || '',
          periodicity: p.periodicity?.toString() || '30',
          role: p.role,
          locationId: p.locationId?.toString() || ''
        })
      }

      // Carrega locais
      const locRes = await fetchWithAuth('/location', { method: 'GET' })
      if (locRes?.status === 200) setLocations(locRes.data)

      // Carrega perfil logado para saber o role
      const meRes = await fetchWithAuth('/profile', { method: 'GET' })
      if (meRes?.status === 200) setLoggedUserRole(meRes.data.role)
    }
    load()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...formData,
      periodicity: parseInt(formData.periodicity),
      locationId: parseInt(formData.locationId)
    }
    const res = await fetchWithAuth(`/profile/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res?.status === 200) {
      toast({ title: 'Perfil atualizado!', description: 'Redirecionando...' })
      router.push('/home')
    } else {
      toast({
        title: 'Erro',
        description: res?.data?.message || 'Erro ao salvar os dados.',
        variant: 'destructive'
      })
    }
  }

  return (
    <main className="py-12 bg-gray-200 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow w-full max-w-xl space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Editar Perfil</h1>

        <Input
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Período de Pendências (dias)"
          name="periodicity"
          value={formData.periodicity}
          onChange={handleChange}
        />
        <Select
          label="Local"
          name="locationId"
          value={formData.locationId}
          onChange={handleChange}
          disabled={loggedUserRole === 'USER'}
          options={[
            { value: '', label: 'Nenhum' },
            ...locations.map((loc: any) => ({
              value: loc.id.toString(),
              label: `${loc.block} - Sala ${loc.room}`
            }))
          ]}
        />

        <div className="flex flex-col gap-3 pt-4">
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-950 rounded-xl hover:bg-indigo-900 transition"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => {
              if (loggedUserRole === 'USER' || loggedUserRole === 'ADMIN') {
                router.push('/home')
              } else {
                router.push('/profile')
              }
            }}
            className="w-full py-3 font-bold text-indigo-950 border border-indigo-950 rounded-xl hover:bg-gray-100 transition"
          >
            Voltar
          </button>
        </div>
      </form>
    </main>
  )
}

// Components

interface InputProps {
  label: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  type?: string
}

const Input = ({ label, name, value, onChange, type = 'text' }: InputProps) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm text-gray-700 font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
)

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false
}: {
  label: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  options: { value: string; label: string }[]
  disabled?: boolean
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm text-gray-700 font-medium">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
      }`}
      required
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)
