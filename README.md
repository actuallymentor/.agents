# Agent instructions

Shared coding-agent guidance: [AGENTS.md](AGENTS.md), [preferences](preferences/), and [skills](skills/). Existing project conventions take priority over personal defaults unless specified otherwise. YOLO mode executes authorized work without routine confirmations; explicit review-only requests stay read-only.

## Setup

Keep this checkout at `~/.agents` for user skill discovery. Configure your launcher to load `~/.agents/AGENTS.md` when it is not already loaded. `CLAUDE.md` points to the same instructions; load each distinct file once.

Install Claude links:

```bash
bash symlink.sh
```

Optional source and destination directories:

```bash
bash symlink.sh /path/to/agent-config /path/to/claude-config
```

The script creates the destination directory, preserves correct links on reruns, and refuses conflicting files, directories, or links. It does not require changing `CODEX_HOME`.

## Verification

```bash
node --test tests/workflows.test.mjs
bash -n symlink.sh
```

The tests exercise setup in temporary directories, notification encoding over local HTTP, Git ignore rules, and the age example. They do not modify user configuration or send Pushover notifications.
