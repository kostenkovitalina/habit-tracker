---
name: fix-issue
description: Fix GitHub issue using project architecture rules
disable-model-invocation: true
---

## Input
GitHub issue: $ARGUMENTS

## Workflow

1. Fetch issue context
2. Identify affected layers (FSD rules apply)
3. Locate correct code layer:
   - UI → widgets
   - logic → features
   - data → entities
4. Implement fix following architecture rules
5. Ensure no upward imports
6. Add/update tests (unit or integration depending on layer)
7. Run type-check + format
8. Commit changes

## Constraints

- No cross-layer violations
- No direct API calls outside entities
- Pages must remain thin
- No duplicated logic

## Done when

- issue requirements satisfied
- no lint/type errors
- tests pass