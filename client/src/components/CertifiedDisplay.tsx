export function CertifiedDisplay({ certified }: { certified: any }) {
  if (!certified)
    return <div className="text-gray-500">Nenhum certificado registrado.</div>

  return (
    <div className="space-y-2 border-t pt-4">
      <h3 className="text-lg font-bold text-blue-900">Certificado</h3>
      <p>
        <strong>Status:</strong> {certified.valid}
      </p>
      <p>
        <strong>Início:</strong> {new Date(certified.from).toLocaleDateString()}
      </p>
      <p>
        <strong>Fim:</strong> {new Date(certified.to).toLocaleDateString()}
      </p>
      <p>
        <strong>Atualizado em:</strong>{' '}
        {new Date(certified.updatedAt).toLocaleDateString()}
      </p>
      {certified.PDF?.base64 && (
        <a
          href={`data:application/pdf;base64,${certified.PDF.base64}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline"
        >
          Visualizar PDF
        </a>
      )}
    </div>
  )
}
