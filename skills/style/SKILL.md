---
name: style
description: Review task changes against project coding conventions and apply warranted refinements when implementation is authorized. Use for style reviews and the completion checklist, not functional bug reviews.
---

# Code Style Review

Check readability, simplicity, and consistency within the current task's changes. Prefer existing project conventions unless the user specifies otherwise.

## Scope and autonomy

- Explicit review-only requests prohibit edits, including in YOLO mode.
- Check `AGENT_AUTONOMY_MODE` case-insensitively. In YOLO or an authorized autonomous implementation task, analyze the scoped changes and apply warranted refinements without confirmations. Autonomy never skips analysis or expands the task.
- When invoked by a parent workflow, return results to it. A clean review ends this skill, not the task. Do not restart the completion checklist, commit independently, or invoke this skill recursively.

## Gather conventions and changes

Read applicable `AGENTS.md`, agent-specific instruction files such as `CLAUDE.md`, and relevant language preferences. Existing project rules and surrounding code take precedence over general preferences unless otherwise specified. If no instruction file exists, use the project's established conventions; do not invent a new style.

Use the task's starting worktree state, files, and commit range to identify changes. Inspect staged and unstaged diffs and task-owned untracked files, respecting ignore rules. Do not select commits by a time window or sweep in unrelated changes from the same file.

If the baseline is unavailable, use an explicitly requested diff or PR range. For an ambiguous recent-work review, choose and state a defensible read-only scope from repository context. Preserve pre-existing changes and do not modify work whose ownership is uncertain. Read surrounding code for context.

If there are no changes in scope, report that and return.

## Analyze style

For changed code, consider:

- **Readability:** Can a teammate scan it and understand its intent?
- **Idioms:** Does it follow the project's naming, spacing, and syntax conventions?
- **Simplicity:** Is there a clearer expression of the same behavior?
- **Consistency:** Does it fit the surrounding code and applicable instructions?

Avoid cosmetic churn and approach changes disguised as formatting. Report functional concerns separately; do not expand a style-only task into bug repairs.

## Resolve and return

If no warranted refinements exist, report that and return. Otherwise, number suggestions with a file and line, the proposed refinement, and its rationale. Cite the relevant convention and include before/after snippets only when useful.

Apply task-related refinements when implementation is authorized; in YOLO proceed without routine confirmations. For review-only requests, report findings without edits. Otherwise, if repair is not authorized, let the user choose numbered suggestions, all, or none in plain text.

Verify refinements with relevant formatting, lint, or behavior checks. Inspect the output and resulting diff. Return changes, verification, and unresolved findings to the parent workflow without starting another review cycle.
