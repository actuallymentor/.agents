---
name: test
description: Trigger when the user wants to discover, run, or analyze tests in the repository. Do NOT trigger for code reviews (use the reflect skill), style checks (use the style skill), changelog updates (use the changelog skill), or when the user is only asking about test concepts without wanting to execute them.
---

# Test Runner Skill

Discover, run, and analyze tests in the current repository. When failures are found, present a fix plan and let the user choose what to act on.

Skill boundary: if this skill is run in the context of an autonomous run, where the user explicitly asked for you to work autonomously, you should NOT ask the user for confirmation on which failures to fix. Instead, you should proceed to fix all failures without asking for confirmation. In a non-autonomous context, always ask the user which failures to fix before taking any action.

## YOLO Mode

Before starting, run `echo $AGENT_AUTONOMY_MODE` if it is set to `yolo`, this skill operates fully autonomously:

- **Skip Step 2** (scope confirmation) — run all tests without asking
- **Skip Step 6** (user choice) — fix all failures automatically
- **Make autonomous decisions** — do not ask the user at any point
- **Still respect Early Exit rules** — if there are no tests or all tests pass, stop as normal

## Step 1: Discover Test Configuration

Look for test scripts in these common locations (in order of priority):

1. **package.json** - Check for `scripts.test`, `scripts.test:unit`, `scripts.test:e2e`, `scripts.test:integration`
2. **Makefile** - Look for `test`, `check`, or `tests` targets
3. **pyproject.toml** - Check for pytest configuration or test scripts
4. **setup.py** / **setup.cfg** - Python test configuration
5. **Cargo.toml** - Rust projects use `cargo test`
6. **go.mod** - Go projects use `go test ./...`
7. **build.gradle** / **pom.xml** - Java/Kotlin projects use `gradle test` or `mvn test`
8. **Gemfile** - Ruby projects often use `bundle exec rspec` or `rake test`
9. **.github/workflows/*.yml** - CI files often reveal how tests are run
10. **README.md** - May contain instructions for running tests

If no test configuration is discovered in any of these locations, inform the user that no tests were found and **stop immediately**. Do not proceed to any further steps. This applies in all modes (regular, autonomous, and YOLO).

## Step 2: Confirm Test Scope

If the project has multiple test commands (e.g., unit, integration, e2e), ask the user which to run. Offer options like:

- All tests
- Unit tests only
- Integration / e2e tests only
- A specific test file or pattern

If there's only one test command, skip this step and run it directly.

## Step 3: Run the Tests

Run the identified test command using Bash:

1. Run all test commands you identified sequentially, do not skip any
2. Use verbose flags where available (e.g., `pytest -v`, `npm test -- --verbose`) for better output
3. Capture both stdout and stderr

## Step 4: Analyze Test Results

Parse the output and identify:

1. **Failed tests** - Test name, file, and line number
2. **Error messages** - Full error/exception message
3. **Stack traces** - The relevant code paths
4. **Assertion failures** - Expected vs actual values
5. **Skipped/pending tests** - Any tests that were skipped and why

**If all tests pass, report the summary (total tests, passed count) and stop immediately.**

## Step 5: Present Results and Fix Plan

### Test Results Summary
- Total tests: X
- Passed: X
- Failed: X
- Skipped: X

### Failures

Number each failure for easy reference. For each:

---

**#1**
**Test**: `[test name]`
**File**: `[test file:line]`
**Error**: `[error message]`
**Root Cause**: [brief analysis]
**Fix**: [what needs to change and where]

---

Group failures that share a root cause. Multiple tests may fail for the same underlying issue - present these as one numbered item with multiple affected tests listed.

For each failure, read the relevant source code to determine:
- Is the implementation wrong, or is the test wrong?
- What's the minimal fix?
- Could this fix break anything else?

## Step 6: Let the User Choose

**In YOLO mode, enter plan mode and fix all failures without asking for confirmation.**

Ask the user what to do next. Offer these options:

- Fix all failures
- Let me pick which to fix (by number)
- Skip fixes - just wanted the results

If the user picks specific ones, ask them to list the numbers. Then fix only those, reading and editing the relevant source files.

After applying fixes, re-run the tests **once** to verify the fixes worked. If new failures appear, report them but do not attempt further fixes — let the user decide the next step. Do not loop.

Wait for the user's reply before taking any action, unless this skill is running in an autonomous context where the user has explicitly asked for you to work autonomously, or YOLO mode is active. In either case, proceed to fix all failures without asking for confirmation.
