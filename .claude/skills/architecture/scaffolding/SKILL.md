# Mode B — Add a Slice (Client)

Pick the layer (top-down): `(web)` → `modules` → `widgets` → `features` → `entities` → `shared`.

Pull complexity down — reusable logic → `features`, shared types → `entities/models` or `shared/interfaces`.

**Related:** [architecture/SKILL.md](architecture/SKILL.md) · [bootstrap.md](bootstrap.md) · [client-structure.md](client-structure.md) · [architecture/references/layers.md](architecture/references/layers.md) · [architecture/references/naming.md](architecture/references/naming.md) · [architecture/references/import-rules.md](architecture/references/import-rules.md)

---

## B1. New module

1. Create:

```
src/app/modules/<module>/
  <module>.module.tsx
  <module>.service.ts
  index.ts
```

2. Use `widgets` for UI composition, `features` for reusable logic, `entities` for data.

3. Page-level orchestration only.

---

## B2. New widget

1. Create:

```
src/app/widgets/<widget>/
  <widget>.component.tsx
  <widget>.service.ts   # optional
  index.ts
```

2. Reusable UI block, may contain local state, can use `features` + `entities`, must not depend on `modules`.

---

## B3. New feature

1. Create:

```
src/app/features/<feature>/
  <feature>.component.tsx
  <feature>.service.ts    # optional
  <feature>.interface.ts  # optional
  index.ts
```

2. Single responsibility, reusable across widgets and modules, may include logic + UI.

---

## B4. New entity

1. Create API layer:

```
src/app/entities/api/<entity>/
  <entity>.api.ts
  <entity>.query.ts
  <entity>.mutation.ts
  index.ts
```

2. Create model:

```
src/app/entities/models/<entity>.model.ts
```

3. Owns API access layer and domain model. No UI.

---

## B5. New shared unit

1. Place in:

```
shared/
  ui/          ← reusable components
  hooks/       ← custom hooks
  utils/       ← pure functions
  interfaces/  ← shared types
  store/       ← global state
```

2. No business logic, reusable across all layers.

---

## B6. Page wiring

```
page.tsx → module → widgets/features → entities
```

No data fetching directly in `page.tsx`. Delegate to server components or modules.

---

## B7. Data fetching

Use React Query in `entities`, hooks in `features` / `widgets`. Never duplicate API calls.

---

## B8. Environment

Separate `env.client.ts` / `env.server.ts` in config layer. No direct `process.env` outside config.