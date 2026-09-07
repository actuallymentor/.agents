---
name: changelog
description: Update the changelog and relevant user documentation for task changes; manage scoped version bumps when preparing an authorized release. Use after user-facing edits or when explicitly requested.
---

# Changelog

Document observable changes tersely. Follow existing project conventions and release tooling. In YOLO mode, apply authorized updates without routine confirmation; an explicit draft-only or review-only request remains read-only.

## Scope

- Use the parent task's changed files, hunks, untracked additions, and commits. Preserve unrelated work. For an explicit release-history request, use the requested release range.
- Read the existing changelog and relevant release configuration. Record only changes not already documented; no changelog does not mean backfilling the entire branch history.
- If nothing relevant changed, return a brief result without creating files. When invoked by a parent workflow, return to it; do not start another checklist or commit independently.

## Ordinary work

1. Describe the task's user-facing additions, fixes, changes, removals, or breaking behavior.
2. Update the existing `Unreleased` section, or create it if the project has no other convention. Create `CHANGELOG.md` only when there is something to record and no equivalent project mechanism.
3. Use one short line per change; omit empty sections. Preserve released history. Include real commit hashes only when already available and useful; uncommitted changes need no hash or placeholder.
4. Update existing README or other user documentation only where behavior needs explaining. Avoid unrelated rewrites and duplicate documentation.

Example when no project format exists:

```markdown
# Changelog

## [Unreleased]

### Fixed

- Preserve existing setup files when installing agent links.
```

## Releases and versions

Ordinary edits do not bump versions. Bump when the user requests release preparation or the established project workflow calls for it.

- Identify the release unit: the application, package, or configured group of packages being released. Find its authoritative version source and generated mirrors.
- Use the project's release command when available. Update only that unit's version and required mirrors or lockfiles; do not replace every matching version string or independently versioned package.
- Follow the project's version policy. If it uses semver, classify breaking behavior as major, features as minor, fixes as patch; documentation or internal cleanup alone does not require a release.
- Convert the relevant unreleased entries to the version and actual release date only as part of that release workflow. Do not create a version system where none exists.

Apply updates within existing authorization. If a material release choice remains unspecified, finish the reviewable changelog draft and ask only for that choice. Report what changed, which release unit was affected, and any unresolved decision.
