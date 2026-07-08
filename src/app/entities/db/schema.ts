import { relations } from 'drizzle-orm'
import {
  boolean,
  date,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  time,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'

export const habitFrequency = pgEnum('habit_frequency', ['daily', 'weekly', 'custom'])
export const habitStatus = pgEnum('habit_status', ['active', 'paused', 'archived'])
export const habitLogStatus = pgEnum('habit_log_status', ['completed', 'skipped', 'lazy'])
export const challengeStatus = pgEnum('challenge_status', ['active', 'completed', 'abandoned'])
export const aiChatRole = pgEnum('ai_chat_role', ['system', 'user', 'assistant'])

// user
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

// session
export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

// account
export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  expiresAt: timestamp('expires_at'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

// verification
export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const userProfile = pgTable('user_profile', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  timezone: text('timezone').notNull().default('UTC'),
  chronotype: text('chronotype'),
  mainGoal: text('main_goal'),
  onboardingContext: jsonb('onboarding_context').$type<Record<string, unknown>>(),
  telegramChatId: text('telegram_chat_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const habit = pgTable('habit', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  frequency: habitFrequency('frequency').notNull().default('daily'),
  status: habitStatus('status').notNull().default('active'),
  targetSchedule: text('target_schedule'),
  targetCount: integer('target_count').notNull().default(1),
  targetUnit: text('target_unit').notNull().default('times'),
  triggerRoutine: text('trigger_routine'),
  pastAttempts: text('past_attempts'),
  ifThenPlan: text('if_then_plan'),
  microSteps: jsonb('micro_steps').$type<string[]>().notNull().default([]),
  color: text('color').notNull().default('#111827'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const habitLog = pgTable(
  'habit_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    habitId: uuid('habit_id')
      .notNull()
      .references(() => habit.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    loggedFor: date('logged_for').notNull(),
    status: habitLogStatus('status').notNull(),
    completedAt: timestamp('completed_at'),
    durationMinutes: integer('duration_minutes'),
    energyBefore: integer('energy_before'),
    moodBefore: integer('mood_before'),
    difficulty: integer('difficulty'),
    tags: jsonb('tags').$type<string[]>().notNull().default([]),
    reason: text('reason'),
    note: text('note'),
    tasksPlannedCount: integer('tasks_planned_count'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [uniqueIndex('habit_log_habit_id_logged_for_unique').on(table.habitId, table.loggedFor)],
)

export const challenge = pgTable('challenge', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  status: challengeStatus('status').notNull().default('active'),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  targetDays: integer('target_days').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const challengeHabit = pgTable(
  'challenge_habit',
  {
    challengeId: uuid('challenge_id')
      .notNull()
      .references(() => challenge.id, { onDelete: 'cascade' }),
    habitId: uuid('habit_id')
      .notNull()
      .references(() => habit.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.challengeId, table.habitId] })],
)

export const telegramReminder = pgTable('telegram_reminder', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  habitId: uuid('habit_id').references(() => habit.id, { onDelete: 'cascade' }),
  chatId: text('chat_id').notNull(),
  localTime: time('local_time').notNull(),
  timezone: text('timezone').notNull().default('UTC'),
  daysOfWeek: jsonb('days_of_week').$type<number[]>().notNull().default([]),
  enabled: boolean('enabled').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const aiChatThread = pgTable('ai_chat_thread', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull().default('Habit coach'),
  purpose: text('purpose').notNull().default('analytics'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const aiChatMessage = pgTable('ai_chat_message', {
  id: uuid('id').primaryKey().defaultRandom(),
  threadId: uuid('thread_id')
    .notNull()
    .references(() => aiChatThread.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: aiChatRole('role').notNull(),
  content: text('content').notNull(),
  analyticsPayload: jsonb('analytics_payload').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const userRelations = relations(user, ({ many, one }) => ({
  profile: one(userProfile),
  habits: many(habit),
  habitLogs: many(habitLog),
  challenges: many(challenge),
  telegramReminders: many(telegramReminder),
  aiChatThreads: many(aiChatThread),
}))

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, {
    fields: [userProfile.userId],
    references: [user.id],
  }),
}))

export const habitRelations = relations(habit, ({ many, one }) => ({
  user: one(user, {
    fields: [habit.userId],
    references: [user.id],
  }),
  logs: many(habitLog),
  challengeHabits: many(challengeHabit),
  reminders: many(telegramReminder),
}))

export const habitLogRelations = relations(habitLog, ({ one }) => ({
  habit: one(habit, {
    fields: [habitLog.habitId],
    references: [habit.id],
  }),
  user: one(user, {
    fields: [habitLog.userId],
    references: [user.id],
  }),
}))

export const challengeRelations = relations(challenge, ({ many, one }) => ({
  user: one(user, {
    fields: [challenge.userId],
    references: [user.id],
  }),
  challengeHabits: many(challengeHabit),
}))

export const challengeHabitRelations = relations(challengeHabit, ({ one }) => ({
  challenge: one(challenge, {
    fields: [challengeHabit.challengeId],
    references: [challenge.id],
  }),
  habit: one(habit, {
    fields: [challengeHabit.habitId],
    references: [habit.id],
  }),
}))

export const telegramReminderRelations = relations(telegramReminder, ({ one }) => ({
  user: one(user, {
    fields: [telegramReminder.userId],
    references: [user.id],
  }),
  habit: one(habit, {
    fields: [telegramReminder.habitId],
    references: [habit.id],
  }),
}))

export const aiChatThreadRelations = relations(aiChatThread, ({ many, one }) => ({
  user: one(user, {
    fields: [aiChatThread.userId],
    references: [user.id],
  }),
  messages: many(aiChatMessage),
}))

export const aiChatMessageRelations = relations(aiChatMessage, ({ one }) => ({
  thread: one(aiChatThread, {
    fields: [aiChatMessage.threadId],
    references: [aiChatThread.id],
  }),
  user: one(user, {
    fields: [aiChatMessage.userId],
    references: [user.id],
  }),
}))
