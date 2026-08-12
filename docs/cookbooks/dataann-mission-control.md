# DataAnn mission control

Use this cookbook when skills are being applied to DataAnn, CAT, ANNA, or repos that use Missions, Beads, PDRs, ADRs, and proof gates.

## Operating model

```text
Mission -> Beads -> proof gates -> review -> merge/park -> retro
```

## Active lane markers

Always identify the lane before making a recommendation:

- **Repo** - DataAnn, ANNA, CAT, i-have-adhd, skills_Mpocock, or other.
- **Mission** - `MP-*` when known.
- **Bead** - `BEAD-*` when known.
- **State** - planning, building, validating, blocked, parked, merged, or retro.

## Current-lane response

```md
State: <repo> / <mission> / <bead> is <state>.

Decision: <what should happen now>.

1. <next bounded action>
2. <proof gate>

Drift check: <low | medium | high> - <reason>.
```

## Proof gate examples

| Work type | Proof gate |
| --- | --- |
| Skill text | read skill, verify trigger, run installer or validation if available |
| Repo docs | diff check, markdown lint if present, review packet |
| DataAnn code | `python tools/ci_gate.py --tier push` |
| DataAnn PR | `python tools/ci_gate.py --tier pr` plus review thread gate |
| ANNA boundary | `python tools/anna_public_boundary.py --check` and `python -m pytest -q` |
| Limbo intake | entry exists in `docs/limbo/` or mission `LIMBO.md` |

## Mission mutation rule

A Mission Packet changes only when one of these is true:

1. The idea directly unblocks a proof gate.
2. The idea corrects an incorrect assumption.
3. The idea changes acceptance criteria and the user approves the change.
4. The idea is promoted into a separate Mission.

Otherwise, park it in Limbo.

## Reviewability rule

Every output should be easy for three audiences:

- **User** - can see the decision and next action.
- **Agent** - can see files, commands, constraints, and proof gates.
- **Machine** - can parse status, classification, IDs, and outcomes.
