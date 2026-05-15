---
name: api-conventions
description: Strict API rules including HTTP client usage, response contracts, and entity-level data access
---

**Related:** [architecture/SKILL.md](architecture/SKILL.md) · [scaffolding.md](scaffolding.md) · [architecture/references/layers.md](architecture/references/layers.md) · [architecture/references/import-rules.md](architecture/references/import-rules.md)

## HTTP client (critical)

- Use ky for ALL HTTP requests
- Do NOT use fetch or axios directly
- Base client MUST be defined once in pkg/rest-api

Example:

const api = ky.create({
  prefixUrl: envClient.NEXT_PUBLIC_CLIENT_API_URL,
  credentials: 'include'
})

---

## Client usage rule

- Never call ky directly in components, features, or widgets
- All HTTP calls must go through entities layer

Forbidden:
- ky(...) inside component
- fetch(...)
- axios(...)

---

## Entity API layer

Each entity owns its API access.

Structure:

entities/api/<entity>/
  <entity>.api.ts
  <entity>.query.ts
  <entity>.mutation.ts
  index.ts

---

## Local fetcher rule (IMPORTANT)

If entity requires custom configuration:

- create local fetcher NEXT TO api file
- extend base ky instance
- do NOT create standalone ky from scratch

Example:

// users.fetcher.ts
import { api } from '@/pkg/rest-api'

export const usersApi = api.extend({
  prefixUrl: 'users'
})

Usage:

// users.api.ts
import { usersApi } from './users.fetcher'

export const getUsers = () =>
  usersApi.get('').json<IUser[]>()

---

## Endpoint design

- Use REST naming: /resource, /resource/:id
- Use plural nouns
- No verbs in paths

---

## HTTP methods

- GET → read
- POST → create
- PATCH → partial update
- PUT → full update
- DELETE → remove

---

## Response contract (strict)

Success:

{
  data: T
}

Error:

{
  error: {
    code: string
    message: string
  }
}

---

## Status codes

- 200 → success
- 201 → created
- 204 → no content
- 400 → validation error
- 401 → unauthorized
- 403 → forbidden
- 404 → not found
- 500 → internal error

---

## Validation

- Validate ALL input using zod
- Reject invalid payloads with 400
- Never trust client input

---

## Architecture rule (FSD)

- API calls → entities ONLY
- features/widgets consume hooks only
- modules orchestrate

---

## Forbidden patterns

- API calls in widgets
- API calls in features (raw)
- ky usage outside entities
- multiple ky instances without base extension

---

## Decision rule

If you need API call:

1. Create entity API
2. (optional) create local fetcher via api.extend
3. expose via query/mutation hook
4. consume in feature/widget

## Caching strategy

- Do NOT use global staleTime for all queries
- Define caching per entity based on data volatility

Types:

- static → staleTime: Infinity
- semi-dynamic → 5–15 min
- dynamic → no cache or polling
- user-mutated → manual invalidation only

Mutations MUST invalidate related queries