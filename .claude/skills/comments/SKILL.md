# Comments

Short label-style `//` comments sit above named symbols and expand on the identifier in 1–5 words. Routes use `// VERB /path` shorthand. Methods inside a service/class get a single-verb label.

**Related:** [architecture/SKILL.md](architecture/SKILL.md) · [scaffolding.md](scaffolding.md) · [api-convention.md](api-convention.md)

---

## General Rules

**Syntax** — Use `//` line comments only. No JSDoc, no `/* */` blocks.

**Placement** — Place the comment above the symbol, never inline at the end of a line.

**Length** — Default length is 1–5 words. Use lowercase and avoid trailing punctuation for short labels.

**Spacing** — Maintain one blank line between the previous code block and the comment.

---

## What Earns a Comment

**API Routes** — Use HTTP shorthand: `// VERB /path`.

```ts
// GET /api/favorites
export async function GET(req: NextRequest) { ... }
```

**Top-level Exports** — Brief label of the purpose.

```ts
// register user
export const registerUser = async (...) => { ... }

// get by name
export const getByName = async (...) => { ... }
```

**Type Definitions** — Label the role of the symbol.

```ts
// interface
interface ILoginSuccess {
  token: string
}

// response schema
type TUserResponse = { ... }
```

**Service Methods** — Single-verb label of the operation.

```ts
// create
async create(data: TCreateInput) { ... }

// update
async update(id: string, data: TUpdateInput) { ... }

// delete
async delete(id: string) { ... }
```

**Structural Markers** — Identify sections or temporary logic.

```ts
// auth gate
if (!session) redirect('/login')

// render
return <Dashboard />
```

---

## Canonical Examples

```ts
// GET /api/favorites
export async function GET(req: NextRequest) {
  // ...
}

// interface
interface ILoginSuccess {
  token: string
}

// login user
export const loginUser = async (values: TLoginFormValues) => {
  // ...
}

// get full pokemon data
export const getFullPokemonData = async (id: string) => {
  // ...
}
```

---

## Anti-patterns

**Redundancy** — Do not write `// this function gets pokemon by name` above `getPokemonByName`. Use `// get by name`.

**JSDoc** — Do not use `@param` or `@returns`. The type system already provides this information.

**Implementation Prose** — Avoid long sentences explaining how the code works. If a paragraph is needed, the code likely needs a refactor.