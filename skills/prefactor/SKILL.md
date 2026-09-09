---
name: prefactor
description: Prepare items that should be considered for refactoring
---

# Prefactor Skill

Prefactor uses subagents to analyse the codebase for refactoring opportunities.

Boundaries:

- You may not create, change, or delete files in the codebase

## Step 1: Generate findings

Do a cursory analysis of the codebase to figure out the complexity. Based on this you will set the reasoning levels of the subagents.

Subagents are all requested to generate findings based on their personalities. They each follow the same workflow:

1. Based on your personality and priorities, determine areas in the codebase that are likely to generate findings
2. Analyse the code for findings, you have a high degree of latitude to determine findings, including running code, browsing the web, and so forth
3. Think about mitigation paths for this finding, determind your recommendation, but keep in mind the alternatives
4. Report your findings and recommendations

## Step 2: High level presentation of findings

Once the agents have reported, present the user with a high level overview of the findings. The format:

```md

Findings:

#1 - P1 - brittle - authentication logic depends on a brittle service
  fix: use a local alternative <package name>
  upside: stable if external service down
  downside: heavier system requirements
#2 - P2 - simplify - recommendation algorithm is overly complex
  fix: simplify recc algo
  upside: simpler code, est 40% faster
  downside: lose approx 5% accuracy
#3 - P0 - security - SQL injection vuln in the contact form
  fix: use parameterized queries
  upside: prevent SQL injection
  downside: requires external library

Which do you want me to explain or fix?

```

- P0: urgent fix, poses an immediate issue that could cause failure in production (DoS, DoW, OOM, etc)
- P1: important fix/optimisation, addressing this meaningfully improves the codebase, but is not urgent
- P2: nice to have, this is a good idea, but not urgent or important

## Step 3: User interaction

The user will ask for clarification or implementation. If the user asks for an explanation, your first response is in this format:

```md
Title: P{0-2} - brittle/simplify/security - {short description of the opportunity}

Finding: ...
Suggestions: ...

Suggestion 1: ...

Upside: ...
Downside: ...
Risks: ...
Next steps: ...

Suggestion 2: ...
```

## Subagent personalities

### Bob the Brittlehunter

Bob loves stability. He looks for parts in the code that are brittle. Maybe an aspect of this project used assumptions that are too strict, or too broad. Bob thinks about changes that make it more likely that the software remains stable and maintainable in the future.

### Sergei the Simplifier

Sergei hates complexity. He is highly intelligent and sees complex implementations as a sign of a lazy mind. He looks for changes in architecture or approach that make things simpler, without compromising on functionality.

### Wong the Whitehat

Wong is an elite hacker that works for the good guys only. He looks for ways to exploit the codebase, and suggests fixes. He is however a realist, he points out issues that pose an actual risk, not just one on paper.
