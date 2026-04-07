# AI Coding Assistant Instructions

Write code that breathes. Think Ruby-like elegance meets modern js.

## Planning and research

- Enter plan mode for any non-trivial task by running the /plan skill
- Liberally use subagents for research, exploration, and parallel analysis
- Err on the side of research and planning, including online browsing, assume your knowledge might be out of date
- When `echo $AGENT_AUTONOMY_MODE` is `yolo`, skip all confirmations and operate fully autonomously, use best guesses when decisions need to be made

## Boundaries

- You may not view or edit files specified in `.agentignore`
- You may NOT push to repositories, not with `git`, not with `gh`
- If you cannot browse a URL directly, you must try to open it with a browser tool or MCP server, attempt to install it if not available, if your CPU arch does not support Chrome, use Chromium

==============================

## Persistent Memory

In the project root, check for a `./.notes/` directory, you MUST create it first thing if it does not exist (use `mkdir -p ./.notes`). Here you can store notes to self or other LLMs, notes persist across runs. Write at will, read `./.notes/MEMORY.md` on every run. Check for any `**/.notes/` folders in subdirectories and read their `MEMORY.md` when working in those subdirectories.

Do NOT use these files for implementation details, trust that a future LLM will analyse the codebase itself.

| File path | Relevance |
| --- | --- |
| `./.notes/MEMORY.md` | The index of your memory system, it references other notes and when to load them. Do not include any project details in here. |
| `./.notes/GOTCHAS.md` | Project-specific pitfalls/footguns that you want your future self to keep in mind |
| `./.notes/RESEARCH.md` | Notes about research you have done, such as summaries of relevant documentation or explanations of concepts you had to look up |
| `./.notes/TIMELINE.md` | A timestamp list of major decisions, changes, or events that occurred during your work, to help you keep track of the sequence of events and the rationale behind them |

Boundaries:

- Expand the amount of notes at will, but always update `MEMORY.md` with references to new notes and when to load them
- Every node in `./.notes/` must me referenced in `MEMORY.md` with a brief description of relevance and when to load it

> **Note:** If the file system is read-only, writing to the memory system may be ignored.

==============================

## Post-Edit Checklist

**Every time you finish making edits, follow this checklist in order. Do not skip steps. Do not commit before completing steps 1-4.**

0. **Handle persistent memory** — write relevant notes to `./.notes/` and update `MEMORY.md` with references to new notes and when to load them
1. **Run the `reflect` skill** — review your changes for intent alignment, elegance, and bugs
2. **Run the `style` skill** — review your changes for code style alignment
3. **Run the `changelog` skill** — update CHANGELOG.md, version numbers, and README.md (skip if changes are purely internal with no user-facing impact)
4. **Offer the `test` skill** — if the project has tests configured, offer to run them
5. **Commit** — if `echo $AGENT_AUTONOMY_MODE` is `yolo`, commit with a gitmoji message; otherwise suggest a commit command with message and ask for confirmation. Common [gitmoji](https://gitmoji.dev/): `✨ feature`, `🐛 bug`, `🔥 removal`, `📚 docs`, `♻️ refactor`, `🎨 style`, `✅ tests`


> **Skills** are reusable workflows invoked by name. The invocation syntax varies by tool — Claude Code uses `/skill_name`, Codex uses `$skill_name`, and other tools may differ. When this document says "run the `reflect` skill", use whatever invocation method your tool provides.

==============================

## Preferences system

Check for the existence of the `~/.agents/preferences` directory. If it exists, conditionally load relevant files:

| File path | Relevance |
| --- | --- |
| `~/.agents/preferences/js-style.md` | When working with Javascript, read and apply relevant style preferences |
| `~/.agents/preferences/tooling-preferences.md` | When starting a project or deciding on libraries/tools, read and apply relevant tooling preferences |
| `~/.agents/preferences/design-preferences.md` | When working on UI/UX, read and apply relevant design preferences |

==============================

# Code Philosophy

**Code is written for human eyes**: Code is an expression of the intent. For machines, the syntax and style is not relevant. Therefore, code style must be optimised for human eyes and mental models.

**More comments is better than less comments**: Reading code can clarify function but not intention. Comments are a reminder to self, or an explanation to coworkers that are less familiar with the codebase.

**Readability Through Spacing**: Code needs room to breathe. Spacing makes structure visible at a glance.

**Remember**: Code is read far more than it's written. Make it beautiful, make it breathe, make it obvious.
