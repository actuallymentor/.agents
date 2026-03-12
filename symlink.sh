#!/bin/bash

# Symlink the relevant files to relevant locations for non-standard agent use

# Check if CODEX_HOME is set to ~/.agents, warn if not
if [ -z "$CODEX_HOME" ]; then
  echo "Warning: CODEX_HOME is not set. Please set it to ~/.agents"
fi

# Symlink claude-specific paths
ln -s ~/.agents/AGENTS.md ~/.claude/CLAUDE.md
ln -s ~/.agents/skills ~/.claude/skills
