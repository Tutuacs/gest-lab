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
  const EQUIPAMENT_STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    MAINTENANCE: 'MAINTENANCE'
  } as const

  const [formData, setFormData] = useState({
    name: '',
    patrimonio: '',
    tag: '',
    serie: '',
    brand: '',
    description: '',
    locationId: '',
    categoryId: '',
    status: 'EQUIPAMENT_STATUS.INACTIVE',
    next_maintenance: '',
    maintenance_periodicity: '30',
    certifiedDescription: '',
    certifiedNeedsRenovation: false,
    certifiedRenovateInYears: '1',
    alreadyInUse: false,
    lastCalibration: ''
  })

  const [locations, setLocations] = useState<
    { id: number; block: string; room: string }[]
  >([])
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  )
  const [brands, setBrands] = useState<string[]>([])
  const [isOtherBrand, setIsOtherBrand] = useState(false)
  const [otherBrand, setOtherBrand] = useState('')

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
            name: data.name ?? '',
            patrimonio: data.patrimonio ?? '',
            tag: data.tag ?? '',
            serie: data.serie ?? '',
            brand: data.brand ?? '',
            status: data.status || 'INACTIVE',
            description: data.description ?? '',
            locationId: data.locationId?.toString() ?? '',
            categoryId: data.categoryId?.toString() ?? '',
            next_maintenance: data.next_maintenance?.substring(0, 10) || '',
            maintenance_periodicity:
              data.maintenance_periodicity?.toString() || '30',
            certifiedDescription: data.Certified?.description || '',
            certifiedNeedsRenovation: data.Certified?.needsRenovation || false,
            certifiedRenovateInYears:
              data.Certified?.renovateInYears?.toString() || '1',
            alreadyInUse: data.alreadyInUse || false,
            lastCalibration: data.lastCalibration || ''
          })
          setIsOtherBrand(data.brand === 'Outra')
          setOtherBrand(data.brand === 'Outra' ? '' : '')
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
          let parsed: string[] = []
          if (Array.isArray(res.data.Equipament)) {
            parsed = res.data.Equipament.map((e: any) => e.brand).filter(
              (b: string) => !!b && b.trim() !== ''
            )
          }
          setBrands(Array.from(new Set(parsed)))
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

  useEffect(() => {
    setIsOtherBrand(formData.brand === 'Outra')
  }, [formData.brand])

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
    status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE'
    description: string
    locationId: number
    categoryId: number
    next_maintenance: string
    maintenance_periodicity: number
    certifiedDescription: string
    certifiedNeedsRenovation: boolean
    certifiedRenovateInYears: number
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log(formData.next_maintenance)

    const isoMaintenance = formData.next_maintenance
      ? `${formData.next_maintenance}T01:00:00Z`
      : new Date().toISOString()

    console.log(isoMaintenance)
    const isoLastCalibration = formData.lastCalibration
      ? `${formData.lastCalibration}T01:00:00Z`
      : new Date().toISOString()

    const basePayload = {
      name: formData.name,
      patrimonio: formData.patrimonio,
      tag: formData.tag,
      serie: formData.serie,
      brand: isOtherBrand ? otherBrand : formData.brand,
      description: formData.description,
      locationId: parseInt(formData.locationId),
      categoryId: parseInt(formData.categoryId),
      next_maintenance: isoMaintenance,
      maintenance_periodicity: parseInt(formData.maintenance_periodicity),
      certifiedDescription: formData.certifiedDescription,
      certifiedNeedsRenovation: formData.certifiedNeedsRenovation,
      certifiedRenovateInYears: parseFloat(
        formData.certifiedRenovateInYears.replace(',', '.')
      ),
      lastCalibration: isoLastCalibration
    }

    const payload =
      mode === 'edit'
        ? {
            ...basePayload,
            status: formData.status as 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE'
          }
        : basePayload

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
          options={[
            ...categories.map(c => ({
              value: c.id.toString(),
              label: c.name
            }))
          ]}
        />
        <Select
          label="Marca"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          options={[
            { value: 'Outra', label: 'Adicionar Marca' },
            ...brands.map(b => ({ value: b, label: b }))
          ]}
        />
        {isOtherBrand && (
          <Input
            label="Nova Marca"
            name="otherBrand"
            value={otherBrand}
            onChange={e => setOtherBrand(e.target.value)}
          />
        )}
        <Select
          label="Local"
          name="locationId"
          value={formData.locationId}
          onChange={handleChange}
          options={[
            ...locations.map(loc => ({
              value: loc.id.toString(),
              label: loc.block + ' - Sala ' + loc.room
            }))
          ]}
        />
        <TextArea
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {mode === 'edit' && (
          <Select
            label="Status do Equipamento"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={Object.values(EQUIPAMENT_STATUS).map(status => ({
              value: status,
              label: status
            }))}
          />
        )}
      </div>

      <div className="w-full md:w-1/2 bg-white rounded-2xl shadow p-6 space-y-4">
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
            Precisa de certificação
          </label>
        </div>

        {formData.certifiedNeedsRenovation && (
          <>
            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="alreadyInUse"
                name="alreadyInUse"
                checked={formData.alreadyInUse}
                onChange={handleChange}
              />
              <label htmlFor="alreadyInUse" className="text-sm text-gray-700">
                Equipamento já em uso
              </label>
            </div>

            {formData.alreadyInUse && (
              <Input
                type="date"
                label="Última Calibração"
                name="lastCalibration"
                value={formData.lastCalibration}
                onChange={handleChange}
              />
            )}

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
          </>
        )}

        <div className="flex flex-col gap-3 pt-4">
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-950 rounded-xl hover:bg-indigo-900 transition"
          >
            {mode === 'create' ? 'Cadastrar' : 'Salvar'}
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
