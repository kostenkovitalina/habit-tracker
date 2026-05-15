**Back to:** [architecture/SKILL.md](../SKILL.md)
**See also:** [layers.md](layers.md) · [client-architecture.md](client-architecture.md) · [structure.md](structure.md)

---

## Import Rules

Each layer may only import from layers below it.

```ts
// ✅ allowed
// (web)     → modules, widgets, features, entities, shared, config, pkg
// modules   → widgets, features, entities, shared, config, pkg
// widgets   → features, entities, shared, config, pkg
// features  → entities, shared, config, pkg
// entities  → shared, config, pkg
// shared    → config, pkg
// config    → pkg
// pkg       → external packages only

// ❌ forbidden
// shared    → entities, features, widgets, modules, (web)
// entities  → features, widgets, modules, (web)
// features  → widgets, modules, (web)
// widgets   → modules, (web)
// modules   → (web)
// config    → any app layer
// pkg       → any app layer
```