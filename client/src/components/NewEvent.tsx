// 'use client'

// import { useState } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import useFetch from '@/utils/useFetch'
// import { useToast } from '@/components/ui/use-toast'

// export default function CadastroEvento() {
//   const router = useRouter()
//   const params = useSearchParams()
//   const { fetchWithAuth } = useFetch()
//   const { toast } = useToast()

//   const isEdit = params.has('edit')
//   const equipamentId = params.get('equipamentId')

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     from: '',
//     to: '',
//     eventType: '',
//     value: '',
//     file: null as File | null
//   })

//   const handleChange = (e: React.ChangeEvent<any>) => {
//     const { name, value, type, files } = e.target

//     if (type === 'file') {
//       setFormData(prev => ({ ...prev, file: files[0] }))
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!equipamentId) {
//       toast({
//         title: 'Erro',
//         description: 'ID do equipamento não encontrado na URL.',
//         variant: 'destructive'
//       })
//       return
//     }

//     const form = new FormData()
//     form.append('name', formData.name)
//     form.append('description', formData.description)
//     form.append('from', formData.from)
//     form.append('to', formData.to)
//     form.append('eventType', formData.eventType)
//     form.append('value', formData.value || '0')
//     form.append('equipamentId', equipamentId)
//     if (formData.file) form.append('file', formData.file)

//     const result = await fetchWithAuth('/event', {
//       method: 'POST',
//       body: form
//     })

//     if (result?.status === 201) {
//       toast({
//         title: 'Evento cadastrado com sucesso!',
//         description: 'Redirecionando...'
//       })
//       router.push('/event')
//     } else {
//       toast({
//         title: 'Erro',
//         description:
//           result?.data?.message || 'Não foi possível cadastrar o evento.',
//         variant: 'destructive'
//       })
//     }
//   }

//   return (
//     <div className="mx-auto bg-white rounded-xl shadow-md p-8 max-w-4xl">
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//         encType="multipart/form-data"
//       >
//         <Input
//           label="Nome"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <TextArea
//           label="Descrição"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         />

//         <Input
//           label="Data de Início"
//           type="date"
//           name="from"
//           value={formData.from}
//           onChange={handleChange}
//         />
//         <Input
//           label="Data de Fim"
//           type="date"
//           name="to"
//           value={formData.to}
//           onChange={handleChange}
//         />

//         <Input
//           label="Valor (R$)"
//           name="value"
//           type="number"
//           value={formData.value}
//           onChange={handleChange}
//         />

//         <Select
//           label="Tipo de Evento"
//           name="eventType"
//           value={formData.eventType}
//           onChange={handleChange}
//           options={[
//             { value: 'MAINTENANCE', label: 'Manutenção' },
//             { value: 'RENEW_CERTIFIED', label: 'Renovar Certificado' },
//             { value: 'DISABLE_CERTIFIED', label: 'Expirar Certificado' },
//             { value: 'CALIBRATION', label: 'Calibração' },
//             { value: 'ENABLE_EQUIPMENT', label: 'Ativar Equipamento' },
//             { value: 'INACTIVATE_EQUIPMENT', label: 'Desativar Equipamento' }
//           ]}
//           disabled={isEdit}
//         />

//         {formData.eventType === 'RENEW_CERTIFIED' && (
//           <Input
//             label="Arquivo PDF"
//             name="file"
//             type="file"
//             onChange={handleChange}
//           />
//         )}

//         <div className="col-span-1 md:col-span-2 mt-4">
//           <button
//             type="submit" // adicionar endpoint CREATE event?
//             className="w-full bg-blue-950 text-white py-3 rounded-xl hover:bg-blue-800 transition"
//           >
//             {isEdit ? 'Atualizar Evento' : 'Cadastrar Evento'}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// const Input = ({
//   label,
//   name,
//   value,
//   type = 'text',
//   placeholder,
//   onChange
// }: any) => (
//   <div className="flex flex-col">
//     <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
//       {label}
//     </label>
//     <input
//       id={name}
//       name={name}
//       type={type}
//       value={type !== 'file' ? value : undefined}
//       placeholder={placeholder}
//       onChange={onChange}
//       className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
// )

// const Select = ({
//   label,
//   name,
//   value,
//   onChange,
//   options,
//   disabled = false
// }: any) => (
//   <div className="flex flex-col">
//     <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
//       {label}
//     </label>
//     <select
//       id={name}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       disabled={disabled}
//       required
//     >
//       <option value="" disabled>
//         Selecione uma opção
//       </option>
//       {options.map((opt: any) => (
//         <option key={opt.value} value={opt.value}>
//           {opt.label}
//         </option>
//       ))}
//     </select>
//   </div>
// )

// const TextArea = ({ label, name, value, placeholder, onChange }: any) => (
//   <div className="flex flex-col col-span-1 md:col-span-2">
//     <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
//       {label}
//     </label>
//     <textarea
//       id={name}
//       name={name}
//       value={value}
//       placeholder={placeholder}
//       onChange={onChange}
//       rows={4}
//       className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
// )
