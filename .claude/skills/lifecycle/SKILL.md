## Skill lifecycle rule

**Related:** [architecture/SKILL.md](architecture/SKILL.md) · [client-structure.md](client-structure.md)

---

This skill is persistent within a session.

All rules defined here are treated as ongoing constraints, not one-time instructions.

The model must:
- follow these rules throughout the entire task
- not re-evaluate applicability per step
- prioritize this skill over ad-hoc reasoning when applicable

If the skill stops affecting behavior:
- treat it as context drift
- re-trigger the skill manually via invocation