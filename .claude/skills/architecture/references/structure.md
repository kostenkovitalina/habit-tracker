**Back to:** [architecture/SKILL.md](../SKILL.md)
**See also:** [layers.md](layers.md) · [naming.md](naming.md) · [import-rules.md](import-rules.md)

---

## Project Structure

```
src/
├── app/
│   ├── (web)/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx                           # optional
│   │   ├── error.tsx                               # optional
│   │   ├── loading.tsx                             # optional
│   │   └── page-name/
│   │       ├── page.tsx
│   │       ├── layout.tsx                          # optional
│   │       └── loading.tsx                         # optional
│   ├── (api)/
│   │   └── api/
│   │       └── [...route]/
│   │           └── route.ts
│   ├── modules/
│   │   └── module-name/
│   │       ├── elements/                           # optional
│   │       │   ├── element-name/
│   │       │   │   ├── element-name.component.tsx
│   │       │   │   └── index.ts
│   │       │   └── index.ts
│   │       ├── module-name.module.tsx
│   │       ├── module-name.service.ts              # optional
│   │       ├── module-name.store.ts                # optional
│   │       ├── module-name.constant.ts             # optional
│   │       ├── module-name.interface.ts            # optional
│   │       └── index.ts
│   ├── widgets/
│   │   └── widget-name/
│   │       ├── elements/                           # optional
│   │       │   ├── element-name/
│   │       │   │   ├── element-name.component.tsx
│   │       │   │   └── index.ts
│   │       │   └── index.ts
│   │       ├── widget-name.component.tsx
│   │       ├── widget-name.service.ts              # optional
│   │       ├── widget-name.store.ts                # optional
│   │       ├── widget-name.constant.ts             # optional
│   │       ├── widget-name.interface.ts            # optional
│   │       └── index.ts
│   ├── features/
│   │   └── feature-name/
│   │       ├── feature-name.component.tsx
│   │       ├── feature-name.service.ts             # optional
│   │       ├── feature-name.constant.ts            # optional
│   │       ├── feature-name.interface.ts           # optional
│   │       └── index.ts
│   ├── entities/
│   │   ├── api/
│   │   │   ├── api-name/
│   │   │   │   ├── api-name.api.ts
│   │   │   │   ├── api-name.query.ts
│   │   │   │   ├── api-name.mutation.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── models/
│   │       ├── model-name.model.ts
│   │       └── index.ts
│   └── shared/
│       ├── ui/
│       │   ├── ui-name/
│       │   │   ├── ui-name.component.tsx
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── hooks/
│       │   ├── hook-name.hook.tsx
│       │   └── index.ts
│       ├── store/
│       │   ├── store-name.store.ts
│       │   └── index.ts
│       ├── interfaces/
│       │   ├── interface-name.interface.ts
│       │   └── index.ts
│       └── assets/
│           ├── icon/
│           │   ├── logo.svg
│           │   └── index.ts
│           └── index.ts
├── config/
│   ├── env/
│   │   ├── env.client.ts
│   │   ├── env.server.ts
│   │   └── index.ts
│   ├── fonts/
│   │   ├── font.ts
│   │   └── index.ts
│   └── styles/
│       └── global.css
└── pkg/
    └── index.ts
```