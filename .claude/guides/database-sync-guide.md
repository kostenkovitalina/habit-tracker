# 🛡️ Чек-лист синхронізації схеми БД та коду

**Мета:** уникнути ситуацій, коли код очікує таблиці `habit`, а БД має `habits`, або enum-типи висять в повітрі.

---

## 📋 Зміст

1. [Діагностика поточного стану](#1-діагностика-поточного-стану)
2. [Додавання нової таблиці/колони](#2-додавання-нової-таблицікалони)
3. [Коли код і БД розійшлись](#3-коли-код-і-бд-розійшлись)
4. [Помилки drizzle-kit migrate та їх рішення](#4-помилки-drizzle-kit-migrate-та-їх-рішення)
5. [Workflow для CI/CD та Prod](#5-workflow-для-cicd-та-prod)
6. [Git pull / гілка — перший крок](#6-git-pull--гілка--перший-крок)
7. [Швидкі команди](#7-швидкі-команди)

---

## 1. Діагностика поточного стану

### Крок 1: Перевір які таблиці в БД

```bash
# Підключись до БД і подивись таблиці
psql $DATABASE_URL -c "
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
  ORDER BY table_name
"
```

**Очікуваний результат (поточна схема):**

```
account
ai_chat_message
ai_chat_thread
challenge
challenge_habit
habit          ← мають бути в ОДНИНІ, не "habits"
habit_log      ← в ОДНИНІ, не "habit_logs"
session
telegram_reminder
user
user_profile
verification
```

> ⚠️ **Якщо маєш старі таблиці `habits`/`habit_logs` в множині** — це означає, що старіша версія schema.ts була застосована, але нова версія (з таблицями в однині) ще не мігрована.

### Крок 2: Перевір які міграції застосовані

```bash
psql $DATABASE_URL -c "
  SELECT id, hash, created_at
  FROM drizzle.__drizzle_migrations
  ORDER BY created_at
"
```

**Очікується 5 записів** (від `0000_*` до `0003_*`):

```
 id |                              hash                              |     created_at
----+----------------------------------------------------------------+-------------------
  1 | 01a7ce8f52100ad8d49997ed2cde0e40ad21237158bff560ddf0aa0faf2d | 1778068957401
  2 | 262dbb9d9f5e67773a6722b1e236ccb3e93a6d76d9c846282f71d007cd4 | 1778840142253
  3 | 88b12390c07edff060e9964ffda0806c54e267b57534087df6a0099d168 | 1778847922199
  4 | 45238320521786e3bb84405344a72d30030e57b49628386b7bb7d0eeb01 | 1779180111723
  5 | 7fa25449d6ad6e89bb0d17c4707b36a7ac5ecb21b6bb361587e6304bda87 | 1783506266331
```

> Якщо міграції 4 або 5 відсутні — вони не були застосовані до БД.

### Крок 3: Перевір enum-типи

```bash
psql $DATABASE_URL -c "
  SELECT typname FROM pg_type
  WHERE typname IN ('habit_frequency','habit_status','habit_log_status','challenge_status','ai_chat_role')
  ORDER BY typname
"
```

**Очікується 5 типів:**

```
ai_chat_role
challenge_status
habit_frequency
habit_log_status
habit_status
```

> Якщо типи є, а таблиць немає — це осиротілі типи від невдалої міграції.

---

## 2. Додавання нової таблиці/колони

### Workflow

#### 🔵 Крок 1: Реди schema.ts

```typescript
// src/app/entities/db/schema.ts
export const myNewTable = pgTable('my_new_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
```

#### 🔵 Крок 2: Генеруй міграцію (локально!)

```bash
npx drizzle-kit generate
```

Це створить новий файл `drizzle/XXXX_*.sql`. **Глянь його перед тим як коммітити!**

```bash
cat drizzle/XXXX_*.sql
```

Має бути щось на кшталт:

```sql
CREATE TABLE "my_new_table" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL,
  "title" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "my_new_table" ADD CONSTRAINT "my_new_table_user_id_user_id_fk"
  FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade;
```

#### 🔵 Крок 3: Застосуй міграцію локально

```bash
npx drizzle-kit migrate
```

Якщо впав → **не коммітиш!** Фіксиш schema.ts, повторюєш крок 2.

#### 🔵 Крок 4: Перевір у БД

```bash
psql $DATABASE_URL -c "\dt my_new_table"
```

Повинна вивести структуру таблиці.

#### 🔵 Крок 5: Перевір що міграція записалась

```bash
psql $DATABASE_URL -c "
  SELECT id, hash, created_at
  FROM drizzle.__drizzle_migrations
  ORDER BY created_at DESC LIMIT 1
"
```

Має вивести новий рядок з твоєю міграцією.

#### 🟢 Крок 6: Коммітиш

Тепер можеш коммітити:

```bash
git add src/app/entities/db/schema.ts drizzle/XXXX_*.sql
git commit -m "feat: add my_new_table to schema"
```

---

## 3. Коли код і БД розійшлись

### Сценарій А: Новий код, але старе БД

**Ознаки:**

- `npm run dev` падає з помилкою `relation "habit" does not exist`
- Або: `relation "habit_log" does not exist`
- Звичайно це сталось після `git pull` або на новій гілці

**Рішення (швидкий фіх):**

```bash
# 1. Перевір що мається в БД
psql $DATABASE_URL -c "
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
  ORDER BY table_name
"

# 2. Перевір що мається в коді
ls -la drizzle/*.sql

# 3. Порівняй — якісь міграції зі списку не застосовані?
# Тоді:
npx drizzle-kit migrate

# 4. Перевір що відбулось
psql $DATABASE_URL -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
```

Якщо помилка потрібна специфічна — перейди до розділу [Помилки drizzle-kit migrate](#4-помилки-drizzle-kit-migrate-та-їх-рішення).

### Сценарій Б: Залишились тестові дані, які не потрібні

```bash
# Безпечно видалити старі таблиці (якщо вони дійсно не потрібні):
psql $DATABASE_URL -c "
  DROP TABLE IF EXISTS habits CASCADE;
  DROP TABLE IF EXISTS habit_logs CASCADE;
"

# Потім миграція:
npx drizzle-kit migrate
```

---

## 4. Помилки drizzle-kit migrate та їх рішення

### Помилка: `type "habit_frequency" already exists`

**Що трапилось:**

- Enum-тип існує в БД (залишок від попередньої невдалої спроби)
- Але таблиця `habit`, яка використовує цей тип, ще не створена
- Міграція намагається створити тип ще раз → падає

**Рішення:**

```bash
# 1. Дізнайся які типи залишились
psql $DATABASE_URL -c "
  SELECT typname FROM pg_type
  WHERE typname IN ('habit_frequency','habit_status','habit_log_status','challenge_status','ai_chat_role')
"

# 2. Видали осиротілі типи
psql $DATABASE_URL -c "
  DROP TYPE IF EXISTS \"public\".\"habit_frequency\" CASCADE;
  DROP TYPE IF EXISTS \"public\".\"habit_status\" CASCADE;
  DROP TYPE IF EXISTS \"public\".\"habit_log_status\" CASCADE;
  DROP TYPE IF EXISTS \"public\".\"challenge_status\" CASCADE;
  DROP TYPE IF EXISTS \"public\".\"ai_chat_role\" CASCADE;
"

# 3. Спробуй миграцію ще раз
npx drizzle-kit migrate
```

> 🔴 **CASCADE** видалить типи та ВСЕ що їх використовує. Якщо в тобі є таблиці з цими типами — вони видалять. Коли це перший раз і типи справді осиротілі — це OK.

### Помилка: `relation "habit" already exists`

**Що трапилось:**

- Таблиця вже є в БД
- Але структура може відрізнятись від того, що очікує schema.ts

**Рішення (залежить від важливості даних):**

**Варіант 1: Якщо в таблиці тестові дані (видалити)**

```bash
psql $DATABASE_URL -c "DROP TABLE IF EXISTS habit CASCADE;"
npx drizzle-kit migrate
```

**Варіант 2: Якщо в таблиці важливі дані (ALTER відповідно)**

```bash
# Вручну виконай ALTER TABLE команди щоб привести структуру до нової
# Приклад:
psql $DATABASE_URL -c "
  ALTER TABLE habit ADD COLUMN target_count INTEGER DEFAULT 1 NOT NULL;
  ALTER TABLE habit ADD COLUMN target_unit TEXT DEFAULT 'times' NOT NULL;
  -- ... інші колони
"

# Потім миграцію можна пропустити, але перевір що schema.ts збігається з реальністю
```

### Помилка: `column does not exist`

**Що трапилось:**

- Код в `habit.api.ts` очікує поля, якого немає в таблиці
- Зазвичай після зміни schema.ts без застосування міграції

**Рішення:**

```bash
# 1. Перевір які колони в таблиці
psql $DATABASE_URL -c "
  SELECT column_name, data_type
  FROM information_schema.columns
  WHERE table_name = 'habit'
  ORDER BY ordinal_position
"

# 2. Порівняй з schema.ts:
grep -A 30 "export const habit" src/app/entities/db/schema.ts

# 3. Якщо schema.ts має нові колони, а таблиця ні:
npx drizzle-kit migrate
```

---

## 5. Workflow для CI/CD та Prod

### На Dev / Staging (автоматично)

```yaml
# .github/workflows/deploy-dev.yml (приклад)
name: Deploy Dev

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm ci

      - name: Run migrations
        env:
          DATABASE_URL: ${{ secrets.DEV_DATABASE_URL }}
        run: npx drizzle-kit migrate

      - name: Build
        run: npm run build

      - name: Deploy
        run: npm run deploy:dev
```

### На Prod (HAND-CRAFTED!)

```bash
# 1. BACKUP перед зміною!
pg_dump $PROD_DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql

# 2. Перевір что с новыми миграциями в dev
# (дуже важливо!)
psql $DEV_DATABASE_URL -c "
  SELECT id, hash, created_at
  FROM drizzle.__drizzle_migrations
  ORDER BY created_at DESC LIMIT 5
"

# 3. Застосуй на prod:
npx drizzle-kit migrate --database-url=$PROD_DATABASE_URL

# 4. Перевір що пройшло:
psql $PROD_DATABASE_URL -c "
  SELECT id, hash, created_at
  FROM drizzle.__drizzle_migrations
  ORDER BY created_at DESC LIMIT 5
"

# 5. Deploy коду (тільки після успішної міграції!)
git tag release/prod-v$(date +%Y%m%d-%H%M%S)
git push --tags
```

> ⚠️ **Ніколи не маш боту автоматично мігрувати prod!** Міграція — ручний процес з превенцією та беком.

---

## 6. Git pull / гілка — перший крок

### Коли клонуєш проєкт

```bash
# 1. Clone
git clone https://github.com/your/repo.git

# 2. Install deps
cd repo && npm install

# 3. Налаштуй .env.local (копіюй dari .env.example)
cp .env.example .env.local
# Потім редагуй .env.local та додай credentials

# 4. ⭐ ПЕРЕД запуском коду — миграція!
npx drizzle-kit migrate

# 5. Тепер можеш развивати
npm run dev
```

### Коли переходиш на іншу гілку

```bash
# 1. Проглянь які SQL-файли мають бути
git show origin/feature-branch:drizzle/meta/_journal.json | jq '.entries | length'

# 2. Checkout гілку
git checkout feature-branch

# 3. Pull deps (якщо змінилась schema)
npm install

# 4. ⭐ Застосуй міграції з цієї гілки
npx drizzle-kit migrate

# 5. Run
npm run dev
```

### Best Practice: Завжди перевіряй перед commit-ом

```bash
# Перед тим як git add drizzle/...
git status

# Перевір що файли мігеренованих правильні
ls -la drizzle/*.sql

# Переконайся що міграція застосована до БД
psql $DATABASE_URL -c "
  SELECT COUNT(*) FROM drizzle.__drizzle_migrations
"
```

---

## 7. Швидкі команди

### Перевірка синхронізації (one-liner)

```bash
echo "=== SCHEMA FILES ===" && ls drizzle/*.sql && \
echo -e "\n=== MIGRATIONS IN DB ===" && \
psql $DATABASE_URL -c "SELECT COUNT(*) FROM drizzle.__drizzle_migrations" && \
echo -e "\n=== TABLES IN DB ===" && \
psql $DATABASE_URL -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public'" && \
echo -e "\n=== EXPECTED TABLES ===" && \
grep "export const" src/app/entities/db/schema.ts | grep "pgTable" | wc -l
```

### Dry-run міграції (передбачити що буде)

```bash
npx drizzle-kit migrate --dry
# Це покаже SQL без застосування
```

### Видалити ВСЕ і почати заново (лише для dev!)

```bash
# ☠️ ЛИШЕ ДЛЯ DEVELOPMENT БД!

# 1. Видали БД
dropdb $DEV_DATABASE_NAME

# 2. Пересоздай
createdb $DEV_DATABASE_NAME

# 3. Застосуй міграції з нуля
npx drizzle-kit migrate

# 4. Перевір
psql $DATABASE_URL -c "SELECT COUNT(*) FROM drizzle.__drizzle_migrations"
```

### Перевір структуру таблиці

```bash
# Всі колони
psql $DATABASE_URL -c "
  SELECT column_name, data_type, is_nullable
  FROM information_schema.columns
  WHERE table_name = 'habit'
  ORDER BY ordinal_position
"

# Foreign keys
psql $DATABASE_URL -c "
  SELECT constraint_name, column_name, referenced_table_name
  FROM information_schema.key_column_usage
  WHERE table_name = 'habit'
"
```

### Безпечно видалити таблицю

```bash
# Перевір що дійсно не потрібна
psql $DATABASE_URL -c "SELECT COUNT(*) FROM old_table"

# Видали з CASCADE (видаліт й залежності)
psql $DATABASE_URL -c "DROP TABLE IF EXISTS old_table CASCADE"

# Перевір видалилась
psql $DATABASE_URL -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name"
```

---

## 📌 Чек-лист перед push

```markdown
- [ ] Змінив schema.ts? Тоді:
  - [ ] `npx drizzle-kit generate` — генерував міграцію
  - [ ] Переглянув згенерований SQL (ls drizzle/*.sql)
  - [ ] `npx drizzle-kit migrate` — застосував локально
  - [ ] Перевірив у БД (psql $DATABASE_URL)
  - [ ] Добавляю і schema.ts, і drizzle/XXXX_*.sql до commit-у

- [ ] Робив `git pull` чи `git checkout`?
  - [ ] `npm install` (на випадок зміни deps)
  - [ ] `npx drizzle-kit migrate` (синхронізація)
  - [ ] `npm run dev` запустився без помилок

- [ ] Писав код що звертається до БД?
  - [ ] Код очікує поля, які есть в schema.ts?
  - [ ] Типи match між `*.api.ts` та `schema.ts`?
  - [ ] Перевірив через real HTTP (не unit-тест)

- [ ] Готуюся до prod?
  - [ ] Робив BACKUP (pg_dump)
  - [ ] Тестував міграцію на staging
  - [ ] Все працює на dev перед push
```

---

## 🆘 Скорина допомога

| Проблема                   | Команда                                                              |
| -------------------------- | -------------------------------------------------------------------- |
| БД не синхронізована       | `npx drizzle-kit migrate`                                            |
| Не знаю які таблиці треба  | `psql $DATABASE_URL -c "\dt"`                                        |
| Не знаю які колони         | `psql $DATABASE_URL -c "\d habit"`                                   |
| Не знаю які міграції були  | `psql $DATABASE_URL -c "SELECT * FROM drizzle.__drizzle_migrations"` |
| Осиротілі enum-типи        | `DROP TYPE IF EXISTS "public"."habit_frequency" CASCADE`             |
| Таблиця старої версії      | `DROP TABLE IF EXISTS old_table CASCADE`                             |
| Все розвалилось            | `npx drizzle-kit drop` + `npx drizzle-kit migrate` (⚠️ лише dev!)    |
| Хочу dry-run перед migrate | `npx drizzle-kit migrate --dry`                                      |

---

## 📚 Посилання

- [Drizzle ORM Docs](https://orm.drizzle.team/docs/migrations)
- [PostgreSQL pg_type](https://www.postgresql.org/docs/current/catalog-pg-type.html)
- [Наш schema.ts](../entities/db/schema.ts)
- [Наші API функції](../entities/api/)

---

**Остання оновка:** 2026-07-11  
**Статус:** ✅ Актуальна схема (0003_habit_mvp_schema.sql)
