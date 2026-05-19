# Habit Tracker — повний план розробки

## Context

Проєкт — Next.js 16.2.4 застосунок для відстеження звичок. Зараз він не запускається: коренева сторінка повертає 404, бо немає `proxy.ts` (next-intl 16+), [locale]/layout.tsx порожній, відсутні переклади, root layout посилається на видалений `globals.css`, а легасі-маршрути (`src/app/dashboard`, `/login`, `/signup`, `/modules`) конфліктують зі структурою FSD. База даних має лише таблицю `users` — жодної звичкової логіки.

**Ціль**: довести застосунок до робочого MVP з повним функціоналом — створення/трекінг звичок, активна діаграма, стріки, "лінькуваті" дні, особисті челенджі, Telegram-нагадування та AI-чат для аналітики (Vercel AI SDK, Claude). Робота розбита на 12 послідовних блоків — кожен можна перевірити окремо.

**Рішення, узгоджені з користувачем**:
- Нагадування → Telegram-бот (grammY)
- AI-чат → Vercel AI SDK + Claude (Anthropic provider)
- Челенджі → лише особисті (MVP)
- Auth → продовжуємо з Better-Auth

**Архітектурні обмеження** (`.claude/skills/client-architecture.md`):
- Шари: `(web) → modules → widgets → features → entities → shared → config → pkg`
- Імпорти тільки вниз, кожен slice експортує через `index.ts`
- Default — server components, client тільки за потреби
- Іменування: `*.component.tsx`, `*.feature.tsx`, `*.module.tsx`, `*.api.ts`, `*.model.ts`, `*.query.ts`, `*.mutation.ts`, `*.service.ts`, `*.hook.ts`, `*.store.ts`, `*.interface.ts`
- Коментарі: лише `// 1-5 слів`, label-style (`.claude/skills/comments.md`)
- Next.js 16: `middleware.ts` → `proxy.ts`, `params` стали `Promise<...>` — обов'язково `await`

---

## Бібліотеки до встановлення

| Блок | Пакет | Призначення |
|---|---|---|
| Foundation | `next-intl` (вже є 4.11.2 — пропустити) | i18n |
| State | `@tanstack/react-query`, `zustand`, `zod` | server state, UI state, валідація |
| DB / Auth | `better-auth`, `@better-auth/drizzle-adapter` | завершити auth |
| Forms | `react-hook-form`, `@hookform/resolvers` | форми звичок/челенджів |
| Charts | `recharts` | діаграми активності/прогресу |
| Calendar heatmap | `react-activity-calendar` | контрибуційна діаграма (GitHub-style) |
| Dates | `date-fns`, `date-fns-tz` | арифметика дат, таймзони |
| Telegram bot | `grammy`, `@grammyjs/runner` | Telegram-нагадування |
| Cron | `@vercel/cron` (вбудовано в Vercel) АБО `node-cron` для self-host | щохвилинні нагадування |
| AI | `ai`, `@ai-sdk/anthropic`, `@ai-sdk/react` | Vercel AI SDK + Claude |
| Misc | `nanoid` | id для challenge invites/short codes |

---

## Блок 1. Foundation (відновлення білду)

**Файли для редагування/створення:**

1. **Видалити легасі-папки** (конфліктують з `(web)/[locale]`):
   - `src/app/dashboard/`
   - `src/app/login/`
   - `src/app/signup/`
   - `src/app/modules/sign/` — переїде у `src/modules/sign/` (поза `app/`)
   - `src/app/entities/`, `src/app/features/`, `src/app/widgets/` — переїдуть на `src/entities/`, `src/features/`, `src/widgets/`

2. **Перенести FSD-папки з `src/app/` у `src/`** — бо все всередині `app/` стає роутингом.

3. **Виправити `src/app/layout.tsx`**: видалити імпорт `./globals.css` (файл видалено) або створити `src/app/globals.css` з Tailwind v4 директивами (`@import "tailwindcss";`).

