---
name: grill-adhd
description: A deep pressure-test for plans, repo changes, Missions, Beads, architecture, and implementation direction. Use when the user asks to grill, pressure-test, audit, go deeper, challenge the plan, check drift, or align an idea with ADHD-friendly action and review discipline.
disable-model-invocation: true
---

# grill-adhd

Run a grilling session shaped for a high-velocity ADHD systems thinker. The goal is not more analysis. The goal is sharper direction, lower drift, and a plan that users, agents, and machines can review.

Use `/grilling` as the interview primitive, but keep the output bounded by the structure below.

## First response

Start with a short grill verdict before asking questions:

```md
# Grill Verdict

Decision: <keep | cut | park | promote | investigate>.
Drift risk: <low | medium | high> - <novelty | overbuild | avoidance | useful expansion | contradiction | blocker>.
Next action: <one concrete action under 10 minutes>.
```

Then ask the current frontier questions. Ask only questions that can be answered now without depending on unsettled prerequisites.

## ADHD direction rules

1. Keep the active lane visible: repo, Mission, Bead, or decision.
2. Rank the options. Never present a flat cloud of possibilities.
3. Classify every new idea as Attach, Park, Promote, Reject, or Investigate.
4. Name the ADHD trap when present: novelty, overbuild, avoidance, useful expansion, contradiction, or blocker.
5. End each round with one next action or one answer request.

## Grill dimensions

Pressure-test every serious plan across these dimensions:

| Dimension | Question |
| --- | --- |
| Mission alignment | Does this unblock the current Mission or change it? |
| Acceptance criteria | Does this change what done means? |
| Complexity | What new surface area does this add? |
| Authority | Does this require a new agent, MCP, permission, or write path? |
| Evidence | What proof gate validates it? |
| Reviewability | Can a user, agent, and machine inspect it cleanly? |

## Output block for each idea

```md
## Idea: <short name>

Verdict: <Attach | Park | Promote | Reject | Investigate>.
Drift risk: <low | medium | high> - <reason>.
Complexity score: <1-10>.
Mission impact: <none | supports | changes | blocks>.
Proof gate: <command, file, PR, check, or unknown>.

Best argument for it:
- <one bullet>

Best argument against it:
- <one bullet>

Action:
1. <next step>
```

## When to stop grilling

Stop when one of these is true:

- the frontier is empty;
- the next action is obvious and under 10 minutes;
- the idea must go to Limbo Intake;
- a human decision is required;
- a proof gate must run before more analysis is useful.

Do not implement during the grill. The output is a decision-quality map, not an execution pass.
