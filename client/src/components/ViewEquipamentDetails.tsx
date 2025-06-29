'use client'

import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

export function ViewEquipamentDetails({ data }: { data: any }) {
  const router = useRouter()
  const { Category, Location, Certified } = data

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4">Categoria</h2>
          <p><strong>Nome:</strong> {Category?.name}</p>
          <p><strong>Descrição:</strong> {Category?.description || '-'}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4">Equipamento</h2>
          <p><strong>Nome:</strong> {data.name}</p>
          <p><strong>Patrimônio:</strong> {data.patrimonio}</p>
          <p><strong>Tag:</strong> {data.tag}</p>
          <p><strong>Série:</strong> {data.serie}</p>
          <p><strong>Marca:</strong> {data.brand}</p>
          <p><strong>Local:</strong> {Location?.block} - Sala {Location?.room}</p>
          <p><strong>Status:</strong> <Badge variant="outline">{data.status}</Badge></p>
          <p><strong>Descrição:</strong> {data.description || '-'}</p>
          <p><strong>Próxima Manutenção:</strong> {new Date(data.next_maintenance).toLocaleDateString()}</p>
          <p><strong>Periodicidade:</strong> {data.maintenance_periodicity} dias</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4">Certificado</h2>
          {Certified ? (
            <>
              <p><strong>Descrição:</strong> {Certified.description || '-'}</p>
              <p><strong>Status:</strong> {Certified.valid}</p>
              <p><strong>Início:</strong> {new Date(Certified.from).toLocaleDateString()}</p>
              <p><strong>Fim:</strong> {new Date(Certified.to).toLocaleDateString()}</p>
              <p><strong>Precisa Renovação:</strong> {Certified.needsRenovation ? 'Sim' : 'Não'}</p>
              <p><strong>Renova em:</strong> {Certified.renovateInYears} anos</p>
              <p><strong>Atualizado em:</strong> {new Date(Certified.updatedAt).toLocaleDateString()}</p>
            </>
          ) : (
            <p className="text-gray-500">Nenhum certificado registrado.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={() => router.push('/equipament')}
          className="px-6 py-3 bg-indigo-950 text-white rounded-xl hover:bg-indigo-900 transition"
        >
          Voltar para Listagem
        </button>
      </div>
    </div>
  )
}