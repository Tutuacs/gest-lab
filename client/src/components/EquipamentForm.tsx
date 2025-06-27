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
    categoryId: '',
    next_maintenance: '',
    maintenance_periodicity: '30',
    certifiedDescription: '',
    certifiedNeedsRenovation: false,
    certifiedRenovateInYears: '1'
  })

  const [locations, setLocations] = useState<
    { id: number; block: string; room: string }[]
  >([])
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  )
  const [brands, setBrands] = useState<string[]>([])
  const [isOtherBrand, setIsOtherBrand] = useState(false)

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
            categoryId: data.categoryId?.toString() || '',
            next_maintenance: data.next_maintenance?.substring(0, 10) || '',
            maintenance_periodicity:
              data.maintenance_periodicity?.toString() || '30',
            certifiedDescription: data.certifiedDescription || '',
            certifiedNeedsRenovation: data.certifiedNeedsRenovation || false,
            certifiedRenovateInYears:
              data.certifiedRenovateInYears?.toString() || '1'
          })
        } else {
          toast({
            title: 'Erro',
            description: 'Erro ao carregar dados.',
            variant: 'destructive'
          })
        }
      }
      fetchEquipament()
    }
  }, [mode, id])

  useEffect(() => {
    const fetchBrands = async () => {
      if (formData.categoryId) {
        const res = await fetchWithAuth(
          `/category/brands/${formData.categoryId}`
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
        const res = await fetchWithAuth('/category/distinct/brands')
        if (res?.status === 200) {
          const allBrands = (res.data.brands as string[]) || []
          const uniqueBrands = [
            ...new Set(allBrands.map(b => b.trim()).filter(b => b))
          ]
          setBrands(uniqueBrands)
        }
      }
    }
    fetchBrands()
  }, [formData.categoryId])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked ?? false
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (name === 'brand') {
      setIsOtherBrand(value === 'Outra')
    }
  }

  interface FormDataPayload {
    name: string
    patrimonio: string
    tag: string
    serie: string
    brand: string
    description: string
    locationId: number
    categoryId: number
    next_maintenance: Date
    maintenance_periodicity: number
    certifiedDescription: string
    certifiedNeedsRenovation: boolean
    certifiedRenovateInYears: number
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload: FormDataPayload = {
      ...formData,
      locationId: parseInt(formData.locationId),
      categoryId: parseInt(formData.categoryId),
      maintenance_periodicity: parseInt(formData.maintenance_periodicity),
      certifiedRenovateInYears: parseInt(formData.certifiedRenovateInYears),
      next_maintenance: new Date(formData.next_maintenance)
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
            ? 'Equipamento cadastrado!'
            : 'Equipamento atualizado!',
        description: 'Redirecionando...'
      })
      router.push('/equipament')
    } else {
      toast({
        title: 'Erro',
        description: result?.data?.message || 'Erro ao salvar os dados.',
        variant: 'destructive'
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-6 p-6"
    >
      <div className="w-full md:w-1/2 bg-white rounded-2xl shadow p-6 space-y-4">
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
          options={categories.map(c => ({
            value: c.id.toString(),
            label: c.name
          }))}
        />
        <Select
          label="Marca"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          disabled={!formData.categoryId}
          options={[
            ...brands.map(b => ({ value: b, label: b })),
            { value: 'Outra', label: 'Outra' }
          ]}
        />
        {isOtherBrand && (
          <Input
            label="Nova Marca"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        )}
        <Select
          label="Local"
          name="locationId"
          value={formData.locationId}
          onChange={handleChange}
          options={locations.map(loc => ({
            value: loc.id.toString(),
            label: loc.block + ' - Sala ' + loc.room
          }))}
        />
        <TextArea
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="w-full md:w-1/2 bg-white rounded-2xl shadow p-6 space-y-4">
        <Input
          type="date"
          label="Próxima Manutenção"
          name="next_maintenance"
          value={formData.next_maintenance}
          onChange={handleChange}
        />
        <Input
          label="Periodicidade (dias)"
          name="maintenance_periodicity"
          value={formData.maintenance_periodicity}
          onChange={handleChange}
        />
        <TextArea
          label="Descrição Certificado"
          name="certifiedDescription"
          value={formData.certifiedDescription}
          onChange={handleChange}
        />
        <Input
          label="Renovação em Anos"
          name="certifiedRenovateInYears"
          value={formData.certifiedRenovateInYears}
          onChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="certifiedNeedsRenovation"
            name="certifiedNeedsRenovation"
            checked={formData.certifiedNeedsRenovation}
            onChange={handleChange}
          />
          <label
            htmlFor="certifiedNeedsRenovation"
            className="text-sm text-gray-700"
          >
            Precisa de renovação
          </label>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-950 rounded-xl hover:bg-indigo-900 transition"
          >
            Cadastrar
          </button>
          <button
            type="button"
            onClick={() => router.push('/equipament')}
            className="w-full py-3 font-bold text-indigo-950 border border-indigo-950 rounded-xl hover:bg-gray-100 transition"
          >
            Voltar para Listagem
          </button>
        </div>
      </div>
    </form>
  )
}

// COMPONENTES BÁSICOS

const Input: React.FC<{
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}> = ({ label, name, value, onChange, type = 'text' }) => (
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

const Select: React.FC<{
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  disabled?: boolean
}> = ({ label, name, value, onChange, options, disabled = false }) => (
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
      className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="" disabled>
        Selecione uma opção
      </option>
      {options.map((opt: { value: string; label: string }) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

const TextArea: React.FC<{
  label: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}> = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm text-gray-700 font-medium">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
)
