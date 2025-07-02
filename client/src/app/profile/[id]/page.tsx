'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useFetch from '@/utils/useFetch'

export default function ViewProfilePage() {
  const { id } = useParams()
  const { fetchWithAuth } = useFetch('Visualizar Perfil')
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetchWithAuth(`/profile/${id}`, { method: 'GET' })
      if (res?.status === 200) setProfile(res.data)
    }
    load()
  }, [id])

  if (!profile) {
    return <p className="p-12">Carregando perfil...</p>
  }

  return (
    <main className="p-12 bg-gray-200 min-h-screen flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-xl space-y-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Detalhes do Perfil
        </h1>
        <p>
          <strong>Nome:</strong> {profile.name || '-'}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Função:</strong> {profile.role}
        </p>
        <p>
          <strong>Período de Pendências:</strong> {profile.periodicity} dias
        </p>
        <p>
          <strong>Local:</strong>{' '}
          {profile.Location
            ? `${profile.Location.block} / Sala ${profile.Location.room}`
            : '-'}
        </p>

        <div className="flex justify-end pt-6">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-indigo-950 text-white rounded-xl hover:bg-indigo-900 transition"
          >
            Voltar
          </button>
        </div>
      </div>
    </main>
  )
}
