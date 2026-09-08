---
name: style
description: Trigger when the user wants to check recent code changes for style alignment against the project's coding conventions in CLAUDE.md/AGENTS.md. Do NOT trigger for functional reviews or bug detection.
---

# Code Style Review Skill

Review recent code changes for style alignment and elegance, then let the user choose which refinements to apply.

## YOLO Mode

Before starting, check `echo $AGENT_AUTONOMY_MODE`. If it is set to `yolo`, this skill operates fully autonomously:

- **Skip Step 3** (scope confirmation) — review all recent changes without asking
- **Skip Step 7** (user choice) — apply all suggestions automatically
- **Make autonomous decisions** — do not ask the user at any point
- **Still respect Early Exit rules** — if there are no changes, no instruction file, or no findings, stop as normal

## Step 1: Extract Style Preferences from Instruction Files

In order of importance, extract style preferences from the following files if they exist:

- `AGENTS.md`
- LLM specific instruction files (e.g. `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`)
- General preferences in `~/.agents/preferences/js-style.md` (see `AGENTS.md` for other preference paths)

Focus on:

- Explicit Style Rules (naming, spacing, syntax)
- Implicit Style Patterns (conventions visible in examples)
- Philosophical Preferences (readability priorities, code organization)

## Step 2: Gather Recent Changes

Collect what to review:

1. Run `git diff` (unstaged) and `git diff --staged` (staged) to find uncommitted changes
2. Run `git log --pretty=format:"%h %ad | %s" --date=iso` to find recent commits, select those since the last review or the last hour
3. For each changed file, read the full file to understand surrounding context

If there are no changes to review, inform the user and stop.

## Step 3: Deep Style Analysis

For each piece of changed code within the confirmed scope, consider:

- **Readability** - Can a teammate scan this and understand it immediately?
- **Idiomatic Patterns** - Does it follow the project's conventions from AGENTS.md?
- **Elegance & Simplicity** - Is there a cleaner way to express the same thing?
- **Consistency** - Does it match the style of surrounding code in the same file?

## Step 4: Early Exit if No Suggestions

**If the analysis finds no style issues across the confirmed scope, report that the code is clean and aligned with the project's style preferences, then stop immediately.** Do not proceed to Step 6. Do not ask the user anything. A clean review is a good outcome — output a brief "all clear" summary as regular conversation text and end. This applies in all modes (regular, autonomous, and YOLO).

## Step 5: Present Suggestions

Structure the output clearly:

### Code Review

Number each suggestion for easy reference. For each:

---

**#1**
**Location**: `[path/to/file:line]`

**Current Code**:
```
[the existing code]
```

**Suggested Refinement**:
```
[the more elegant alternative]
```

**Rationale**: [Why this is more aligned with the user's style preferences and/or more elegant. Reference specific preferences from the instruction file when applicable.]

---

## Step 6: Let the User Choose

Offer these options:

- Apply all suggestions
- Let me pick specific ones (by number)
- Skip - just wanted the review

If the user picks specific ones, ask them to list the numbers. Then apply only those changes.

Wait for the user's reply before taking any action, unless this skill is running in an autonomous/YOLO mode, in which case apply all suggestions immediately without asking.
