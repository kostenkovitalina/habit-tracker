---
name: migrate-component
description: Migrate component between frameworks while preserving behavior and architecture constraints
disable-model-invocation: true
---

## Input
- Component: $ARGUMENTS[0]
- Source: $ARGUMENTS[1]
- Target: $ARGUMENTS[2]

---

## Workflow

1. Analyze current component structure
2. Identify responsibility layer:
   - UI → widgets
   - logic → features
   - data → entities
3. Map dependencies (API, hooks, state, side effects)
4. Convert to target framework
5. Ensure FSD compliance:
   - no upward imports
   - correct layer placement
6. Replace framework-specific APIs
7. Validate behavior equivalence
8. Run type-check + lint

---

## Constraints

- No logic leakage between layers
- No direct API calls outside entities
- Preserve external behavior only, not internal structure
- Keep component within correct FSD layer

---

## Done when

- component works in target framework
- no type errors
- no architecture violations
- behavior matches original (externally)