4. **Створити `src/proxy.ts`** (Next.js 16 замість middleware.ts):
   ```ts
   import createMiddleware from 'next-intl/middleware'
   import { routing } from '@/pkg/locale'
   export default createMiddleware(routing)
   export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }
   ```

5. **Створити `src/translations/en.json`** (мінімальний) і додати `uk.json` (українська як друга локаль). Оновити `routing.ts` → `locales: ['en', 'uk']`.

6. **Створити `src/app/(web)/[locale]/layout.tsx`**:
   ```tsx
   export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
     const { locale } = await params
     setRequestLocale(locale)
     const messages = await getMessages()
     return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
   }
   ```

7. **Перейменувати** `(auth)/sing-in` → `(auth)/sign-in`, `sing-up` → `sign-up` (типографська помилка).

8. **Додати `src/app/providers.tsx`** — обгортка з `QueryClientProvider`, підключити в root layout.

**Verification**: `npm run dev`, відкрити `http://localhost:3000` → редірект на `/en`, сторінка з кнопками Sign In/Sign Up рендериться.

---

## Блок 2. Database Schema (Drizzle)

Файл: `src/entities/db/schema.ts`. Розширити поточну схему таблицями:

```ts
// users (Better-Auth recommended schema)
users: id (uuid pk), email (unique), name, image, emailVerified, createdAt, updatedAt
sessions, accounts, verificationTokens — згенерувати з better-auth CLI

// habits
habits: id (uuid pk), userId (fk users), title, description, color (hex),
  icon (lucide name), frequency (enum: 'daily'|'weekly'|'custom'),
  weekdays (jsonb: [0..6]), targetPerWeek (int), formationGoalDays (int default 66),
  archivedAt (timestamp nullable), createdAt, updatedAt

// habit_logs — щоденні відмітки виконання
habit_logs: id, habitId (fk), userId (fk), date (date, NOT timestamp — день локально),
  status (enum: 'done'|'skipped'|'lazy'), note (text nullable), createdAt
  unique(habitId, date) — одна відмітка на день

// habit_reminders
habit_reminders: id, habitId (fk), userId (fk), time (time without tz),
  weekdays (jsonb [0..6]), timezone (varchar IANA), enabled (boolean), lastSentAt

// challenges (особисті)
challenges: id, userId (fk), title, description, startDate (date),
  endDate (date), targetHabitIds (jsonb uuid[]), status (enum: 'active'|'completed'|'failed'),
  createdAt

// challenge_progress — денний снапшот для лідерборду/звітів
challenge_progress: id, challengeId (fk), date, completedCount, totalCount

// telegram_links — для прив'язки облікового запису
telegram_links: id, userId (fk unique), chatId (bigint), username,
  linkedAt, linkToken (для одноразової прив'язки)

// ai_conversations + ai_messages — історія чату
ai_conversations: id, userId (fk), title, createdAt, updatedAt
ai_messages: id, conversationId (fk), role (enum: 'user'|'assistant'|'tool'),
  content (text), toolCalls (jsonb), createdAt
```

**Команди**:
```
npx drizzle-kit generate
npx drizzle-kit migrate
```

**Verification**: відкрити Supabase Dashboard → Table Editor, переконатися що всі таблиці є.

---

## Блок 3. Better-Auth (завершення)

1. Встановити drizzle-адаптер. Згенерувати схему: `npx @better-auth/cli generate`.
2. `src/pkg/auth/server/auth.server.ts`: сконфігурувати `betterAuth({ database: drizzleAdapter(db, { schema, provider: 'pg' }), emailAndPassword: { enabled: true }, plugins: [...] })`.
3. Створити API route handler: `src/app/(api)/api/auth/[...all]/route.ts` → `toNextJsHandler(auth)`.
4. Створити `src/modules/sign/sign-in.module.tsx` і `sign-up.module.tsx` (перенести з `src/app/modules/sign/`).
5. Підключити модулі у `(web)/[locale]/(auth)/sign-in/page.tsx`.

