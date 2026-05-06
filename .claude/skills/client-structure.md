# Client Structure (Decision Layer)

Defines runtime rules for code placement and refactoring decisions in a Feature-Sliced Design client.

This file is used by AI to decide WHERE code should live and HOW to resolve architecture violations.

It does NOT define architecture — only decision logic over it.

---

## Rule priority

If rules conflict, apply in order:

1. Forbidden patterns (highest priority)
2. Data flow rule
3. Ownership rule
4. Decision tree
5. Refactor trigger
6. Server/client rule (lowest priority)

---

## Execution rule

Always apply rules in this order:
1. Forbidden patterns
2. Ownership rule
3. Data flow rule
4. Decision tree
5. Refactor trigger

---
## Violation handling

If upward import is detected:

1. Identify source layer
2. Move logic DOWN to correct layer
3. If reusable → features
4. If data → entities
5. If UI → widgets
6. Refactor imports immediately

---

## Ownership rule

Defines responsibility boundaries:

- modules = orchestration boundary
- widgets = UI boundary
- features = logic boundary
- entities = data boundary
- shared = utility boundary

---

## Forbidden patterns

- API calls in widgets
- business logic in pages
- reusable logic in modules
- UI inside entities
- cross-layer imports

---

## Data flow rule

Primary source of data = entities

features/widgets:
- may consume entities
- must not duplicate API calls

modules:
- only compose data flows

---

## Code placement decision tree

Ask in order:

1. Is it UI? → widgets
2. Is it reusable logic? → features
3. Is it API/data? → entities
4. Is it page orchestration? → modules
5. Is it generic helper? → shared


---

## Rendering rule

- default: server components
- client only when required:
  - state
  - effects
  - browser APIs

---

## Refactor trigger

If logic appears in 2+ places:

→ move to features or entities immediately

---