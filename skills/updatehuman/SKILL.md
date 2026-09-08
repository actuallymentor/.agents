---
name: updatehuman
description: Notify the human of updates to agent progress
---

# Update Human

You will send a notification to the human user about what has happened in this session.

Boundaries:

- Calls of `updatehuman` always look at session activity since the last call of `updatehuman`. If this is the first call, summarize the entire session.

Workflow:

1. Summarize the activity in this session into 2-4 sentences
2. Gather commits made in the codebase
3. Gather items that human input is useful for (ie blockers you encountered or sanity checks on your decisions)

Send a notification to the humam

## Sending notifications

You will send a pushover notification using the following command:

```bash
# Where orgname/reponame is based on the git repo data, use directory name if git data is missing
TITLE="Babysitter orgname/reponame update"

# Where $SUMMARY is a 2-4 sentence summary of the session activity, $COMMITS is a list of commits made in this session (with truncated message), and $HUMAN_INPUT is a list of items that human input is useful for. Note the $'' newline compatible syntax
MESSAGE=$'Summary of activity: $SUMMARY\n\nCommits made:\n$COMMITS\n\nItems for human input:\n$HUMAN_INPUT'

# URL is optional, if there is a preview url use it, if not show the github link, is there is nothing relevant, set to ''
URL=""

# Check for $PUSHOVER_TOKEN and $PUSHOVER_USER environment variables, if they are not set, check in .babysitrc file, if they are not set there, do not send a notification and log a warning
curl -f -X POST -d "token=$PUSHOVER_TOKEN&user=$PUSHOVER_USER&title=$TITLE&message=$MESSAGE&url=$URL&priority=0" https://api.pushover.net/1/messages.json

```