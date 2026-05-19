export const HABIT_FREQUENCIES = ['daily', 'weekly', 'custom'] as const

export type THabitFrequency = (typeof HABIT_FREQUENCIES)[number]

export type THabitStatus = 'active' | 'archived' | 'completed'
