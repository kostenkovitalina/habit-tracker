import { NextResponse } from 'next/server'

import { habitRepository } from '@/server/app/entities/repositories/habit.repository'
import { authServer } from '@/pkg/auth/server'

export async function PATCH(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await authServer.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const habit = await habitRepository.archive(id, session.user.id)

  if (!habit) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(habit)
}
