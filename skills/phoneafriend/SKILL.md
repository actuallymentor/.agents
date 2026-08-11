---
name: phoneafriend
description: Ask another LLM for a review
---

# Phone a friend

You will ask another LLM for a review of the the work you just finished. They will be instructed to change nothing, and just report back to you. You will then evaluate which of their feedback is worth addressing.

## YOLO Mode

Before starting, check the environment variable `AGENT_AUTONOMY_MODE` via Bash (e.g. `echo $AGENT_AUTONOMY_MODE`) — compare case-insensitively. If it is set to `yolo`, this skill operates fully autonomously:

- **Skip all user confirmations** - Do not ask the user to confirm intent (Step 3), do not ask which findings to address (Step 6)
- **Infer intent silently** - State the inferred intent but do not ask for confirmation
- **Apply all findings automatically** - After the assessment, proceed directly to applying all actionable suggestions without waiting for user input
- **Still respect Early Exit rules** - If there are no changes or no findings, stop as normal

## Step 1: Decide who to ask for help

If you are codex, ask claude. If you are claude, ask codex. If you are anyone else, ask claude.

## Step 2: Gather recent commits

Look at this conversation, then make a list of the commits of things that you just changed. We do not look back in history. Only list commits that you made in this conversation, and after any potential previous phoneafriend sessions. If there are no commits, stop immediately and say "I have no recent changes to ask about".

## Step 3: Ask the other LLM for a review

To do this, we will call the other LLM through their CLI. You must first inject the base prompt that you were given at the start of this conversation, and you will then ask for a review. Set a generous timeout, reviews can take 30 minutes and that is allowed to happen. Do not kill coding agents unless they explicitly hang or exteed 30 minutes in duration without output.

Make an estimation what effort level is needed for this review, valid values are:

- claude: `low`, `medium`, `high`, `xhigh`, `max`, `ultracode`
- codex: `low`, `medium`, `high`, `xhigh`, `max`

Example if you are codex and asking claude:

Determine the available model for this level of review when calling the other LLM, example for a very complex problem:

- When asking Claude, pass `--model best --effort high`.
- When asking Codex, pass `--model gpt-5.5 -c 'model_reasoning_effort="xhigh"'`.

Note: codex is cheap, claude is expensive. When reviewing with codex, err on the side of high effort (xhigh is fine), when reviewing with claude be more conservative (`high` is the maximum).

```bash
claude --model best --effort high -p "[base prompt]"
# You wait for the response

claude --model best --effort high -p --continue "Review the following commits for bugs and improvements, do not change anything, just report back: [list of commit hashes]"
# You will read the response
```

Example if you are claude and asking codex:

```bash
codex --model gpt-5.5 -c 'model_reasoning_effort="xhigh"' exec "[base prompt]"
# You wait for the response

codex --model gpt-5.5 -c 'model_reasoning_effort="xhigh"' exec "Review the following commits for bugs and improvements, do not change anything, just report back: [list of commit hashes]"
# You will read the response
```

**Note: if the other agent has hit it's session limit, start the review using the same coding agent, but outside this session. You must run a `agent --model etc` command to start a new external session.**

## Step 4: Assess what is worth addressing

Look at the report from the other LLM. Judge what is worth addressing based on the conversation you have been having. Ignore nitpicks and edge cases. We are looking to prevent bugs, fix glaring oversights, or add highly relevant improvements.

## Step 5: Ask the user whether to address the findings

Ask the user if you should implement the worthwhile findings. In YOLO mode, you do not ask and just continue.

## Step 6: Enter plan mode and fix the findings

For each finding you are addressing, create a task for it in the plan. Then execute the plan to fix the issues. After executing, ask the user if they want to run phoneafriend again to check the fixes. In YOLO mode you do not ask and just continue to run phoneafriend again, unless the last report had no issues of duplicate issues.

### Early Exit

- **No commits = stop.** If there are no commits to review in Step 2, say "I have no recent changes to ask about" and stop immediately. Do not proceed to Step 3.
- **No findings = stop.** If the other LLM reports no issues or improvements worth addressing, say "The review found no issues or improvements worth addressing" and stop immediately. Do not proceed to Step 5 or Step 6.
- **Duplicate findings = stop.** If the other LLM's report is identical to a previous report from a phoneafriend session in this conversation, say "The review did not find any new issues or improvements compared to the last review" and stop immediately. Do not proceed to Step 5 or Step 6. This prevents infinite loops of phoneafriend sessions without new findings.
