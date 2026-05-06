---
name: deep-research
description: Deep codebase research with architecture-aware analysis
context: fork
agent: Explore
---

## Input
Topic: $ARGUMENTS

---

## Workflow

1. Locate relevant code using:
   - Glob (structure search)
   - Grep (semantic search)

2. Identify:
   - involved layers (FSD)
   - data flow paths
   - dependencies between modules

3. Analyze:
   - architecture compliance
   - duplication of logic
   - API usage patterns

---

## Output format

### 1. Summary
What this topic is about in code terms

### 2. File map
List of relevant files with purpose

### 3. Architecture view
- affected layers
- dependency direction

### 4. Risks / issues
- violations
- duplication
- design problems

### 5. Recommendations
Concrete refactoring suggestions