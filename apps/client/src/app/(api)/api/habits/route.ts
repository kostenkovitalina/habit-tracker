import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/app/entities/db/client'
import { habits } from '@/app/entities/db/schema'
import { authServer } from '@/pkg/auth/server'

export async function GET() {
  const session = await authServer.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await db.select().from(habits).where(eq(habits.userId, session.user.id))

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const session = await authServer.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  const [habit] = await db
    .insert(habits)
    .values({
      userId: session.user.id,
      title: body.title,
      description: body.description ?? null,
      frequency: body.frequency,
      goalDays: body.goalDays ?? null,
    })
    .returning()

  return NextResponse.json(habit, { status: 201 })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await authServer.getSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  await db.delete(habits).where(and(eq(habits.id, id), eq(habits.userId, session.user.id)))

  return new NextResponse(null, { status: 204 })
}
