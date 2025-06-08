'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import LicenseList from '@/components/LicenseList'
import useFetch from '@/utils/useFetch'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Button } from '@/components/button'
import { toast } from '@/components/ui/use-toast'

export default function CreateLicenseTypePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { fetchWithAuth } = useFetch()

  const equipamentTypeId = searchParams.get('equipamentTypeId')
  const nameFromUrl = searchParams.get('name') || ''
  const descriptionFromUrl = searchParams.get('description') || ''

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const [licenseTypes, setLicenseTypes] = useState<
    { id: number; name: string; description?: string }[]
  >([])

  const fetchLicenseTypes = async () => {
    if (!equipamentTypeId) return
    const result = await fetchWithAuth(`/equipament-type/${equipamentTypeId}`)
    if (result?.status === 200) {
      setLicenseTypes(result.data.LicenseType || [])
    }
  }

  const deleteLicenseType = async (id: number) => {
    const result = await fetchWithAuth(`/license-type/${id}`, {
      method: 'DELETE'
    })

    if (result?.status === 200) {
      toast({ title: 'Licença excluída com sucesso' })
      fetchLicenseTypes()
    } else {
      toast({
        title: 'Erro ao excluir licença',
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    fetchLicenseTypes()
    setFormData({
      name: '',
      description: ''
    })
  }, [equipamentTypeId, nameFromUrl, descriptionFromUrl])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!equipamentTypeId) return

    const result = await fetchWithAuth('/license-type', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        equipamentTypeId: Number(equipamentTypeId)
      })
    })

    if (result?.status === 201) {
      toast({
        title: 'Licença criada com sucesso',
        description: 'A licença foi vinculada a categoria.'
      })
      setFormData({ name: '', description: '' })
      fetchLicenseTypes()
    }
  }

  const handleContinue = () => {
    router.push(
      `/equipament-type/create?equipamentTypeId=${equipamentTypeId}&name=${nameFromUrl}&description=${descriptionFromUrl}`
    )
  }

  return (
    <main className="flex justify-center p-10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10">
        {/* Formulário para criar licença */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Criar Nova Licença</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-1/2">
              <Label htmlFor="name">Nome</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <Button type="submit" className="w-full">
                Adicionar
              </Button>
              <Button
                type="button"
                onClick={handleContinue}
                className="w-full bg-green-700 text-white hover:bg-green-800"
              >
                Continuar
              </Button>
            </div>
          </form>
        </div>

        {/* Lista das licenças vinculadas */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Licenças Vinculadas</h2>
          <LicenseList
            licenses={licenseTypes}
            onDelete={deleteLicenseType}
            equipamentTypeId={Number(equipamentTypeId)}
          />
        </div>
      </div>
    </main>
  )
}
