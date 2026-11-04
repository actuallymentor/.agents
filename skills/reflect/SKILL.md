---
name: reflect
description: Trigger when the user wants to review recent work for intent alignment, code elegance, and potential bugs. Do NOT trigger for style-only reviews (use the style skill), test execution (use the test skill), changelog updates (use the changelog skill), or when no code changes exist.
---

# Reflect Skill

Review recent work through three lenses: intent alignment, elegance, and bug detection. When actionable findings exist, this skill enters plan mode to produce a structured assessment with suggestions the user can cherry-pick. When there are no findings, it reports a clean result and stops without entering plan mode.

## YOLO Mode

Before starting, check the environment variable `AGENT_AUTONOMY_MODE` via Bash (e.g. `echo $AGENT_AUTONOMY_MODE`) — compare case-insensitively. If it is set to `yolo`, this skill operates fully autonomously:

- **Skip all user confirmations** - Do not ask the user anything
- **Infer intent silently** - State the inferred intent but do not ask for confirmation
- **Apply all findings automatically** - After the assessment, proceed directly to applying all actionable suggestions without waiting for user input
- **Still respect Early Exit rules** - If there are no changes or no findings, stop as normal

## Step 1: Gather PR Comments

Always first use the `gh` cli to check for open pull requests this branch has and grab the comments on it. Even if there were no code changes, the PR might have new comments.

Then triage the results — for each comment, decide:

- **Worth addressing** - The comment points to a real issue, a valid style concern, or a meaningful improvement
- **Not worth addressing** - The comment is outdated, already resolved, nitpicky beyond reason, or conflicts with the project's conventions

Keep only the "worth addressing" comments — these are collected here and folded into Step 4's three-lens assessment. When a comment aligns with one of the lenses (intent, elegance, bugs), include it under that lens. If no PR exists or there are no comments, skip this step silently.

## Step 2: Gather Recent Work

Collect the full picture of what changed recently:

1. **Uncommitted changes** - Run `git status`, `git diff` (unstaged) and `git diff --staged` (staged)
2. **Recent commits** - Run `git log --oneline -10` to see recent history
3. **Branch context** - Get the current branch name with `git branch --show-current`
4. **Full file context** - For any files with uncommitted changes, read those files in full
5. **Commit diffs** - Find the commits made in this session on the current branch, run `git show --stat <hash>` and `git show <hash>` to understand the full scope of recent work

If there are no uncommitted changes AND no recent commits, inform the user there's nothing to reflect on and **stop immediately**. Do not proceed to any further steps.

## Step 3: Infer and Confirm Intent

Before assessing anything, understand what the developer was trying to do:

1. **Analyze signals** - Look at:
   - Commit messages and their language
   - Branch name (e.g., `feat/user-auth`, `fix/login-bug`)
   - Code comments added or modified
   - The shape of changes (new files = new feature, edits = enhancement/fix)
   - Any related issue numbers or PR descriptions

2. **State the inferred intent** - Write a clear 1-3 sentence summary of what you believe the developer intended to accomplish

## Step 4: Three-Lens Assessment

Work through these three questions sequentially. For each, reference the confirmed intent and the actual code changes.

### Q1: Did the changes capture the intent?

Compare the code against the confirmed intent:

- **Gaps** - Is anything from the intent missing or incomplete?
- **Drift** - Does the code do more than what was intended? Scope creep?
- **Misalignment** - Are there places where the implementation diverges from the intent?
- **Edge cases** - Does the implementation handle the boundary conditions the intent implies?

Be specific. Reference file paths and line numbers.

### Q2: Did the changes take the most elegant approach?

Reference the project's AGENTS.md (or CLAUDE.md) style preferences and consider:

- **Simpler alternatives** - Could the same result be achieved with less code or fewer abstractions?
- **Idiomatic patterns** - Does the code follow the conventions of the language and project?
- **Readability** - Would a teammate scanning this code understand it immediately?
- **Naming** - Do variable and function names communicate intent?
- **Structure** - Is the code organized in a way that makes the logic obvious?

This is about architectural elegance and approach-level decisions.

### Q3: Did the changes introduce any bugs?

Look for concrete issues, not theoretical concerns:

- **Logic errors** - Off-by-one, wrong comparisons, inverted conditions
- **Null/undefined risks** - Accessing properties on values that could be missing
- **Race conditions** - Async operations that assume ordering
- **Resource leaks** - Unclosed connections, missing cleanup, dangling listeners
- **State bugs** - Stale closures, mutation of shared state, missing dependency arrays
- **Boundary failures** - Empty arrays, zero values, very large inputs
- **Regression potential** - Could these changes break existing functionality?

Only flag issues you have reasonable confidence are actual problems, not speculative "what-ifs".

## Step 5: Early Exit if No Findings

**If the assessment finds no actionable suggestions across all three lenses, report that the code looks solid and stop immediately.** Do not enter plan mode. Do not ask the user what to fix. Do not invent findings. A clean reflection is a good outcome — output a brief "all clear" summary as regular conversation text and end. This applies in all modes (regular, autonomous, and YOLO).

## Step 6: Present Suggestions

**Only reach this step if there are actionable findings from Step 4.**

After completing the assessment, structure the output:

```md
# Reflection Summary

Start with a brief overall assessment (2-3 sentences). Is the work solid? What stands out?

## Findings

Group findings by the three lenses. For each finding:

---

**Lens**: Intent / Elegance / Bugs
**Location**: `[file:line]`
**Finding**: [What you observed]

**Current Code**:
```
[the existing code]
```

**Suggested Change**:
```
[the improved alternative]
```

**Rationale**: [Why this matters, referencing the confirmed intent or style preferences]

---
```

## Step 7: Implement Findings worth addressing

Look at the report from the other LLM. Judge what is worth addressing based on the conversation you have been having. Ignore nitpicks and edge cases. We are looking to prevent bugs, fix glaring oversights, or add highly relevant improvements. Also make sure not to trade minor improvements in performance of security for increases in complexity.

Based on your assesment above, implement fixes for the things that are worth addressing.

## Guidelines

### Tone

- This is a collaborative reflection, not a code review from a superior
- Frame findings as observations and options, not corrections
- Acknowledge what was done well before noting what could improve
- Be concise - developers value signal over volume

### Scope

- Focus on the recent work gathered in Step 1, not the entire codebase
- Don't suggest refactoring code that wasn't part of the recent changes
- If you spot something concerning in surrounding code, mention it briefly but don't make it a primary finding

### Judgment

- Fewer high-quality findings beat many trivial ones
- If the code is solid, say so. Not every reflection needs a long list of suggestions
- Distinguish between "this is wrong" and "this could be different" - the user should know which findings are critical vs. optional
