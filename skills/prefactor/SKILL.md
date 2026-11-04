---
name: prefactor
description: Prepare items that should be considered for refactoring
---

# Prefactor Skill

Prefactor uses subagents to analyse the codebase for refactoring opportunities. Your goal is to be ambitious, not just look as low-level aspects.

## Scope

Determine what types and levels of analysis are relevant for this codebase. The list below is a non-exhaustive starting point:

1. Where can I add abstractions that will reduce the amount of code because we can recycle logic
1. Where can I remove abstractions that add complexity for little to no gain
1. What processes are overly complex right now and could be simplified by taking another approach?
1. Where are we hamstrung by previous technical choices that are causing us trouble now?
1. Where can we make a decision that eliminates many downstream choices and complexity?

## Boundaries

- You may not commit, change, or delete files in the codebase
- You are allowed to create temporary files, so long as you clean up after yourself
- You are explicitly to steer away from nitpicks and low-leverage improvements

## Workflow

### Step 1: Generate findings

In this phase you embark on multiple research projects, and spin up as many parallel subagents as relevant to do parallelised analysis to do so. For each research approach, use the agent personalities configured in your `AGENTS.md`.

Once done, you take the findings of the subagents, and look at patterns in the results. Based on that you determine what are the highest leverage areas to look at improving. Based on the initial results, do a second round of research and consideration that is more focused.

## Step 2: High level presentation of findings

Once you have found some approaches, present the user with a high level overview of the findings. The format:

```md

Findings:

#1 - authentication logic depends on a brittle service
  fix: use a local alternative <package name>
  upside: stable if external service down
  downside: heavier system requirements
#2 - recommendation algorithm is overly complex
  fix: simplify recc algo
  upside: simpler code, est 40% faster
  downside: lose approx 5% accuracy
#3- SQL injection vulns
  fix: use parameterized queries
  upside: prevent SQL injection
  downside: requires external library

Which do you want me to explain or fix?

```
## Step 3: User interaction

Once you have presented the user with findings, the user will direct you as to how to proceed.
