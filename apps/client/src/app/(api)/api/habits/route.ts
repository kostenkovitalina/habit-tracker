import { NextRequest, NextResponse } from 'next/server'

import { authServer } from '@/pkg/auth/server'
import { habitRepository } from '@/server/app/entities/repositories/habit.repository'

export async function GET() {
  const session = await authServer.getSession()

  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await habitRepository.findAll(session.user.id)

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const session = await authServer.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  const habit = await habitRepository.create(session.user.id, body)

  return NextResponse.json(habit, { status: 201 })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await authServer.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  await habitRepository.delete(id, session.user.id)

  return NextResponse.json(null, { status: 204 })
}
