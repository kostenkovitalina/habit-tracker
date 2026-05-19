import { and, eq } from 'drizzle-orm'

import { db } from '@/app/entities/db/client'
import { habitLogs, habits } from '@/app/entities/db/schema'

// get all active habits for a user
export const getHabits = async (userId: string) => {
  return db.select().from(habits).where(
    and(eq(habits.userId, userId), eq(habits.status, 'active'))
  )
}

// create habit
export const createHabit = async (
  userId: string,
  data: { title: string; description?: string; frequency: 'daily' | 'weekly' | 'custom'; goalDays?: number }
) => {
  const [habit] = await db.insert(habits).values({ userId, ...data }).returning()
  return habit
}

// archive habit
export const archiveHabit = async (habitId: string, userId: string) => {
  const [habit] = await db
    .update(habits)
    .set({ status: 'archived', archivedAt: new Date() })
    .where(and(eq(habits.id, habitId), eq(habits.userId, userId)))
    .returning()
  return habit
}

// toggle habit log for today
export const toggleHabitCompletion = async (habitId: string, date: string) => {
  const existing = await db
    .select()
    .from(habitLogs)
    .where(and(eq(habitLogs.habitId, habitId), eq(habitLogs.date, date)))

  if (existing.length > 0) {
    await db.delete(habitLogs).where(eq(habitLogs.id, existing[0].id))
    return null
  }

  const [log] = await db.insert(habitLogs).values({ habitId, date }).returning()
  return log
}
