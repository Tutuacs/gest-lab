'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ROLE } from '@/common/role.enums'

export default function AccessOverlay() {
  const { data: session, status } = useSession()
  const [canClose, setCanClose] = useState(false)
  const [visible, setVisible] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)

  useEffect(() => {
    if (status !== 'authenticated' || !session?.profile?.role) return

    const role = session.profile.role.toUpperCase()

    if (role === ROLE.MASTER) {
      setCanClose(true)
    } else if (role === ROLE.ADMIN) {
      setSecondsLeft(0)
    } else if (role === ROLE.USER) {
      setSecondsLeft(0)
    }
  }, [session, status])

  useEffect(() => {
    if (secondsLeft === null) return
    if (secondsLeft <= 0) {
      setCanClose(true)
      return
    }

    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev !== null ? prev - 1 : null))
    }, 1000)

    return () => clearInterval(timer)
  }, [secondsLeft])

  if (!visible || status === 'loading') return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Acesso Temporariamente Bloqueado</h2>
        <p className="text-gray-700 mb-6">
          Você está logado como: <strong>{session?.profile?.role ?? 'Desconhecido'}</strong>
        </p>
        {!canClose && secondsLeft !== null && (
          <p className="text-sm text-gray-500 mb-4">
            Aguarde {secondsLeft} segundo{secondsLeft > 1 ? 's' : ''} para liberar o botão.
          </p>
        )}
        <button
          onClick={() => setVisible(false)}
          disabled={!canClose}
          className={`px-6 py-2 rounded-xl font-bold transition ${
            canClose
              ? 'bg-rose-600 text-white hover:bg-rose-700'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
