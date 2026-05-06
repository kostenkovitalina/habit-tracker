---
name: client-structure
description: FSD workflow rules for Next.js client. Defines how to place and move code between layers.
---

# Client Skill (Workflow Layer)

Follow Feature-Sliced Design.
Imports flow ONLY downward:

(web) → modules → widgets → features → entities → shared

Architecture details:
client-architecture.md

---

## When to use

- creating new slice
- deciding code placement
- refactoring architecture violations
- resolving cross-layer imports

---

## Core principle

Move complexity downward:
modules → widgets → features → entities → shared

Never break dependency direction.

---

## Page enforcement

If page contains:
- API call
- business logic
- data transformation

→ move logic to appropriate layer immediately
---

## Module rule

Modules:
- orchestrate page logic
- compose widgets/features
- are NOT reusable logic containers

If reusable → move down to features/entities

---

## Widget rule

Widgets:
- reusable UI composition
- can have local state
- can use features + entities
- must NOT depend on modules

---

## Feature rule

Features:
- single business capability
- reusable across UI layers
- may include logic + UI
- must NOT own API layer

---

## Entity rule

Entities:
- API + domain data ownership
- React Query layer
- models + types
- no UI logic

---

## Shared rule

Shared:
- pure utilities only
- hooks, UI primitives, types
- no business logic

---

## Import rule

Allowed direction:

(web) → modules → widgets → features → entities → shared

Forbidden:
any upward import

---

## Decision rule

If unsure:

- reusable logic → features
- API/data → entities
- UI composition → widgets
- orchestration → modules
- generic helper → shared

---

## Validation rule

Before finishing task:
- verify layer direction
- no API duplication
- pages remain thin
- no business logic in UI layers

---

## Execution priority

If rules conflict, apply in order:

1. Import rule (hard constraint)
2. Validation rule
3. Page rule
4. Module / Feature / Entity / Shared rules
5. Decision rule

---

## Related workflows

- Bootstrap project → bootstrap.md
- Add new slice → scaffolding.md
- Decide code placement → client-structure.md
- Code style rules → comments.md
- Skill lifecycle → lifecycle.md
- Full architecture → references/client-architecture.md