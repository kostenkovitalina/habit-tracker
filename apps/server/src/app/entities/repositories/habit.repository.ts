import { and, eq } from 'drizzle-orm'
import { db } from '../db/client'
import { habitLogs, habits } from '../db/schema'

export const habitRepository = {
  findAll: (userId: string) => db.select().from(habits).where(eq(habits.userId, userId)),

  create: (
    userId: string,
    data: {
      title: string
      description?: string | null
      frequency: 'daily' | 'weekly' | 'custom'
      goalDays?: number | null
    },
  ) =>
    db
      .insert(habits)
      .values({ userId, ...data })
      .returning()
      .then((r) => r[0]),

  delete: (id: string, userId: string) => db.delete(habits).where(and(eq(habits.id, id), eq(habits.userId, userId))),

  archive: (id: string, userId: string) =>
    db
      .update(habits)
      .set({ status: 'archived', archivedAt: new Date() })
      .where(and(eq(habits.id, id), eq(habits.userId, userId)))
      .returning()
      .then((r) => r[0]),

  toggleLog: async (habitId: string, date: string) => {
    const existing = await db
      .select()
      .from(habitLogs)
      .where(and(eq(habitLogs.habitId, habitId), eq(habitLogs.date, date)))

    if (existing.length > 0) {
      await db.delete(habitLogs).where(eq(habitLogs.id, existing[0].id))
      return { toggled: false }
    }

    const [log] = await db.insert(habitLogs).values({ habitId, date }).returning()
    return { toggled: true, log }
  },
}