**Verification**: зареєструватись через `/en/sign-up`, увійти, перевірити що `session` повертається у `(public)/page.tsx`.

---

## Блок 4. Entities layer — Habit

Шлях: `src/entities/habit/`

- `habit.interface.ts` — типи `Habit`, `HabitLog`, `HabitFrequency`, `HabitStatus`.
- `habit.api.ts` — серверні функції (`getUserHabits(userId)`, `createHabit(data)`, `toggleHabitLog(habitId, date, status)`, `archiveHabit(id)`).
- `habit.query.ts` — React Query хуки (`useHabits()`, `useHabit(id)`, `useHabitLogs(habitId, range)`).
- `habit.mutation.ts` — мутації (`useCreateHabit`, `useToggleHabitLog`, `useArchiveHabit`).
- `habit.model.ts` — derived selectors: `getStreak(logs)`, `getFormationProgress(logs, goalDays)`, `getCompletionRate(logs, range)`, `getLazyDays(logs)`.
- `index.ts` — публічний API.

**Те саме** для `entities/challenge/`, `entities/reminder/`, `entities/telegram/`, `entities/ai-chat/`.

---

## Блок 5. Features (атомарна логіка)

Шлях: `src/features/`

| Feature | Призначення |
|---|---|
| `habit-toggle/` | кнопка "виконано/пропущено/лінькуюся сьогодні" з оптимістичним апдейтом |
| `habit-form/` | форма створення/редагування звички (react-hook-form + zod) |
| `habit-card/` | компактна картка однієї звички в списку |
| `streak-counter/` | відображення поточного стріку + рекорду |
| `formation-progress/` | прогрес-бар "приживлення" (66 днів за замовчуванням) |
| `activity-heatmap/` | GitHub-style діаграма (`react-activity-calendar`) на 365 днів |
| `lazy-day-marker/` | спеціальний тип логу (не зриває стрік, але впливає на показники) |
| `reminder-form/` | форма налаштування нагадування (час, дні тижня, таймзона) |
| `telegram-link/` | UI для прив'язки облікового запису до Telegram |
| `challenge-form/` | форма створення челенджу (період + звички) |
| `ai-chat-input/` | textarea з submit, прикріплення поточного контексту |

Кожна feature — папка з `*.feature.tsx` + `index.ts`.

---

## Блок 6. Widgets (композитні UI-блоки)

Шлях: `src/widgets/`

| Widget | Зміст |
|---|---|
| `sidebar/` | (уже є чорновик) бічна навігація — оновити маршрути |
| `habits-list/` | список звичок з `habit-card` + кнопкою "+" |
| `today-checklist/` | сьогоднішні звички для трекінгу |
| `activity-calendar/` | повноекранна теплокарта з тултіпами |
| `analytics-overview/` | картки KPI (стрік, % виконання, лінькуваті дні, приживленість) |
| `habit-detail-chart/` | recharts: бар-діаграма по тижнях/місяцях для однієї звички |
| `challenges-board/` | сітка карток челенджів зі статусом |
| `ai-chat-panel/` | повідомлення + інпут + стрімінг |

---

## Блок 7. Modules (page-level orchestration)

Шлях: `src/modules/`

- `dashboard.module.tsx` — `today-checklist` + `analytics-overview` + останні логи.
- `habits.module.tsx` — повний список + фільтри (active/archived).
- `habit-detail.module.tsx` — заголовок, `habit-detail-chart`, `activity-calendar` для однієї звички, `formation-progress`.
- `analytics.module.tsx` — глобальна аналітика, recharts комбіновані діаграми.
- `challenges.module.tsx` — `challenges-board` + кнопка створення.
- `settings.module.tsx` — налаштування профілю, таймзона, Telegram-link.
- `ai-chat.module.tsx` — `ai-chat-panel` + sidebar з історією розмов.

---

## Блок 8. Routes (Next.js pages, "тонкі")

