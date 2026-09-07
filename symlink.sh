#!/usr/bin/env bash
set -euo pipefail

# Optional paths make installation usable from another checkout and easy to test.
# CODEX_HOME need not point here: Codex discovers user skills in ~/.agents/skills.
if (($# > 2)); then
    printf 'Usage: %s [agent-directory [claude-directory]]\n' "$0" >&2
    exit 2
fi

agent_dir=${1:-"$HOME/.agents"}
claude_dir=${2:-"$HOME/.claude"}

if [[ ! -f "$agent_dir/AGENTS.md" || ! -d "$agent_dir/skills" ]]; then
    printf 'Expected AGENTS.md and skills/ in %s\n' "$agent_dir" >&2
    exit 1
fi

agent_dir=$(cd -- "$agent_dir" && pwd -P)

# Check both destinations before installing either link. Keep existing content.
check_target() {
    local source_path=$1 target_path=$2

    if [[ -L "$target_path" && "$target_path" -ef "$source_path" ]]; then
        return
    fi

    if [[ -e "$target_path" || -L "$target_path" ]]; then
        printf 'Cannot install link: %s already exists and is not the expected symlink.\n' "$target_path" >&2
        return 1
    fi
}

check_target "$agent_dir/AGENTS.md" "$claude_dir/CLAUDE.md"
check_target "$agent_dir/skills" "$claude_dir/skills"

mkdir -p -- "$claude_dir"

for entry in AGENTS.md skills; do
    target_name=$entry
    [[ "$entry" != AGENTS.md ]] || target_name=CLAUDE.md

    if [[ ! -L "$claude_dir/$target_name" ]]; then
        ln -s -- "$agent_dir/$entry" "$claude_dir/$target_name"
    fi
done

printf 'Claude links ready in %s\n' "$claude_dir"
