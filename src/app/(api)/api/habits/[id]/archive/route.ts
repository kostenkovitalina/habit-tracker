import { and, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

import { db } from '@/app/entities/db/client'
import { habits } from '@/app/entities/db/schema'
import { authServer } from '@/pkg/auth/server'

export async function PATCH(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await authServer.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const [habit] = await db
    .update(habits)
    .set({ status: 'archived', archivedAt: new Date() })
    .where(and(eq(habits.id, id), eq(habits.userId, session.user.id)))
    .returning()

  if (!habit) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(habit)
}
