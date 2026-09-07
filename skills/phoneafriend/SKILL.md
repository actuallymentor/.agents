---
name: phoneafriend
description: Get an independent CLI-based LLM review of a plan or task changes, assess findings, and repair substantive issues when implementation is authorized. Use for complex plans, post-commit reviews, or a requested second opinion.
---

# Phone a friend

Ask another LLM for a read-only review, then judge the feedback. Preserve the user's preference for simple solutions and decisive action: fix real bugs, intent gaps, and worthwhile simplifications; optional polish is not a reason to keep working.

## Scope and autonomy

- Accept a plan, task-owned uncommitted changes (including new files), or commits from this task. Use the explicit review range when provided. Stop only if no review target exists, not merely because there are no commits.
- Preserve unrelated changes and explicit review-only instructions. In YOLO mode, fix substantive findings within the authorized implementation scope without routine confirmation. Otherwise use existing authorization or present the worthwhile findings for selection.
- The reviewing agent must not edit, commit, publish, invoke another reviewer, or run completion workflows. Give it the actual task intent, target files/range, relevant constraints, and verification results. Local diffs and file contents are sufficient; a remote or PR is not required.
- When embedded in a parent task, return findings and any authorized corrections to its completion workflow. Never start a nested checklist or recursively invoke this skill.

## Choose and launch the reviewer

If you are Codex, ask Claude; if Claude, ask Codex; otherwise prefer Claude. Use the other agent's installed CLI. If it is unavailable or rate-limited, try an independent external session of the available coding agent. Report failure if neither can review; do not claim a completed review.

Inspect the installed CLI's supported models, effort levels, and session options. Respect an explicitly chosen model; otherwise choose its best available suitable model. Prefer high effort for substantive Claude reviews and higher supported effort for difficult Codex reviews. Do not guess flags or assume an old model/effort list is current.

Launch with read-only tools or sandbox controls where supported, plus explicit read-only instructions. Use a fresh, identifiable session and retain the returned session ID for follow-ups. Never use bare `--continue`, which may resume unrelated work. Use the CLI's explicit resume-by-ID mechanism, or start fresh with the exact review context if resume is unavailable.

Pass review text through stdin, a safely quoted argument, or a supported prompt file. Treat shell arguments as code: do not interpolate repository text into executable shell syntax. Capture the report and session identifier. Allow up to 30 minutes for a substantive review; poll while keeping the user informed rather than blocking updates. Stop earlier for an explicit error or demonstrable hang, not merely a quiet interval.

## Assess and act

Ask for evidence-backed findings: location, concrete failure or benefit, assumptions, confidence, and the simplest useful correction. Have the reviewer investigate uncertain assumptions instead of treating stylistic preferences as bugs. Request concise rationale, not a transcript of private reasoning.

Evaluate findings against the user's intent and code. Discard duplicates, unrelated issues, and complexity that buys little benefit. Report unsupported concerns as uncertain rather than automatically implementing them.

For accepted substantive findings, make a concise plan; use dedicated plan mode only when available. Apply authorized corrections, verify the affected behavior, and return to the parent workflow for the commit. A standalone invocation that makes edits hands off to the main task's single completion workflow.

## Follow-up boundary

The parent workflow owns post-commit reviews and permits one automatic corrective round from external feedback. Review corrective commits for those corrections and unresolved substantive findings, then report remaining suggestions without starting another automatic review-driven edit cycle. This limit does not stop repairs required by the original task or its verification. Do not reopen settled design choices or the entire project. Findings that are absent, repeated, out of scope, or optional polish never justify another edit cycle.
