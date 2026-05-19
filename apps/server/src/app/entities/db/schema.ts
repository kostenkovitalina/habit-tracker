import { relations } from 'drizzle-orm'
import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

// enums
export const habitFrequencyEnum = pgEnum('habit_frequency', ['daily', 'weekly', 'custom'])
export const habitStatusEnum = pgEnum('habit_status', ['active', 'archived', 'completed'])

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

// habits
export const habits = pgTable(
  'habits',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    frequency: habitFrequencyEnum('frequency').notNull(),
    status: habitStatusEnum('status').notNull().default('active'),
    goalDays: integer('goal_days'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    archivedAt: timestamp('archived_at', { withTimezone: true }),
  },
  (table) => [
    index('habits_user_id_idx').on(table.userId),
    index('habits_status_idx').on(table.status),
  ]
)

// habit_logs
export const habitLogs = pgTable(
  'habit_logs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    habitId: uuid('habit_id').notNull().references(() => habits.id, { onDelete: 'cascade' }),
    date: date('date').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('habit_logs_habit_id_date_idx').on(table.habitId, table.date),
    index('habit_logs_habit_id_idx').on(table.habitId),
    index('habit_logs_date_idx').on(table.date),
  ]
)

// relations
export const habitsRelations = relations(habits, ({ one, many }) => ({
  user: one(user, { fields: [habits.userId], references: [user.id] }),
  logs: many(habitLogs),
}))

export const habitLogsRelations = relations(habitLogs, ({ one }) => ({
  habit: one(habits, { fields: [habitLogs.habitId], references: [habits.id] }),
}))
