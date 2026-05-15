# Mode A — Bootstrap a New Client (Next.js)

Step-by-step setup for a clean FSD client. See [architecture/references/client-architecture.md](architecture/references/client-architecture.md) for layer rules.

**Related:** [architecture/SKILL.md](architecture/SKILL.md) · [scaffolding.md](scaffolding.md) · [architecture/references/structure.md](architecture/references/structure.md) · [architecture/references/naming.md](architecture/references/naming.md)

---

## 1. Project initialization

Create Next.js app with App Router, TypeScript strict mode, ESLint + Prettier.

---

## 2. Install core dependencies

- `@tanstack/react-query` — data fetching
- `zod` — validation (optional)
- `zustand` — state (optional)

---

## 3. Create base folder structure

```
src/
├── app/
│   ├── (web)/
│   ├── modules/
│   ├── widgets/
│   ├── features/
│   ├── entities/
│   └── shared/
└── config/
```

---

## 4. Setup config layer

```
config/
  env/
    env.client.ts
    env.server.ts
  styles/
    global.css
```

---

## 5. Setup data layer

```
entities/
  api/
  models/
```

Add React Query provider in `app/(web)/layout.tsx`.

---

## 6. Create first entity

```
entities/api/user/
  user.api.ts
  user.query.ts
  index.ts

entities/models/user.model.ts
```

---

## 7. Create first feature

```
features/auth/
  auth.component.tsx
  auth.service.ts
  index.ts
```

---

## 8. Create first module

```
modules/home/
  home.module.tsx
  index.ts
```

---

## 9. Wire first page

```
app/(web)/page.tsx → modules/home
```

---

## 10. Setup shared layer

```
shared/
  ui/
  hooks/
  utils/
  interfaces/
```

---

## Checklist

- [ ] FSD folder structure created
- [ ] React Query provider in layout
- [ ] first entity with query hook works
- [ ] first module renders on page
- [ ] no cross-layer violations