---
name: housekeeping
description: Keep the code and docs clean and up to date
---

# Housekeeping

Parse your persistent memory files and polish and condense them.

## Step 1: check that memory is up to date

For the following files check if their content and references are still up to date and relevant. If not, update them accordingly:

- `./.notes/MEMORY.md`
- `./.notes/GOTCHAS.md`
- `./.notes/RESEARCH.md`
- `./.notes/TIMELINE.md`
- `./.notes/HUMAN.md`

## Step 2: consider research and updates

Look at the memory system and the codeebase and ask yourself the following: "are there decisions that were made in the past that were based on information that might be outdated now?". For example, if we chose certain modules, apis, or versions because they were the best at the time but by now better versions or approaches might exist.

This step is explicitly NOT about updating dependency numbers or versions.

If `echo $AGENT_AUTONOMY_MODE` is `yolo`, proceed with the updates automatically. If not, offer the user a summary of your findings and ask for confirmation before making any changes.

## Step 3: update dependencies

Check the projects for dependencies that make sense to update. Update them optimistically, then run the test suites and the usual skills to see if everything works, if not roll back and update them intelligently. To update intelligently you update packages in batches, test the outcome, and fix bugs that arise. Use these batches:

- low risk dependencies
- dependencies that you expect might break things
- high risk dependencies that probably require migrations

## Step 4: Summarize activity

Show a condensed list of things you changed and why.