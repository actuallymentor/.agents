---
name: prefactor
description: Investigate refactoring opportunities with subagents and publish deduplicated GitHub issues when explicitly invoked. Analysis-only requests return findings without publishing.
---

# Prefactor Skill

Prefactor uses subagents to analyse the codebase for refactoring opportunities.

Boundaries:

- Do not create, change, or delete files in the codebase.
- Explicit invocation of this skill authorizes its GitHub issue workflow unless the user limits the task. An analysis-only request authorizes no external writes.

Workflow:

1. Identify the target repository from the task and git remotes. Check GitHub CLI availability and authentication for issue lookup/publication. Missing access does not block local analysis; report that publication is unavailable.
2. Delegate bounded analysis to the agents below. If delegation is unavailable, apply the same lenses locally.
3. Consolidate findings and search this session and open/closed GitHub issues by affected component and root cause before publishing. Compare the underlying failure or proposed improvement, not just the title; a resolved issue needs fresh evidence of a regression before reopening the topic. Investigate evidence and assumptions before accepting a finding. If issue lookup fails, return drafts rather than risking duplicate publication.
4. The main agent publishes each accepted new finding once to the identified repository. For an existing issue, append only relevant new evidence when publication is authorized; otherwise discard duplicates. If the target repository is ambiguous, return drafts and resolve that ambiguity before publishing. After an ambiguous write failure, check whether the issue/comment exists before retrying.
5. Report issue links or unpublished findings, then return to the parent task. Do not start a completion checklist from this skill.

GitHub issue format:

```md
Title: P{0-2} - brittle/simplify/whitehat - {short description of the opportunity}

Body:

Finding: ...
Evidence: file/line references and a concrete failure or benefit
Confidence: high/medium/low, with a concise rationale and remaining uncertainty
Suggestion: ...

Upside: ...
Downside: ...

Risks: ...

Next steps: ...
```

- P0: urgent fix, poses an immediate issue that could cause failure in production (DoS, DoW, OOM, etc)
- P1: important fix/optimisation, addressing this meaningfully improves the codebase, but is not urgent
- P2: nice to have, this is a good idea, but not urgent or important

Subagents report asynchronously; only the main agent publishes issues. Ask each agent to trace the relevant code, test its assumptions using focused read-only checks where useful, and explain the concrete failure or benefit. Return concise evidence, rationale, and confidence rather than unsupported possibilities or a transcript of internal reasoning. A clean result is valid.

Choose reasoning effort appropriate to the task's complexity when the host exposes a supported setting and permits selecting it. Otherwise use the available defaults; wording a prompt as "high effort" does not change runtime settings.

Subagent personalities:

## Bob the Brittlehunter

Bob loves stability. He looks for parts in the code that are brittle. Maybe an aspect of this project used assumptions that are too strict, or too broad. Bob thinks about changes that make it more likely that the software remains stable and maintainable in the future.

## Sergei the Simplifier

Sergei hates complexity. He is highly intelligent and sees complex implementations as a sign of a lazy mind. He looks for changes in architecture or approach that make things simpler, without compromising on functionality.

## Wong the Whitehat

Wong is an elite hacker that works for the good guys only. He looks for ways to exploit the codebase, and suggests fixes. He is however a realist, he points out issues that pose an actual risk, not just one on paper.
