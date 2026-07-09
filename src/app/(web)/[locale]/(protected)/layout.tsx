import { redirect } from 'next/navigation'

import { ProtectedLayoutClient } from '@/app/modules/layout'
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

  const navData = [
    { title: 'Звички', url: '/habits', icon: 'Home', mobileIcon: '🌿' },
    { title: 'Аналітика', url: '/analytics', icon: 'BarChart3', mobileIcon: '📊' },
    { title: 'Цілі', url: '/goals', icon: 'Target', mobileIcon: '🎯' },
    { title: 'Челенджі', url: '/challenges', icon: 'Award', mobileIcon: '⚡' },
    { title: 'Нагадування', url: '/reminders', icon: 'Bell', mobileIcon: '🔔' },
    { title: 'AI Чат', url: '/ai-chat', icon: 'Bot', mobileIcon: '🤖' },
  ]

  return <ProtectedLayoutClient navData={navData}>{children}</ProtectedLayoutClient>
}
