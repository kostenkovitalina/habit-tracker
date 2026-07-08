import type { CreateHabitInput, CreateHabitLogInput, HabitLog, HabitWithTodayStatus } from '../../models/habit.model'

const demoHabits: HabitWithTodayStatus[] = [
  {
    id: 'demo-morning-water',
    title: 'Drink water after waking up',
    description: 'Start the day with a small, easy win.',
    frequency: 'daily',
    status: 'active',
    targetCount: 1,
    targetUnit: 'times',
    targetSchedule: 'Every morning after waking up',
    triggerRoutine: 'After turning off the alarm',
    pastAttempts: 'Usually forgotten on busy mornings',
    ifThenPlan: 'If the morning is rushed, drink a glass before opening the laptop.',
    microSteps: ['Put a glass near the sink', 'Drink one glass before coffee'],
    color: '#2563eb',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedToday: false,
    currentStreak: 0,
    weeklyCompletionRate: 0,
  },
]

const demoLogs: HabitLog[] = []

export async function getHabitsWithTodayStatus() {
  return demoHabits.filter((habit) => habit.status !== 'archived')
}

export async function createHabit(input: CreateHabitInput) {
  const now = new Date().toISOString()
  const habit: HabitWithTodayStatus = {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description,
    frequency: input.frequency ?? 'daily',
    status: 'active',
    targetSchedule: input.targetSchedule,
    targetCount: input.targetCount ?? 1,
    targetUnit: input.targetUnit ?? 'times',
    triggerRoutine: input.triggerRoutine,
    pastAttempts: input.pastAttempts,
    ifThenPlan: input.ifThenPlan,
    microSteps: input.microSteps ?? [],
    color: input.color ?? '#111827',
    createdAt: now,
    updatedAt: now,
    completedToday: false,
    currentStreak: 0,
    weeklyCompletionRate: 0,
  }

  demoHabits.push(habit)

  return habit
}

export async function toggleHabitCompletion(id: string) {
  const habit = demoHabits.find((item) => item.id === id)

  if (!habit) return null

  habit.completedToday = !habit.completedToday
  habit.currentStreak = habit.completedToday ? habit.currentStreak + 1 : Math.max(0, habit.currentStreak - 1)
  habit.updatedAt = new Date().toISOString()

  return habit
}

export async function archiveHabit(id: string) {
  const habit = demoHabits.find((item) => item.id === id)

  if (!habit) return null

  habit.status = 'archived'
  habit.updatedAt = new Date().toISOString()

  return habit
}

export async function createHabitLog(input: CreateHabitLogInput) {
  const now = new Date().toISOString()
  const log: HabitLog = {
    id: crypto.randomUUID(),
    habitId: input.habitId,
    loggedFor: input.loggedFor,
    status: input.status,
    completedAt: input.completedAt,
    durationMinutes: input.durationMinutes,
    energyBefore: input.energyBefore,
    moodBefore: input.moodBefore,
    difficulty: input.difficulty,
    tags: input.tags ?? [],
    reason: input.reason,
    note: input.note,
    tasksPlannedCount: input.tasksPlannedCount,
    createdAt: now,
    updatedAt: now,
  }

  demoLogs.push(log)

  return log
}

export async function getHabitLogs(habitId: string) {
  return demoLogs.filter((log) => log.habitId === habitId)
}
