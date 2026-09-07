---
name: updatehuman
description: Send the user a Pushover notification for meaningful task completion, a new blocker needing input, or an explicit notification request. Skip setup-only activity and duplicate updates.
---

# Update Human

Send one useful update covering activity since the last successful notification, or the task so far if none was sent. A setup-only turn, empty memory initialization, or unchanged status does not warrant a notification. An explicit user request to notify overrides these timing defaults.

The main agent owns notifications; subagents return their results to it. Invoking this skill from a completion workflow does not start another checklist.

## Prepare

1. Summarize meaningful results and verification in 2–4 sentences.
2. List only commits from this task and any concrete blocker or decision needing human input. Use `None` where appropriate.
3. Use `Babysitter org/repo update` as the title, derived from the actual repository; use the directory name when no remote exists. Link to a relevant preview or repository URL, or leave the URL empty.
4. Read credentials from `PUSHOVER_TOKEN` and `PUSHOVER_USER`. If missing, check an allowed `.babysitrc` for those two literal values; do not execute or source the file. Never print credentials. If unavailable, log a short warning and return without sending.

## Send

Populate the variables below as data, using safely quoted values or structured tool arguments. Do not paste untrusted text into executable shell syntax. The example assumes credentials and the prepared `notify_title`, `notify_summary`, `notify_commits`, `notify_input`, and optional `notify_url` variables are already set.

```bash
if [[ -z ${PUSHOVER_TOKEN:-} || -z ${PUSHOVER_USER:-} ]]; then
    printf 'Notification skipped: Pushover credentials are not configured.\n' >&2
else
    printf -v notify_message 'Summary of activity: %s\n\nCommits made:\n%s\n\nItems for human input:\n%s' \
        "$notify_summary" "$notify_commits" "$notify_input"

    curl --fail --silent --show-error --connect-timeout 10 --max-time 30 \
        --data-urlencode "token=$PUSHOVER_TOKEN" \
        --data-urlencode "user=$PUSHOVER_USER" \
        --data-urlencode "title=$notify_title" \
        --data-urlencode "message=$notify_message" \
        --data-urlencode "url=${notify_url:-}" \
        --data-urlencode 'priority=0' \
        https://api.pushover.net/1/messages.json
fi
```

Check both the command result and the API response for success before recording the notification as sent. On failure, report it without obscuring the completed task or automatically retrying a potentially delivered message.
