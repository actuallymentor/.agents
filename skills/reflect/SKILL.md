---
name: reflect
description: Review task changes for intent alignment, elegance, and bugs; apply justified fixes when implementation is authorized. Use for functional reviews and the completion checklist, not style-only reviews or test execution.
---

# Reflect

Review the current task through three lenses: intent, elegance, and bugs. Prefer a few concrete findings over speculative improvements.

## Scope and autonomy

- Use the user's request and the parent task's scope as the source of intent. Explicit review-only requests prohibit edits, including in YOLO mode.
- Check `AGENT_AUTONOMY_MODE` case-insensitively. In YOLO or an authorized autonomous implementation task, apply justified, task-related fixes without confirmations. Otherwise, present numbered findings and let the user select fixes when repair is not already authorized.
- When invoked by another workflow, return findings and verification results to it. A clean review ends this skill, not the parent task. Do not restart the completion checklist, commit independently, or invoke this skill recursively.

## Establish the review scope

Use the task's starting worktree state, files, and commit range. Inspect staged and unstaged diffs and task-owned untracked files; check ignore rules before reading files. Do not select commits merely because they are recent or include unrelated changes because they share a file.

If the task baseline is unavailable, use an explicitly requested diff or PR range and state the scope used. For an ambiguous request to review recent work, inspect repository status and branch context, then choose a defensible scope for read-only review. Do not modify changes whose ownership is uncertain.

Read enough surrounding code to understand behavior. When a relevant PR is available through `gh`, read its description and comments. Fold unresolved, meaningful comments into the assessment; discard outdated, resolved, or unsupported suggestions. Do not publish replies as part of this review.

If there are no changes or relevant outstanding PR findings in scope, report that and return.

## Assess the changes

State the intended outcome briefly. Ask about intent only when a material ambiguity cannot be resolved from the task and repository evidence.

### Intent

- Does the change complete the requested behavior?
- Does it introduce scope drift or contradict a stated constraint?
- Does it handle the boundary conditions the requested behavior implies?

### Elegance

- Would a simpler approach satisfy the same need with fewer abstractions?
- Do naming and structure make the intent easy to follow?
- Does the approach fit existing project conventions and applicable instructions?

Judge architecture and readability here; leave detailed formatting to `style`. Distinguish a worthwhile simplification from a merely different implementation.

### Bugs

Look for concrete logic errors, missing-value access, ordering assumptions, resource leaks, state errors, boundary failures, and regressions. Ground findings in actual code paths and plausible inputs. Do not manufacture theoretical concerns.

## Resolve and return

If there are no actionable findings, report that and return. Otherwise, number findings with the lens, file and line, observed problem, proposed correction, and rationale. Include code snippets only when they clarify the change; distinguish defects from optional refinements.

For non-trivial repairs, use plan mode when available or a concise written plan otherwise. Follow the existing authorization: apply justified fixes autonomously within implementation scope, or report the review and offer numbered choices when repair needs a user decision. Do not interrupt an already-authorized task for routine selection.

Verify changed behavior with relevant checks. Return the findings, fixes, verification, and any remaining limitations to the parent workflow. Do not keep polishing after material findings are resolved.
