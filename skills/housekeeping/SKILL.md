---
name: housekeeping
description: Maintain persistent memory, revisit outdated project decisions, and update dependencies during requested maintenance. Honor narrower scopes such as memory-only cleanup or analysis-only reports.
---

# Housekeeping

Keep maintenance within the user's requested scope. A memory-only task stops after memory maintenance; an analysis-only task reports findings without edits. Autonomy does not broaden the assignment. Preserve the project's existing tools and conventions.

## Memory Maintenance

Read the memory index and its relevant linked notes. Condense repetition, remove demonstrably stale advice, and repair references. Preserve still-useful decisions, unresolved human questions, and historical context; do not erase a past decision merely because its implementation later changed. Keep the index current for retained or newly added notes.

## Revisit Decisions

When broader maintenance is requested, identify decisions whose original assumptions may be outdated. Research concrete candidates using current authoritative sources. Distinguish recommendations from necessary changes and weigh migration cost against the benefit. Apply changes within the authorized maintenance scope; report proposals that would materially expand it.

## Dependency Maintenance

When dependency updates are in scope:

1. Inspect the working tree, manifests, lockfiles, package manager, runtime constraints, and project validation commands. Record the preexisting state of files that may change so rollback can preserve the user's work.
2. Select useful updates and group them by risk: compatible updates, potentially breaking updates, and migrations. Review release notes for compatibility; do not replace the project's toolchain just to match a preference.
3. Update a bounded batch using the existing package manager. Keep manifests and lockfiles consistent, and run checks appropriate to the affected behavior before continuing.
4. If a batch fails, determine whether the failure predates the update. Fix a justified in-scope incompatibility or undo only this batch's changes. Never reset the whole worktree or discard preexisting edits. If changes cannot be separated safely, stop and explain the overlap.
5. Report unverified or deferred upgrades honestly. Do not claim an update is safe when required validation could not run.

Summarize changes, rationale, validation, and deferred items. Return to the parent task's completion workflow once; do not invoke the usual skills or checklist recursively from each maintenance batch.
