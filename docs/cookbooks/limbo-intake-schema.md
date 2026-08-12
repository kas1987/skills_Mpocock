# Limbo intake schema

Limbo is the parking lot for useful inputs that should not immediately mutate the active Mission, Bead, repo plan, or proof gate.

## Directory layout

```text
docs/
  limbo/
    LIMBO_INDEX.md
    LIMBO_INDEX.jsonl
    intake/
      YYYY-MM/
        LIMBO-YYYY-MM-DD-###.md
    promoted/
    rejected/
    deferred/
```

Mission-specific work may also keep a pointer file:

```text
docs/missions/<mission-id>/LIMBO.md
```

## YAML fields

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Stable item ID, `LIMBO-YYYY-MM-DD-###` |
| `created_at` | yes | ISO date |
| `source_repo` | yes | Repo or workspace where the idea appeared |
| `source_context` | yes | Short origin context |
| `related_mission` | yes | `MP-*` or `MP-UNKNOWN` |
| `related_bead` | yes | `BEAD-*` or `BEAD-UNKNOWN` |
| `classification` | yes | attach, park, promote, reject, investigate |
| `drift_risk` | yes | low, medium, high |
| `complexity_risk` | yes | low, medium, high |
| `summary` | yes | One sentence |
| `why_it_matters` | yes | One short paragraph |
| `promotion_criteria` | yes | Concrete conditions for promotion |
| `recommended_next_action` | yes | One action |
| `status` | yes | open, promoted, rejected, deferred, attached |

## Markdown template

```md
# LIMBO-YYYY-MM-DD-### - <short title>

```yaml
id: LIMBO-YYYY-MM-DD-###
created_at: YYYY-MM-DD
source_repo: <repo>
source_context: <context>
related_mission: MP-UNKNOWN
related_bead: BEAD-UNKNOWN
classification: park
drift_risk: medium
complexity_risk: medium
summary: <one sentence>
why_it_matters: <one short paragraph>
promotion_criteria:
  - <criterion>
recommended_next_action: <one action>
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

## JSONL index object

```json
{"id":"LIMBO-YYYY-MM-DD-###","created_at":"YYYY-MM-DD","source_repo":"DataAnn","source_context":"...","related_mission":"MP-UNKNOWN","related_bead":"BEAD-UNKNOWN","classification":"park","drift_risk":"medium","complexity_risk":"medium","status":"open","summary":"..."}
```

## Triage cadence

Review Limbo entries at these moments:

1. before creating a new Mission Packet;
2. before closing a major PR or packet;
3. during weekly retros;
4. when a parked idea becomes a blocker;
5. when the user explicitly asks to promote deferred ideas.

## Promotion outcome

When an entry is promoted, update status and move or copy it into the relevant destination:

- `promoted/` when it becomes a Mission or Bead;
- `rejected/` when intentionally discarded;
- `deferred/` when still useful but not scheduled;
- linked mission `LIMBO.md` when attached to a known Mission.
