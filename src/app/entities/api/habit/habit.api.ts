import { and, desc, eq, ne } from 'drizzle-orm'

import { db } from '../../db/client'
import { habit, habitLog } from '../../db/schema'
import type { CreateHabitInput, CreateHabitLogInput, HabitLog, HabitWithTodayStatus } from '../../models/habit.model'

function todayDate() {
  return new Date().toISOString().slice(0, 10)
}

function mapHabit(row: typeof habit.$inferSelect, completedToday: boolean): HabitWithTodayStatus {
  return {
    id: row.id,
    userId: row.userId,
    title: row.title,
    description: row.description ?? undefined,
    frequency: row.frequency,
    status: row.status,
    targetSchedule: row.targetSchedule ?? undefined,
    targetCount: row.targetCount,
    targetUnit: row.targetUnit,
    triggerRoutine: row.triggerRoutine ?? undefined,
    pastAttempts: row.pastAttempts ?? undefined,
    ifThenPlan: row.ifThenPlan ?? undefined,
    microSteps: row.microSteps,
    color: row.color,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    completedToday,
    currentStreak: 0,
    weeklyCompletionRate: 0,
  }
}

function mapHabitLog(row: typeof habitLog.$inferSelect): HabitLog {
  return {
    id: row.id,
    habitId: row.habitId,
    userId: row.userId,
    loggedFor: row.loggedFor,
    status: row.status,
    completedAt: row.completedAt?.toISOString(),
    durationMinutes: row.durationMinutes ?? undefined,
    energyBefore: row.energyBefore ?? undefined,
    moodBefore: row.moodBefore ?? undefined,
    difficulty: row.difficulty ?? undefined,
    tags: row.tags,
    reason: row.reason ?? undefined,
    note: row.note ?? undefined,
    tasksPlannedCount: row.tasksPlannedCount ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export async function getHabitsWithTodayStatus(userId: string) {
  const today = todayDate()

  const rows = await db.query.habit.findMany({
    where: and(eq(habit.userId, userId), ne(habit.status, 'archived')),
    with: {
      logs: {
        where: eq(habitLog.loggedFor, today),
      },
    },
    orderBy: desc(habit.createdAt),
  })

  return rows.map(({ logs, ...item }) =>
    mapHabit(
      item,
      logs.some((log) => log.status === 'completed'),
    ),
  )
}

export async function createHabit(userId: string, input: CreateHabitInput) {
  const [created] = await db
    .insert(habit)
    .values({
      userId,
      title: input.title,
      description: input.description,
      frequency: input.frequency ?? 'daily',
      targetSchedule: input.targetSchedule,
      targetCount: input.targetCount ?? 1,
      targetUnit: input.targetUnit ?? 'times',
      triggerRoutine: input.triggerRoutine,
      pastAttempts: input.pastAttempts,
      ifThenPlan: input.ifThenPlan,
      microSteps: input.microSteps ?? [],
      color: input.color ?? '#111827',
    })
    .returning()

  return mapHabit(created, false)
}

export async function toggleHabitCompletion(userId: string, habitId: string) {
  const today = todayDate()

  const existing = await db.query.habitLog.findFirst({
    where: and(eq(habitLog.habitId, habitId), eq(habitLog.loggedFor, today)),
  })

  if (existing) {
    await db.delete(habitLog).where(eq(habitLog.id, existing.id))
    return { completed: false }
  }

  await db.insert(habitLog).values({
    habitId,
    userId,
    loggedFor: today,
    status: 'completed',
    completedAt: new Date(),
  })

  return { completed: true }
}

export async function archiveHabit(userId: string, habitId: string) {
  const [updated] = await db
    .update(habit)
    .set({ status: 'archived', updatedAt: new Date() })
    .where(and(eq(habit.id, habitId), eq(habit.userId, userId)))
    .returning()

  return updated ? mapHabit(updated, false) : null
}

export async function createHabitLog(userId: string, input: CreateHabitLogInput) {
  const [log] = await db
    .insert(habitLog)
    .values({
      habitId: input.habitId,
      userId,
      loggedFor: input.loggedFor,
      status: input.status,
      completedAt: input.completedAt ? new Date(input.completedAt) : undefined,
      durationMinutes: input.durationMinutes,
      energyBefore: input.energyBefore,
      moodBefore: input.moodBefore,
      difficulty: input.difficulty,
      tags: input.tags ?? [],
      reason: input.reason,
      note: input.note,
      tasksPlannedCount: input.tasksPlannedCount,
    })
    .returning()

  return mapHabitLog(log)
}

export async function getHabitLogs(habitId: string) {
  const rows = await db.query.habitLog.findMany({
    where: eq(habitLog.habitId, habitId),
    orderBy: desc(habitLog.loggedFor),
  })

  return rows.map(mapHabitLog)
}
