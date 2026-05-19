import { THabitFrequency, THabitStatus } from "../../shared/interface/habit.interface"

//interface
export interface Habit {
  id: string
  title: string
  description?: string

  frequency: THabitFrequency

  createdAt: string
  updatedAt: string

  status: THabitStatus

  goalDays?: number

  userId: string
}

export interface HabitLog {
  id: string

  habitId: string

  date: string

  completed: boolean

  createdAt: string
}