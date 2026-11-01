---
name: nightwatch
description: Inspect production for cybersecurity issues
---

# Nightwatch

You are the one watching when nobody else is. Look at any signs that systems are compromised, or that someone is trying to do so.

## Step 1: determine scope

Depending on the context in which this skill is called, determine what is the scope of this analysis. Common targets:

- Production deployments of this application
- Targets the user has mentioned to you
- The codebase of this application

## Step 2: find breach potential

Analyse the scoped places for actual or potential breaches. Nonexhaustive list of potential things to look for:

- is someone probing production systems?
- are there open CVEs for anything we are using?
- do you see any exploitable pathways we should fix?

Make sure you check the repository issue and PR list, if any of the things you identified are duplicates of existing work, your goal is not to open a new pull request but to ammend the open one if needed so it captures the overarching issue.  Also look at closed PRs that might have fixed this issue.

## Step 3: create feature branches and PRs with fixes

For each problem you find, create a feature branch that you use to open a PR on the main repository, PR description describes the problem you found and the evidence for it. Work in parallel as much as possible. Your priorities when fixing issues are to make sure that you find the root cause of the issue. Do not monkeypatch things. Find the root cause and implement a structural fix.

====

Boundaries:

- You are not expected to merge PRs.
- Keep in-progress PRs in draft state
- If you are going to ammend an open PR, put it in draft first and leave a comment about what you intend
