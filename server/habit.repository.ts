import { and, eq } from "drizzle-orm";
import { db } from "../src/app/entities/db/client";
import { habits } from "../src/app/entities/db/schema";

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