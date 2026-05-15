# client-architecture

**Back to:** [architecture/SKILL.md](../SKILL.md)
**See also:** [layers.md](layers.md) · [import-rules.md](import-rules.md) · [naming.md](naming.md) · [structure.md](structure.md) · [tests.md](tests.md)

---

## Layers

(web) → modules → widgets → features → entities → shared → config → pkg

- imports only downward
- no circular dependencies

---

## Core Responsibilities

- (web) — routing only
- modules — business orchestration
- widgets — reusable UI blocks
- features — small reusable logic
- entities — data + API
- shared — common utils

---

## Critical Rules

- keep pages thin
- no business logic in components
- entities own all data fetching
- server components by default
- no cross-layer imports

---

## Global Rules

- layers are strictly isolated — no upward imports
- each slice exposes public api via index.ts only
- circular dependencies are forbidden
- pages must remain thin — no business logic
- data fetching belongs to entities layer
- server components by default
- 'use client' only when required
- no `any` in public types

---

## Structure (minimal)

src/app/
- (web)/
- modules/
- widgets/
- features/
- entities/
- shared/

---

## Naming

- *.component.tsx
- *.service.ts
- *.query.ts
- *.mutation.ts
- *.model.ts
- *.hook.ts
- *.constant.ts
- *.store.ts
- *.interface.ts 
- *.api.ts

---

## Special Folders

**elements/** — child components inside a slice

**pages/** — Next.js pages (can only import from modules or up)

**styles/** — global, shared, or scoped styles

