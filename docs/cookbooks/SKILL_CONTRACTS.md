# Skill Contracts

This repo treats `SKILL.md` as a control plane, not a cookbook.

## LOC contract

| LOC in `SKILL.md` | Status | Required action |
|---:|---|---|
| 1-200 | Pass | Normal review. |
| 201-299 | Warning | Human review and timestamped HITL acceptance required. |
| 300+ | Fail | Refactor before merge. No acceptance override. |

## Why this exists

Long skills increase drift, duplicate cookbook material, and make agents spend context on material that should be loaded only when needed.

The preferred pattern is:

```text
SKILL.md                # routing, mode, output shape, hard boundaries
references/ or docs/    # cookbook, examples, schemas, edge cases
scripts/                # deterministic checks
```

## Required HITL acceptance for 201-299 LOC

When a skill exceeds 200 LOC during creation or edit, the PR must include a file at:

```text
docs/skill-hitl-acceptance/<skill-name>.md
```

The acceptance file must document:

```yaml
skill: <skill-name>
accepted_by: <human reviewer>
accepted_at: YYYY-MM-DDTHH:MM:SS-04:00
decision: accepted
reason: <why this skill is allowed to exceed 200 LOC>
review_scope: <what was reviewed>
follow_up: <refactor plan or N/A>
```

## Refactor rule at 300 LOC

A `SKILL.md` at or above 300 LOC must be split before merge.

Acceptable refactor moves:

1. Move examples to `docs/` or `references/`.
2. Move schemas to `schemas/`.
3. Move deterministic checks to `scripts/`.
4. Split unrelated modes into separate skills.
5. Replace repeated prose with a short output contract.

## Review checklist

Before creating or editing a skill:

1. Keep the trigger and mode in frontmatter or the first section.
2. Keep `SKILL.md` focused on what must happen every invocation.
3. Move optional detail into a cookbook.
4. Add a deterministic check when a rule can be tested.
5. Run `npm run check-skill-contracts` before PR review.
