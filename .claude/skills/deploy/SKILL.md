---
name: deploy
description: Safe deployment pipeline with validation and verification
disable-model-invocation: true
---

Deploy application to production.

## Pre-checks

1. Ensure working tree is clean:
   git status must have no changes

2. Ensure correct branch:
   must be main or release branch

3. Run type check:
   yarn type-check

4. Run lint + format:
   yarn format

---

## Build

Run production build:

yarn build

Abort if build fails.

---

## Deploy

Run deployment:

yarn deploy

---

## Verification

1. Ensure deployment completed without errors
2. Verify app responds (health check or homepage)
3. Check logs if available

---

## Failure handling

If any step fails:
- STOP immediately
- DO NOT continue
- report failure clearly