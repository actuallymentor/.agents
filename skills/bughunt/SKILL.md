---
name: bughunt
description: Audit prod sources for errors
---

# Bughunt

Your goal is to look at available production and diagnostic data sources to find and fix errors. The outcome of your work is a feature branch and a PR for each issue you fixed.

## Step 1: determine data sources

Look at the folder you are in, see what you have access to the is relevant to finding errors and bugs. Some non-exhaustive examples:

- Deployments of this application that you can get the logs from through SSH
- Diagnostics services like Sentry that capture application behaviour data
- UX related tooling that show us how users use the app, something like Hotjar
- Github issues opened by users or other LLM agents

Make a list of these sources and how to access them.

## Step 2: find errors to address

Access the data sources you found, and find issues. You may look at things like errors in the logs, performance metrics, and so forth. Make a list of things that you could address.

Make sure you check the repository issue and PR list, if any of the things you identified are duplicates of existing issues, your goal is not to open a new pull request but to ammend the open one if needed so it captures the overarching issue.  Also look at closed PRs that might have fixed this issue.

## Step 3: create feature branches and PRs with fixes

For each issue, create a feature branch that you use to open a PR on the main repository. Work in parallel as much as possible. Your priorities when fixing issues are to make sure that you find the root cause of the issue. Do not monkeypatch things. Find the root cause and implement a structural fix.

Boundaries:

- You are not expected to merge PRs.
- Keep in-progress PRs in draft state
- If you are going to ammend an open PR, put it in draft first and leave a comment about what you intend
