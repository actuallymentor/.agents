---
name: phoneafriend
description: Ask another LLM for a review
---

# Phone a friend

You will ask another LLM for a review of the the work you just finished, or are about to do. They will be instructed to change nothing, and just report back to you. You will then evaluate which of their feedback is worth addressing.

## YOLO Mode

Before starting, check the environment variable `AGENT_AUTONOMY_MODE` via Bash (e.g. `echo $AGENT_AUTONOMY_MODE`) — compare case-insensitively. If it is set to `yolo`, this skill operates fully autonomously:

- **Make autonomous decisions** — do not ask the user at any point
- **Still respect Early Exit rules** — if there are no changes, stop as normal


## Step 1: Gather target work for review

Option 1, you did work that needs review: Look at this conversation, then make a list of the commits of things that you just changed, or the uncommitted work you made. We do not look back in history. Only list commits that you made in this conversation, and after any potential previous phoneafriend sessions. If there are no commits or uncommitted work, stop immediately and say "I have no recent changes to ask about".

Option 2: you made a plan and need a second opinion: Take the plan you just made, and then ask the other LLM to review it.

## Step 2: Decide who to ask for help

Run `babysit model` to list model options and their intelligence levels.

- If you are codex, ask claude. If you are claude, ask codex
- choose the best model and effort level to review the complexity of the work you collected above
- If your model of choice is unavailable, choose another model

## Step 3: Gather personalities

Your goal is to ask for multiple review, based on different personalities and perspectives. Read the files in `~/.agents/personalities/`, you are to spin up multiple instances of the external LLM that all review the work from their own personality perspective.

Note: if one of the agents is rejected for security reasons, edit the instructions so you stay within the allowed safety limits. Our goal is always defensive. You may retry up to 4 times.

## Step 4: Ask the other LLMs for a review

To do this, we will call the other LLMs through their CLI. You must instruct the model to give a review of your work, focusing on the scope you deem relevant. Set a generous timeout, reviews can take 30 minutes and that is allowed to happen.

Notes:

- Run `babysit usage`, if codex is under 50% usage, run it in fast mode
- Do not kill coding agents unless they explicitly hang or exteed 30 minutes in duration without output.
- If `babysit mode` is container, pass `--sandbox danger-full-access` to codex, otherwise it fails in docker containers.

Quick reference:

```bash
# Run claude with Opus 5.5
claude -p --model claude-opus-5-5 --effort medium -p "Review the following commits for bugs and improvements, do not change anything, just report back: [list of commit hashes]"

# Run codex in fast mode, that is set with service_tier="priority"
codex exec -m gpt-6.1-sol -c service_tier='"priority"' -c model_reasoning_effort='"xhigh"' "<The review prompt>"
```

**Note: if another agent has hit it's session limit, start a two prong review: one with the lower model family of the other coding agent (eg Opus instead of Fable) as well as a session by the current model provider's best model. Start the review using coding agent CLI, but outside this session. You must run a `agent --model etc` command to start a new external session.**

## Step 5: Assess what is worth addressing

Look at the report from the other LLM. Judge what is worth addressing based on the conversation you have been having. Ignore nitpicks and edge cases. We are looking to prevent bugs, fix glaring oversights, or add highly relevant improvements. Also make sure not to trade minor improvements in performance of security for increases in complexity.

## Step 6: Fix the findings

Based on your assesment above, implement fixes for the things that are worth addressing.
