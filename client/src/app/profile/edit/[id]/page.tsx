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
    password: '',
    periodicity: '30',
    role: '',
    locationId: ''
  })
  const [locations, setLocations] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const [profileRes, locRes] = await Promise.all([
        fetchWithAuth(`/profile/${id}`, { method: 'GET' }),
        fetchWithAuth('/location', { method: 'GET' })
      ])
      if (profileRes?.status === 200) {
        const p = profileRes.data
        setFormData({
          name: p.name || '',
          email: p.email || '',
          password: '',
          periodicity: p.periodicity?.toString() || '30',
          role: p.role,
          locationId: p.Location?.id?.toString() || ''
        })
      }
      if (locRes?.status === 200) setLocations(locRes.data)
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
    if (!payload.password) delete payload.password

    const res = await fetchWithAuth(`/profile/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res?.status === 200) {
      toast({ title: 'Perfil atualizado!', description: 'Redirecionando...' })
      router.push('/profile')
    } else {
      toast({
        title: 'Erro',
        description: res?.data?.message || 'Erro ao salvar os dados.',
        variant: 'destructive'
      })
    }
  }

  return (
    <main className="p-12 bg-gray-200 min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow w-full max-w-xl space-y-4"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Editar Perfil</h1>
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
          label="Senha (opcional)"
          type="password"
          name="password"
          value={formData.password}
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
          options={[
            { value: '', label: 'Nenhum' },
            ...locations.map((loc: any) => ({
              value: loc.id.toString(),
              label: `${loc.block} - Sala ${loc.room}`
            }))
          ]}
        />
        <button
          type="submit"
          className="w-full py-3 font-bold text-white bg-indigo-950 rounded-xl hover:bg-indigo-900 transition"
        >
          Salvar
        </button>
      </form>
    </main>
  )
}

// Components

const Input = ({ label, name, value, onChange, type = 'text' }) => (
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

const Select = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm text-gray-700 font-medium">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
