---
name: limbo-intake
description: Capture new ideas, suggestions, contradictions, enhancements, and mid-mission scope changes without derailing active work. Use when the user introduces a new idea during a Mission, Bead, repo review, implementation plan, submission packet, or architecture discussion and it may need to be parked, attached, promoted, rejected, or later triaged.
---

# limbo-intake

Capture inputs without changing the active plan. Limbo is a holding system for ideas that might matter later but should not hijack the current Mission, Bead, or proof gate.

## Core rule

```text
New idea != new direction.
New idea -> classify -> capture -> triage -> promote only when approved.
```

## Classify first

Classify every intake item before recommending action:

| Class | Meaning | Action |
| --- | --- | --- |
| Attach | Directly unblocks the current Mission or proof gate | Add to active plan |
| Park | Useful but not needed now | Add to Limbo |
| Promote | Large enough for its own Mission Packet | Draft mission seed |
| Reject | Not worth the added cost or risk | Record rejection reason |
| Investigate | Value is unclear | Create a timeboxed research bead |

## Required output

When the harness cannot write files, output this block for copy/paste:

```yaml
id: LIMBO-YYYY-MM-DD-###
created_at: YYYY-MM-DD
source_repo: DataAnn | ANNA | CAT | i-have-adhd | skills_Mpocock | other
source_context: short context
related_mission: MP-UNKNOWN
related_bead: BEAD-UNKNOWN
classification: attach | park | promote | reject | investigate
drift_risk: low | medium | high
complexity_risk: low | medium | high
summary: one sentence
why_it_matters: one short paragraph
promotion_criteria:
  - concrete condition
recommended_next_action: one action
status: open
```

## File placement

Prefer these locations when the agent can write to the repo:

```text
docs/limbo/LIMBO_INDEX.md
docs/limbo/LIMBO_INDEX.jsonl
docs/limbo/intake/YYYY-MM/LIMBO-YYYY-MM-DD-###.md
```

For Mission-specific work, also link the item from:

```text
docs/missions/<mission-id>/LIMBO.md
```

Do not create the Mission-specific file if the mission is unknown. Use the global Limbo path first.

## Intake template

```md
# LIMBO-YYYY-MM-DD-### - <short title>

```yaml
id: LIMBO-YYYY-MM-DD-###
created_at: YYYY-MM-DD
source_repo: <repo>
source_context: <context>
related_mission: <mission or MP-UNKNOWN>
related_bead: <bead or BEAD-UNKNOWN>
classification: <attach | park | promote | reject | investigate>
drift_risk: <low | medium | high>
complexity_risk: <low | medium | high>
status: open
```

## Summary

<one sentence>

## Why it matters

<one short paragraph>

## Promotion criteria

- <criterion>

## Recommended next action

<one action>
```

## Machine-readable index line

Append one JSONL object to `docs/limbo/LIMBO_INDEX.jsonl` when possible:

```json
{"id":"LIMBO-YYYY-MM-DD-###","created_at":"YYYY-MM-DD","source_repo":"DataAnn","related_mission":"MP-UNKNOWN","related_bead":"BEAD-UNKNOWN","classification":"park","drift_risk":"medium","complexity_risk":"medium","status":"open","summary":"..."}
```

## Promotion rules

Promote from Limbo only when:

1. the idea has an owner;
2. the proof gate is known;
3. it changes acceptance criteria or unblocks a Mission;
4. it can be expressed as a Bead or Mission seed;
5. the user approves promotion.

## Final response shape

After capturing an item, respond with:

```md
Captured: <id>.
Classification: <Attach | Park | Promote | Reject | Investigate>.
Drift check: <low | medium | high> - <reason>.
Next: <return to active mission action or review the limbo item>.
```

Do not continue brainstorming unless the user explicitly asks for more intake.
