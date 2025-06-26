import { Badge } from '@/components/ui/badge'

export function ViewEquipamentDetails({ data }: { data: any }) {
  const { Category, Location } = data
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-900">
        Informações da Categoria
      </h2>
      <p>
        <strong>Nome:</strong> {Category.name}
      </p>
      <p>
        <strong>Descrição:</strong> {Category.description || '-'}
      </p>
      <p>
        <strong>Tipo Certificado:</strong> {Category.CertifiedType?.description}{' '}
        ({Category.CertifiedType?.renovateInDays} dias)
      </p>

      <hr className="my-2" />

      <h2 className="text-xl font-bold text-blue-900">
        Informações do Equipamento
      </h2>
      <p>
        <strong>Nome:</strong> {data.name}
      </p>
      <p>
        <strong>Patrimônio:</strong> {data.patrimonio}
      </p>
      <p>
        <strong>Tag:</strong> {data.tag}
      </p>
      <p>
        <strong>Série:</strong> {data.serie}
      </p>
      <p>
        <strong>Marca:</strong> {data.brand}
      </p>
      <p>
        <strong>Local:</strong> {Location?.block} - Sala {Location?.room}
      </p>
      <p>
        <strong>Status:</strong> <Badge variant="outline">{data.status}</Badge>
      </p>
      <p>
        <strong>Descrição:</strong> {data.description || '-'}
      </p>
    </div>
  )
}
