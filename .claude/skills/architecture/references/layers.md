**Back to:** [architecture/SKILL.md](../SKILL.md)
**See also:** [client-architecture.md](client-architecture.md) · [import-rules.md](import-rules.md) · [structure.md](structure.md) · [naming.md](naming.md)

---

## Layers

**`(web)`** — Next.js routing. Pages, layouts, error boundaries, loading states, API route handlers. Keep pages thin — no business logic.

**`modules`** — Core business logic. Complex page sections that orchestrate multiple widgets and features. Files: `.module.tsx`, `.service.ts`, `.store.ts`, `.interface.ts`, `elements/`.

**`widgets`** — Self-sufficient UI blocks. Reusable across pages, can carry internal logic and state. Files: `.component.tsx`, `.service.ts`, `.store.ts`, `elements/`.

**`features`** — Small reusable implementations. Single-purpose components, feature flags, simple hooks. Files: `.component.tsx`, `.service.ts`, `.interface.ts`.

**`entities`** — Business data layer. API clients, React Query hooks, data models, type definitions. Files: `*.api.ts`, `*.query.ts`, `*.mutation.ts`, `*.model.ts`.

**`shared`** — Common utilities. Reusable UI components, hooks, global stores, assets, shared types.

**`config`** — App-wide configuration. Environment variables, fonts, global CSS.

**`pkg`** — External integrations. Third-party utilities, custom packages. Imports no app layers.

Three-dimensional structure: **layers** → **slices** → **segments**.

| Layer | Slices | Segments |
|---|---|---|
| `(web)` | — | + |
| `modules` | + | + |
| `widgets` | + | + |
| `features` | + | + |
| `entities` | + | + |
| `shared` | — | + |
| `config` | — | + |
| `pkg` | — | + |
