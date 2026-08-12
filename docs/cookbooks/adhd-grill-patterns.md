# ADHD grill patterns

Use this cookbook with `/grill-adhd` when a plan needs pressure-testing without losing execution momentum.

## Core pattern

```text
Idea -> verdict -> drift risk -> mission impact -> proof gate -> next action
```

## Common traps

| Trap | Signal | Correction |
| --- | --- | --- |
| Novelty | New idea feels urgent because it is fresh | Park unless it unblocks current proof gate |
| Overbuild | Adds agents, gates, schemas, or dashboards before need is proven | Cut to one proof loop |
| Avoidance | Architecture expands when a hard next step is due | Name the avoided action first |
| Useful expansion | Valuable idea, wrong time | Send to Limbo with promotion criteria |
| Contradiction | Conflicts with current assumptions or acceptance criteria | Promote to decision record or ADR |
| Blocker | Must be resolved before execution | Attach to current plan |

## Grill verdicts

| Verdict | Meaning | Next step |
| --- | --- | --- |
| Keep | Good and aligned | Execute next proof gate |
| Cut | Low value or harmful | Record why and stop |
| Park | Useful later | Send to Limbo Intake |
| Promote | Too large for current lane | Draft Mission seed |
| Investigate | Unknown value | Create timeboxed research bead |

## Score bands

### Drift risk

- **Low** - supports current Mission without changing acceptance criteria.
- **Medium** - useful but adds sequencing risk.
- **High** - changes lane, authority, proof gates, or repo boundaries.

### Complexity score

- **1-3** - small and reversible.
- **4-6** - new files, new checks, or new process surface.
- **7-8** - new subsystem, schema, agent, or cross-repo dependency.
- **9-10** - changes authority, security, release, submission, or governance posture.

## Round template

```md
# Grill Round <n>

State: <repo / mission / bead> is <state>.
Decision so far: <one sentence>.

1. **<question title>** - <question>
   Recommended answer: <recommendation>

2. **<question title>** - <question>
   Recommended answer: <recommendation>

Next: answer Q1-Q<n>, or say `park all non-blockers`.
```

## Done criteria

A grill is done when the output identifies:

1. the current lane;
2. the next proof gate;
3. which ideas attach now;
4. which ideas enter Limbo;
5. what decision remains human-owned.
