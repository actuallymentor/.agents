---
name: changelog
description: Trigger when the user wants to update CHANGELOG.md, bump version numbers, or document recent changes after editing code. Do NOT trigger for code reviews, style checks, test runs, or general questions about the project.
---

# Changelog Skill

Maintain a project changelog, bump version numbers, and update user-facing documentation to reflect recent changes. This skill produces terse, timestamped entries — not prose.

If CHANGELOG.md does not exist, create it.

## YOLO Mode

Before starting, check the environment variable `AGENT_AUTONOMY_MODE` via Bash (e.g. `echo $AGENT_AUTONOMY_MODE`) — compare case-insensitively. If it is set to `yolo`, this skill operates fully autonomously:

- **Skip Step 4** (user confirmation) — apply all updates without asking
- **Make autonomous decisions** — do not ask the user at any point
- **Still respect Early Exit rules** — if there are no changes, stop as normal

## Step 1: Gather Recent Changes

Collect the full picture of what changed:

1. **Uncommitted changes** — Run `git diff` (unstaged) and `git diff --staged` (staged)
2. **Recent commits** — Run `git log --oneline -20` to see recent history
3. **Branch context** — Get the current branch name with `git branch --show-current`
4. **Last changelog update** — If `CHANGELOG.md` exists, read it to find the most recent entry and its date/commit hash
5. **Commit range** — Identify which commits are new since the last changelog entry. If no changelog exists, use all commits on the current branch

If there are no uncommitted changes AND no new commits since the last changelog entry, inform the user there's nothing to log and **stop immediately**. Do not proceed to any further steps.

## Step 2: Classify Changes and Determine Version Bump

For each new commit and any uncommitted changes, classify the change:

### Change classification

- **feat** — New user-facing feature or capability
- **fix** — Bug fix
- **breaking** — Breaking change to existing behavior or API
- **docs** — Documentation-only change (no version bump needed)
- **refactor** — Internal restructuring (no version bump needed)
- **style** — Code style change (no version bump needed)
- **test** — Test additions or changes (no version bump needed)
- **chore** — Build, CI, dependency updates (no version bump needed)

### Version bump determination

Based on the classifications above, determine the appropriate semver bump:

- **major** — Any `breaking` changes present
- **minor** — Any `feat` changes present (and no breaking)
- **patch** — Only `fix` changes present (and no feat/breaking)
- **none** — Only `docs`, `refactor`, `style`, `test`, or `chore` changes

### Find current version

Search for the version in common locations (check all, update all that exist):

1. `package.json` — `"version"` field
2. `VERSION` file
3. Source code constants (grep for patterns like `VERSION = `, `version = `, `__version__`)
4. `Cargo.toml` — `version` field
5. `pyproject.toml` — `version` field

If no version is tracked anywhere, skip version bumping entirely.

## Step 3: Draft Changelog Entry and Documentation Updates

### Changelog entry format

Draft a new entry for `CHANGELOG.md` following this format:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- terse description of new feature (commit hash)

### Fixed
- terse description of bug fix (commit hash)

### Changed
- terse description of change (commit hash)

### Removed
- terse description of removal (commit hash)

### Breaking
- terse description of breaking change (commit hash)
```

Rules:
- Only include sections that have entries (omit empty sections)
- Each entry is one line, maximum ~80 characters
- Include the short commit hash in parentheses
- Use imperative mood ("add user auth", not "added user auth")
- If `CHANGELOG.md` doesn't exist yet, create it with a header: `# Changelog`
- New entries go at the top, below the `# Changelog` header
- Preserve all existing entries

### Documentation updates

Check if any changes affect user-facing behavior. If so, identify what needs updating in `README.md`:

- New or changed CLI flags, commands, or arguments
- New features a user would need to know about
- Changed behavior that would surprise someone reading the old docs

Keep README edits terse — document what changed, not prose. If no user-facing behavior changed, skip README updates.

## Step 4: Present and Confirm

Present the user with a summary of what will be written:

1. **Changelog entry** — Show the drafted entry
2. **Version bump** — Show current version → new version (and which files will be updated)
3. **README changes** — Show what will be added/modified (if anything)

Ask the user to confirm. Offer options:

- Apply all updates
- Let me adjust (user provides feedback)
- Skip — no updates needed

Wait for the user's reply before taking any action, unless this skill is running in an autonomous context or YOLO mode. In either case, proceed to apply all updates without asking.

**In YOLO mode, skip this step entirely** — apply all updates directly.

## Step 5: Apply Updates

Apply the confirmed changes:

1. **CHANGELOG.md** — Create or prepend the new entry
2. **Version files** — Bump the version in all locations found in Step 2
3. **README.md** — Apply documentation updates (if any)

After applying, output a brief summary of what was updated.

## Guidelines

### Tone

- Changelog entries are for humans scanning a list — keep them short and scannable
- One line per change, imperative mood, no fluff
- Group related changes under the same bullet if they're part of one logical unit

### Scope

- Only log changes since the last changelog entry
- Do not retroactively rewrite or reformat existing changelog entries
- Do not invent changes — only document what actually happened in the commits

### Version Bumps

- When in doubt between patch and minor, prefer minor
- If no version is tracked anywhere in the project, do not create one — just update the changelog
- Always update ALL locations where the version appears

### Early Exit

- **No new changes = stop.** If Step 1 finds nothing new since the last entry, tell the user and stop
- **Never self-trigger.** This skill runs once per invocation. It must never re-invoke itself or suggest running itself again as a next step

### README Updates

- Only update README when user-facing behavior actually changed
- Do NOT update README for internal refactors, code style changes, or implementation details
- Keep edits surgical — change only the relevant sections, don't rewrite the whole file
