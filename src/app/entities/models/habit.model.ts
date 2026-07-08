export type HabitFrequency = 'daily' | 'weekly' | 'custom'
export type HabitStatus = 'active' | 'paused' | 'archived'
export type HabitLogStatus = 'completed' | 'skipped' | 'lazy'
export type ChallengeStatus = 'active' | 'completed' | 'abandoned'
export type AiChatRole = 'system' | 'user' | 'assistant'

export interface Habit {
  id: string
  userId?: string
  title: string
  description?: string
  frequency: HabitFrequency
  status: HabitStatus
  targetSchedule?: string
  targetCount: number
  targetUnit: string
  triggerRoutine?: string
  pastAttempts?: string
  ifThenPlan?: string
  microSteps: string[]
  color: string
  createdAt: string
  updatedAt: string
}

export interface HabitWithTodayStatus extends Habit {
  completedToday: boolean
  currentStreak: number
  weeklyCompletionRate: number
}

export interface CreateHabitInput {
  title: string
  description?: string
  frequency?: HabitFrequency
  targetSchedule?: string
  targetCount?: number
  targetUnit?: string
  triggerRoutine?: string
  pastAttempts?: string
  ifThenPlan?: string
  microSteps?: string[]
  color?: string
}

export interface HabitLog {
  id: string
  habitId: string
  userId?: string
  loggedFor: string
  status: HabitLogStatus
  completedAt?: string
  durationMinutes?: number
  energyBefore?: number
  moodBefore?: number
  difficulty?: number
  tags: string[]
  reason?: string
  note?: string
  tasksPlannedCount?: number
  createdAt: string
  updatedAt: string
}

export interface CreateHabitLogInput {
  habitId: string
  loggedFor: string
  status: HabitLogStatus
  completedAt?: string
  durationMinutes?: number
  energyBefore?: number
  moodBefore?: number
  difficulty?: number
  tags?: string[]
  reason?: string
  note?: string
  tasksPlannedCount?: number
}

export interface Challenge {
  id: string
  userId?: string
  title: string
  description?: string
  status: ChallengeStatus
  startDate: string
  endDate: string
  targetDays: number
  habitIds: string[]
  createdAt: string
  updatedAt: string
}

export interface TelegramReminder {
  id: string
  userId?: string
  habitId?: string
  chatId: string
  localTime: string
  timezone: string
  daysOfWeek: number[]
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export interface AiChatMessage {
  id: string
  threadId: string
  userId?: string
  role: AiChatRole
  content: string
  analyticsPayload?: Record<string, unknown>
  createdAt: string
}
