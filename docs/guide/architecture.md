# Architecture

## Core files

- `SKILL.md`: the authoritative skill instructions used by Codex
- `agents/openai.yaml`: a lightweight interface summary for tooling that surfaces the skill
- `references/prompt-patterns.md`: prompt templates for research, reconnaissance, worker, and review swarms
- `references/recovery.md`: fallback behavior for thread limits, timeouts, interruptions, and ambiguous model visibility

## Why the repository stays small

This skill is strongest when it remains easy to audit. The repository separates the operational instructions, prompt templates, and recovery notes so each file answers one question quickly.

## Documentation strategy

The VitePress site mirrors the same structure that new users need:

- getting started for setup
- usage for delegation rules
- architecture for repository layout
- troubleshooting for failure recovery

This keeps the English and Japanese docs parallel without copying every sentence from the root skill file.

## Visual identity

The SVG mark and hero art use an eclipse-and-spark motif to match the skill name. The same visual seed is reused across the README hero, docs logo, favicon, and social preview asset.

