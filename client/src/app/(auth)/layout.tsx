// src/app/(auth)/layout.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/home')
  }

  return <>{children}</>
}
