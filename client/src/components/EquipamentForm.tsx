'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import useFetch from '@/utils/useFetch'

type EquipamentFormProps = {
  mode: 'create' | 'edit'
  id?: string
}

export default function EquipamentForm({ mode, id }: EquipamentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { fetchWithAuth } = useFetch()

  const [formData, setFormData] = useState({
    name: '',
    patrimonio: '',
    tag: '',
    serie: '',
    brand: '',
    description: '',
    locationId: '',
    categoryId: ''
  })

  const [locations, setLocations] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState<string[]>([])

  // 1. Buscar dados de categorias e locais
  useEffect(() => {
    const fetchBaseData = async () => {
      try {
        const [locRes, catRes] = await Promise.all([
          fetchWithAuth('/location', { method: 'GET' }),
          fetchWithAuth('/category', { method: 'GET' })
        ])
        if (locRes?.status === 200) setLocations(locRes.data)
        if (catRes?.status === 200) setCategories(catRes.data)
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
      }
    }
    fetchBaseData()
  }, [])

  // 2. Buscar os dados do equipamento se for edição
  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchEquipament = async () => {
        const res = await fetchWithAuth(`/equipament/${id}`, { method: 'GET' })
        if (res?.status === 200) {
          const data = res.data
          setFormData({
            name: data.name || '',
            patrimonio: data.patrimonio || '',
            tag: data.tag || '',
            serie: data.serie || '',
            brand: data.brand || '',
            description: data.description || '',
            locationId: data.locationId?.toString() || '',
            categoryId: data.categoryId?.toString() || ''
          })
        } else {
          toast({
            title: 'Erro',
            description: 'Erro ao carregar dados do equipamento.',
            variant: 'destructive'
          })
        }
      }
      fetchEquipament()
    }
  }, [mode, id])

  // 3. Atualizar marcas de acordo com a categoria selecionada
  useEffect(() => {
    const fetchBrands = async () => {
      if (formData.categoryId) {
        const res = await fetchWithAuth(
          `/category/brands/${formData.categoryId}`,
          { method: 'GET' }
        )
        if (res?.status === 200) {
          const brandString = (res.data.brands as string) || ''
          const parsed = brandString
            .split(',')
            .map(b => b.trim())
            .filter(b => b)
          setBrands(parsed)
        }
      } else {
        const res = await fetchWithAuth('/category/distinct/brands', {
          method: 'GET'
        })
        if (res?.status === 200) {
          const allBrands = (res.data.brands as string[]) || []
          const uniqueBrands = [
            ...new Set(allBrands.map((b: string) => b.trim()).filter(b => b))
          ]
          setBrands(uniqueBrands)
        }
      }
    }
    fetchBrands()
  }, [formData.categoryId])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...formData,
      locationId: parseInt(formData.locationId),
      categoryId: parseInt(formData.categoryId)
    }

    const result =
      mode === 'create'
        ? await fetchWithAuth('/equipament', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
        : await fetchWithAuth(`/equipament/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })

    if (result?.status === 200 || result?.status === 201) {
      toast({
        title:
          mode === 'create'
            ? 'Equipamento cadastrado com sucesso!'
            : 'Equipamento atualizado com sucesso!',
        description: 'Redirecionando...'
      })
      router.push('/equipament')
    } else {
      toast({
        title: 'Erro',
        description:
          result?.data?.message || 'Erro ao salvar os dados do equipamento.',
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
            label="Nº Patrimônio"
            name="patrimonio"
            value={formData.patrimonio}
            onChange={handleChange}
          />
          <Input
            label="Tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
          />
          <Input
            label="Nº de Série"
            name="serie"
            value={formData.serie}
            onChange={handleChange}
          />

          <Select
            label="Categoria"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            options={categories.map((cat: any) => ({
              value: cat.id.toString(),
              label: cat.name
            }))}
          />

          <Select
            label="Marca"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            options={brands.map(b => ({ value: b, label: b }))}
          />

          <Select
            label="Local"
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            options={locations.map((loc: any) => ({
              value: loc.id.toString(),
              label: `${loc.block} - Sala ${loc.room}`
            }))}
          />

          <TextArea
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição do equipamento..."
          />

          <div className="col-span-1 md:col-span-2 mt-8">
            <button
              type="submit"
              className="w-full py-4 font-bold text-white bg-indigo-950 rounded-2xl hover:bg-indigo-900 transition-all"
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

type SelectProps = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
}
const Select = ({ label, name, value, onChange, options }: SelectProps) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
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
      <option value="" disabled>
        Selecione uma opção
      </option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
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
