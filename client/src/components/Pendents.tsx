'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useFetch from '@/utils/useFetch'
import { ROLE } from '@/common/role.enums'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default function AccessOverlay() {
  const { data: session, status } = useSession()
  const { fetchWithAuth } = useFetch('Verificação de Pendências')
  const [canClose, setCanClose] = useState(false)
  const [visible, setVisible] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [pendings, setPendings] = useState<any[]>([])

  // Define temporizador based on role
  useEffect(() => {
    if (status !== 'authenticated' || !session?.profile?.role) return

    const role = session.profile.role.toUpperCase()

    if (role === ROLE.MASTER) {
      setCanClose(true)
    } else if (role === ROLE.ADMIN) {
      setSecondsLeft(5)
    } else if (role === ROLE.USER) {
      setSecondsLeft(10)
    }
  }, [session, status])

  // Countdown logic
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

  // Fetch pendings
  useEffect(() => {
    const checkPendings = async () => {
      const result = await fetchWithAuth('/equipament/consult/pendents', {
        method: 'GET'
      })

      if (result?.status === 412) {
        setMessage(
          'Cadastro incompleto: contate um Master ou Admin do laboratório para definir sua área de atuação.'
        )
        setCanClose(true)
      } else if (result?.status === 200) {
        const data = Array.isArray(result.data) ? result.data : []
        if (data.length === 0) {
          setMessage(
            'Seu laboratório está em dia. Não há lembretes para a periodicidade do seu perfil.'
          )
          setCanClose(true)
        } else {
          setPendings(data)
        }
      }
    }

    if (status === 'authenticated') checkPendings()
  }, [status])

  // helper to decide event type color
  const eventColor = (type: string) =>
    ['VERIFICATION', 'CALIBRATION'].includes(type.toUpperCase())
      ? 'text-green-600 font-semibold'
      : 'text-yellow-600 font-semibold'

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success'
      case 'INACTIVE':
        return 'danger'
      case 'MAINTENANCE':
        return 'maintenance'
      default:
        return 'outline'
    }
  }

  const getCertifiedVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success'
      case 'EXPIRED':
        return 'danger'
      default:
        return 'outline'
    }
  }

  const getEventVariant = (type: string) =>
    ['VERIFICATION', 'CALIBRATION'].includes(type.toUpperCase())
      ? 'success'
      : 'maintenance'

  const formatUTCDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getUTCDate().toString().padStart(2, '0')}/${(
      d.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${d.getUTCFullYear()}`
  }

  const getValidityVariant = (dateStr: string) => {
    if (!session?.profile?.periodicity) return 'outline'
    const dueDate = new Date(dateStr)
    if (dueDate <= new Date(Date.now())) return 'danger'
    if (
      dueDate <=
      new Date(Date.now() + session.profile.periodicity * 24 * 60 * 60 * 1000)
    )
      return 'maintenance'
    return 'outline'
  }

  if (!visible || status === 'loading') return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Aviso de Pendências</h2>
        <p className="text-gray-700 mb-4">
          Você está logado como:{' '}
          <strong>{session?.profile?.role ?? 'Desconhecido'}</strong>
        </p>

        {message && (
          <p className="text-sm text-gray-800 font-medium mb-4">{message}</p>
        )}

        {pendings.length > 0 && (
          <div className="mb-4 text-left">
            <p className="text-gray-800 font-medium mb-2">
              Pendências encontradas:
            </p>
            <ul className="space-y-4 max-h-96 overflow-auto bg-gray-100 rounded-lg p-2">
              {pendings.map(item => {
                const lastEvent =
                  Array.isArray(item.Event) && item.Event.length > 0
                    ? item.Event[0]
                    : null
                return (
                  <li key={item.id} className="p-4 border rounded bg-white">
                    <Link
                      href={`/equipament/${item.id}`}
                      className="block hover:bg-gray-50 transition rounded-lg"
                    >
                      <p>
                        <strong>Equipamento:</strong> {item.name}
                      </p>
                      <p>
                        <strong>Patrimônio:</strong> {item.patrimonio}
                      </p>
                      <p>
                        <strong>Próxima Manutenção:</strong>{' '}
                        <Badge
                          variant={
                            new Date(item.next_maintenance) <=
                            new Date(Date.now())
                              ? 'danger'
                              : new Date(item.next_maintenance) <=
                                new Date(
                                  Date.now() +
                                    (session?.profile?.periodicity || 0) *
                                      24 *
                                      60 *
                                      60 *
                                      1000
                                )
                              ? 'maintenance'
                              : 'outline'
                          }
                        >
                          {formatUTCDate(item.next_maintenance)}
                        </Badge>
                      </p>
                      <p>
                        <strong>Status:</strong>{' '}
                        <Badge variant={getStatusVariant(item.status)}>
                          {item.status}
                        </Badge>
                      </p>
                      {item.Certified && (
                        <div className="mt-2 text-sm">
                          <p>
                            <strong>Certificado:</strong>{' '}
                            {item.Certified.description}
                          </p>
                          <p>
                            <strong>Validade:</strong>{' '}
                            <Badge
                              variant={getValidityVariant(item.Certified.to)}
                            >
                              {formatUTCDate(item.Certified.to)}
                            </Badge>
                          </p>

                          <p>
                            <strong>Situação:</strong>{' '}
                            <Badge
                              variant={getCertifiedVariant(
                                item.Certified.valid
                              )}
                            >
                              {item.Certified.valid}
                            </Badge>
                          </p>
                        </div>
                      )}
                      {lastEvent && (
                        <div className="mt-2 text-sm">
                          <p>
                            <strong>Último Evento:</strong>{' '}
                            <Badge
                              variant={getEventVariant(lastEvent.eventType)}
                            >
                              {lastEvent.eventType}
                            </Badge>
                          </p>
                          {lastEvent.eventType &&
                            lastEvent.eventType !== 'VERIFICATION' && (
                              <p>
                                <strong>Custo:</strong>{' '}
                                {lastEvent.value
                                  ? `R$ ${parseFloat(lastEvent.value).toFixed(
                                      2
                                    )}`.replace('.', ',')
                                  : 'Não informado'}
                              </p>
                            )}
                          <p>
                            <strong>Descrição:</strong>
                            {lastEvent.description}
                          </p>
                          <p>
                            <strong>Inicio:</strong>{' '}
                            {formatUTCDate(lastEvent.from)}
                          </p>
                          <p>
                            <strong>Fim:</strong> {formatUTCDate(lastEvent.to)}
                          </p>
                        </div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {!canClose && secondsLeft !== null && (
          <p className="text-sm text-gray-500 mb-4">
            Aguarde {secondsLeft} segundo{secondsLeft > 1 ? 's' : ''} para
            liberar o botão.
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
