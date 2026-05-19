import { NextRequest, NextResponse } from 'next/server'

import { habitRepository } from '@/server/app/entities/repositories/habit.repository'
import { authServer } from '@/pkg/auth/server'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await authServer.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: habitId } = await params
  const { date } = await request.json()

  const result = await habitRepository.toggleLog(habitId, date)
  return NextResponse.json(result, { status: result.toggled ? 201 : 200 })
}