```
src/app/(web)/[locale]/
  (auth)/
    sign-in/page.tsx
    sign-up/page.tsx
  (app)/             ← новий route group, тільки для авторизованих
    layout.tsx       ← guards: redirect якщо немає session, рендерить sidebar
    dashboard/page.tsx        → DashboardModule
    habits/page.tsx           → HabitsModule
    habits/[id]/page.tsx      → HabitDetailModule (params: Promise<{id}>)
    analytics/page.tsx        → AnalyticsModule
    challenges/page.tsx       → ChallengesModule
    settings/page.tsx         → SettingsModule
    ai/page.tsx               → AIChatModule
  (public)/page.tsx           → лендинг
```

---

## Блок 9. Telegram bot (нагадування)

Шлях: `src/pkg/telegram/`

1. `bot.ts` — `new Bot(env.TELEGRAM_BOT_TOKEN)`, команди:
   - `/start <linkToken>` — прив'язує `chatId` до `userId` через `telegram_links.linkToken`.
   - `/today` — присилає список звичок на сьогодні (callback buttons "done/skip/lazy").
   - `/streak <habit>` — поточний стрік.
2. `webhook.ts` — обробник для Next.js route `src/app/(api)/api/telegram/webhook/route.ts`.
3. Налаштувати webhook через `bot.api.setWebhook(...)` (один раз через скрипт `scripts/setup-telegram.ts`).
4. `dispatcher.ts` — функція `dispatchDueReminders()`:
   - вибирає `habit_reminders` де `enabled = true` AND час у локальній tz користувача = поточна година:хвилина AND сьогоднішній weekday в `weekdays` AND `lastSentAt < сьогодні`.
   - відсилає повідомлення в Telegram, оновлює `lastSentAt`.

**Cron**: створити `src/app/(api)/api/cron/reminders/route.ts` з перевіркою `Authorization: Bearer <CRON_SECRET>`. Додати у `vercel.json`:
```json
{ "crons": [{ "path": "/api/cron/reminders", "schedule": "* * * * *" }] }
```

