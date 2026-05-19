import { redirect } from 'next/navigation'

import { authServer } from '@/pkg/auth/server'
import { DashboardLayoutModule } from '../../../modules/layouts/dashboard-layout'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await authServer.getSession()

  if (!session?.user) redirect('/sign-in')

  return <DashboardLayoutModule>{children}</DashboardLayoutModule>
}
