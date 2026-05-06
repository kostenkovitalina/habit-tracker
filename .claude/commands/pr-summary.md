---
name: pr-summary
description: Analyze and summarize pull request changes with architecture awareness
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Input data

- Diff: !`gh pr diff`
- Files: !`gh pr diff --name-only`
- Comments: !`gh pr view --comments`

---

## Task

Analyze this PR and produce structured summary.

---

## Output format

### 1. Summary
Short description of what changed

### 2. Affected layers
- (web)
- modules
- widgets
- features
- entities
- shared

### 3. Type of change
- feature / refactor / bugfix / migration

### 4. Architecture impact
- any upward imports (yes/no)
- violations detected (list)

### 5. Risk level
- low / medium / high

### 6. Notes
Important technical observations

---

## Rules

- Focus on architecture impact first
- Detect layer violations
- Highlight data flow changes
- Do not include irrelevant diff noise