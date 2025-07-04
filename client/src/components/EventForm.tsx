'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import useFetch from '@/utils/useFetch'
import { useSession } from 'next-auth/react'

type EventFormProps = {
  mode: 'create' | 'edit'
  id?: string
}

export default function EventForm({ mode, id }: EventFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [setup, setSetup] = useState(false)
  const { toast } = useToast()
  const { fetchWithAuth } = useFetch()
  const { status } = useSession()

  const [formData, setFormData] = useState({
    description: '',
    from: '',
    to: '',
    eventType: '',
    value: '0',
    equipamentId: ''
  })

  const [equipNeedsRenovation, setEquipNeedsRenovation] = useState(true)
  const isValueDisabled =
    !equipNeedsRenovation || formData.eventType === 'VERIFICATION'

  useEffect(() => {
    if (status === 'authenticated') {
      if (mode === 'create') {
        if (!setup) {
          const equipId = searchParams.get('equipamentId') || ''
          setFormData(prev => ({ ...prev, equipamentId: equipId }))

          if (equipId) {
            const fetchEquipament = async () => {
              const res = await fetchWithAuth(`/equipament/${equipId}`, {
                method: 'GET'
              })

              if (res?.status === 200) {
                console.log('Equipamento:', res.data)
                setEquipNeedsRenovation(
                  res.data?.Certified?.needsRenovation ?? false
                )
              }
            }
            fetchEquipament()
            setSetup(true)
          }
        }
      } else {
        if (!setup) {
          const fetchEvent = async () => {
            const res = await fetchWithAuth(`/event/${id}`, { method: 'GET' })
            if (res?.status === 200) {
              const data = res.data
              setFormData({
                description: data.description ?? '',
                from: data.from?.substring(0, 10) || '',
                to: data.to?.substring(0, 10) || '',
                eventType: data.eventType || '',
                value: data.value?.toString() || '0',
                equipamentId: data.Equipament?.id?.toString() || ''
              })
            } else {
              toast({
                title: 'Erro',
                description: 'Erro ao carregar dados.',
                variant: 'destructive'
              })
            }
          }
          fetchEvent()
          setSetup(true)
        }
      }
    }
  }, [status])

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

    const startDate = new Date(formData.from)
    const endDate = new Date(formData.to)

    if (startDate > endDate) {
      toast({
        title: 'Erro',
        description: 'A Data Início não pode ser maior que a Data Fim.',
        variant: 'destructive'
      })
      return
    }

    const payload = {
      ...formData,
      from: `${formData.from}T00:00:00Z`,
      to: `${formData.to}T00:00:00Z`,
      value: parseFloat(formData.value.replace(',', '.')),
      equipamentId: parseInt(formData.equipamentId)
    }

    if (!equipNeedsRenovation) {
      payload.eventType = 'VERIFICATION'
    }

    console.log('Payload:', payload)

    const result =
      mode === 'create'
        ? await fetchWithAuth('/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
        : await fetchWithAuth(`/event/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })

    if (result?.status === 200 || result?.status === 201) {
      toast({
        title: mode === 'create' ? 'Evento cadastrado!' : 'Evento atualizado!',
        description: 'Redirecionando...'
      })
      router.push('/event')
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
      className="bg-white p-6 rounded-xl shadow space-y-4 w-full max-w-2xl mx-auto"
    >
      <Select
        label="Tipo de Evento"
        name="eventType"
        value={formData.eventType}
        onChange={handleChange}
        options={
          equipNeedsRenovation
            ? [
                { value: '', label: 'Selecione' },
                { value: 'CALIBRATION', label: 'Calibração' },
                { value: 'VERIFICATION', label: 'Verificação Periódica' },
                {
                  value: 'MAINTENANCE_CORRECTIVE',
                  label: 'Manutenção Corretiva'
                },
                {
                  value: 'MAINTENANCE_PREVENTIVE',
                  label: 'Manutenção Preventiva'
                }
              ]
            : [{ value: 'VERIFICATION', label: 'Verificação Periódica' }]
        }
        disabled={mode === 'edit'}
      />
      {formData.eventType.toUpperCase().includes('MAINTENANCE') && (
        <p className="text-yellow-600 text-sm font-bold italic">
          * Ao criar um evento deste tipo o equipamento será INATIVADO e o
          certificado EXPIRADO, impossibilitando o uso do equipamento!
        </p>
      )}
      {formData.eventType === 'CALIBRATION' && (
        <p className="text-red-600 text-sm font-bold italic">
          * Ao criar um evento deste tipo o equipamento será ATIVADO e o
          certificado RENOVADO, garanta a CONFORMIDADE do equipamento antes da
          criação deste evento!
        </p>
      )}
      <TextArea
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <Input
        type="date"
        label="Data Início"
        name="from"
        value={formData.from}
        onChange={handleChange}
      />
      <Input
        type="date"
        label="Data Fim"
        name="to"
        value={formData.to}
        onChange={handleChange}
      />
      <Input
        label="Valor (R$)"
        name="value"
        value={formData.value}
        onChange={handleChange}
        disabled={isValueDisabled}
      />

      <button
        type="submit"
        className="w-full py-3 font-bold text-white bg-indigo-950 rounded-xl hover:bg-indigo-900 transition"
      >
        {mode === 'create' ? 'Cadastrar' : 'Salvar'}
      </button>
      <button
        type="button"
        onClick={() => router.push(`/equipament/${formData.equipamentId}`)}
        className="w-full py-3 font-bold text-indigo-950 border border-indigo-950 rounded-xl hover:bg-gray-100 transition"
      >
        Voltar
      </button>
    </form>
  )
}

interface InputProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  disabled?: boolean
}

const Input = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  disabled = false
}: InputProps) => (
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
      disabled={disabled}
      className={`border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
      }`}
      required
    />
  </div>
)

interface SelectProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  disabled?: boolean
}

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false
}: SelectProps) => (
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

interface TextAreaProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({ label, name, value, onChange }: TextAreaProps) => (
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
