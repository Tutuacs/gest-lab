'use client'
import { Button } from '@/components/button'
import RelProfile from '@/components/RelProfile'
import { useRouter } from 'next/navigation'

export default function EventPage() {
  const router = useRouter()
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
      <div className="bg-white shadow rounded-3xl w-full overflow-hidden">
        <RelProfile />
      </div>
    </main>
  )
}
