import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/app/entities/db/client'
import { habitLogs } from '@/app/entities/db/schema'
import { authServer } from '@/pkg/auth/server'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await authServer.getSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: habitId } = await params
  const { date } = await request.json()

  const existing = await db
    .select()
    .from(habitLogs)
    .where(and(eq(habitLogs.habitId, habitId), eq(habitLogs.date, date)))

  if (existing.length > 0) {
    await db.delete(habitLogs).where(eq(habitLogs.id, existing[0].id))
    return NextResponse.json({ toggled: false })
  }

  const [log] = await db.insert(habitLogs).values({ habitId, date }).returning()
  return NextResponse.json({ toggled: true, log }, { status: 201 })
}
