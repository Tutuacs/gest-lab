import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { redirect } from 'next/navigation'

interface PrivateLayoutProps {
  children: React.ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session || !['MASTER'].includes(session.profile.role)) {
    redirect('/login')
  }

  return <>{children}</>
}
