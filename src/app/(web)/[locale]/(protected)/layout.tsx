import { redirect } from 'next/navigation'

import { authServer } from '@/pkg/auth/server'

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const session = await authServer.getSession()

  if (!session?.user) redirect(`/${locale}/sign-in`)

  return <>{children}</>
}
