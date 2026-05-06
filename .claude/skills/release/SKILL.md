---
name: release
description: Strict release pipeline with state validation, versioning, and rollback safety
disable-model-invocation: true
---

## STATE MACHINE

Allowed flow (strict):

PRECHECK → QUALITY → VERSION → BUILD → TAG → DEPLOY → VERIFY

Skipping steps is forbidden.

---

## PRECHECK

- must be on main branch
- working tree must be clean
- pull latest changes

If fails → STOP

---

## QUALITY GATES

Run all:

yarn type-check
yarn format
yarn build

If any fails:
→ STOP
→ DO NOT proceed

---

## VERSION CONTROL

- determine version bump (patch/minor/major)
- update package.json
- ensure consistency

Rule:
version change is mandatory before release

---

## GIT STATE

- commit all changes
- create annotated tag

git commit -m "release"
git tag vX.X.X

---

## BUILD ARTIFACT VALIDATION

- verify build output exists
- verify no missing env vars
- verify no type errors

---

## DEPLOYMENT

yarn deploy

If deploy fails:
→ DO NOT tag as successful release

---

## VERIFICATION

- check production health endpoint
- confirm deployment version matches tag

---

## FAILURE POLICY

On ANY failure:
- stop immediately
- no partial release allowed
- manual intervention required