**Env**: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET`, `CRON_SECRET`. Додати в `src/config/env.server.ts` через `@t3-oss/env-nextjs`.

---

## Блок 10. AI Chat (Vercel AI SDK + Claude)

Шлях: `src/pkg/ai/` і `src/modules/ai-chat/`

1. **API route**: `src/app/(api)/api/ai/chat/route.ts`:
   ```ts
   import { anthropic } from '@ai-sdk/anthropic'
   import { streamText, tool } from 'ai'
   export async function POST(req) {
     const { messages } = await req.json()
     const session = await authServer.getSession()
     const result = streamText({
       model: anthropic('claude-sonnet-4-6'),
       system: 'Ти асистент для аналітики звичок. Користуйся інструментами для отримання даних.',
       messages,
       tools: { getHabits, getHabitStats, getStreaks, getActivityRange, listChallenges },
     })
     return result.toDataStreamResponse()
   }
   ```

2. **Tools** (типізовані функції, які LLM викликає):
   - `getHabits()` → список активних звичок.
   - `getHabitStats(habitId, range)` → completion rate, lazy days, streak.
   - `getStreaks()` → стріки по всіх звичках.
   - `getActivityRange(start, end)` → масив (date, completedCount).
   - `listChallenges()` → активні челенджі та прогрес.

   Кожен tool має zod-схему параметрів. **Жодного raw SQL від моделі** — лише виклики цих функцій.

3. **Клієнт**: `ai-chat-panel` widget використовує `useChat` з `@ai-sdk/react`, рендерить стрімінг, показує tool calls як акордеони ("📊 Запит статистики...").

4. **Persistence**: при кожному повідомленні зберігати в `ai_messages` (для історії).

**Env**: `ANTHROPIC_API_KEY`.

---

## Блок 11. Бізнес-логіка показників

Реалізувати у `src/entities/habit/habit.model.ts`:

| Метрика | Логіка |
|---|---|
| Streak (днів без пропуску) | йдемо назад від сьогодні, рахуємо `done` (lazy теж рахується якщо `frequency=daily`); ламаємось на `skipped` або пропущений день |
| Best streak | максимум серед усіх вікон |
| Formation progress | `min(currentStreak / formationGoalDays * 100, 100)` |
| Completion rate (тижд/міс) | `done / (done + skipped + missed)` за період |
| Lazy days | кількість логів зі статусом `lazy` за період |
| Activity calendar data | агрегація `habit_logs` по даті: `level = 0..4` за кількістю виконаних звичок |
| Challenge progress | для кожної звички в челенджі — % днів виконання у вікні `[startDate, endDate]` |

---

## Блок 12. Тестова і пускова перевірка

1. **Локальний запуск**: `npm run dev` → `/en/sign-up` створення акаунта → перенаправляє на `/en/dashboard`.
2. **Створити звичку**: "Читання 30 хв", daily, 5×/тиждень.
3. **Натиснути "Done"** на сьогодні → стрік = 1, теплокарта показує сьогоднішній день.
4. **Створити нагадування**: 09:00, будні. Прив'язати Telegram через `/settings`. Через `/start <token>` у боті переконатись що `telegram_links` створено.
5. **Локально протригерити cron**: `curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/reminders` → бот має прислати повідомлення.
6. **Створити челендж**: "30 днів читання", обрати звичку. Перевірити що `challenges-board` показує прогрес.
7. **Відкрити AI-чат**: "Скільки днів я не пропускав читання?" — модель має викликати tool `getStreaks` і відповісти. Перевірити що повідомлення збереглись.
8. **Drizzle Studio**: `npx drizzle-kit studio` — переконатись що дані консистентні.
9. **TypeScript**: `npx tsc --noEmit` без помилок.
10. **Lint**: `npm run lint` без помилок.

---

## Послідовність виконання (рекомендована)

1. Блок 1 (Foundation) — без цього нічого не запуститься.
2. Блок 2 (Schema) + Блок 3 (Auth) — паралельно.
3. Блок 4 (Entities) — основа для всього UI.
4. Блок 5, 6, 7, 8 (Features → Widgets → Modules → Routes) — знизу вгору по шарах FSD.
5. Блок 11 (Метрики) — інтегрується у Блок 4 і Блок 6.
6. Блок 9 (Telegram) — окрема вертикаль, можна паралельно з Блоком 5-8.
7. Блок 10 (AI) — останній, потребує живих даних з Блока 11.
8. Блок 12 (Verification) — наприкінці кожного блоку + загальна перевірка.

---

## Файли, які точно треба створити (швидкий чек-лист)

- `src/proxy.ts`
- `src/translations/{en,uk}.json`
- `src/app/(web)/[locale]/layout.tsx`
- `src/app/providers.tsx`
- `src/app/globals.css` (Tailwind v4 entry)
- `src/entities/db/schema.ts` (розширити)
- `src/entities/{habit,challenge,reminder,telegram,ai-chat}/` (по 4-5 файлів)
- `src/features/...` (11 features)
- `src/widgets/...` (8 widgets)
- `src/modules/...` (7 modules)
- `src/app/(web)/[locale]/(app)/{dashboard,habits,analytics,challenges,settings,ai}/page.tsx`
- `src/app/(api)/api/{auth,telegram,ai,cron}/...`
- `src/pkg/{telegram,ai}/`
- `vercel.json` (cron config)
- `scripts/setup-telegram.ts`

## Файли, які точно треба видалити

- `src/app/dashboard/`
- `src/app/login/`
- `src/app/signup/`
- `src/app/modules/` (перенести у `src/modules/`)
- `src/app/entities/`, `src/app/features/`, `src/app/widgets/` (перенести у `src/`)
- Стара міграція може лишитись — нову `npx drizzle-kit generate` створить додаткові.
