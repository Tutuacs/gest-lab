'use client'

import { Button } from '@/components/button'
import CategoryTable from '@/components/RelCategory'
import { useRouter } from 'next/navigation'

export default function CategoryListPage() {
  const router = useRouter()

  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full mb-4 space-x-4">
        <div></div>

        <h1 className="text-4xl font-bold text-black text-center">
          Categorias Cadastradas
        </h1>

        <div className="flex justify-end">
          <Button
            onClick={() => router.push('/category/create')}
            className="font-bold"
          >
            Nova Categoria
          </Button>
        </div>
      </div>

      <div className="bg-white shadow rounded-3xl w-full overflow-hidden">
        <CategoryTable />
      </div>
    </main>
  )
}
