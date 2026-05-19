import { pgEnum } from "drizzle-orm/pg-core"

export const habitFrequencyEnum = pgEnum('habit_frequency', [
  'daily',
  'weekly',
  'custom',
])

export const habitStatusEnum = pgEnum('habit_status', [
  'active',
  'archived',
  'completed',
])