# Architecture

## Core files

- `SKILL.md`: the authoritative skill instructions used by Codex
- `agents/openai.yaml`: a lightweight interface summary for tooling that surfaces the skill
- `references/prompt-patterns.md`: prompt templates for research, reconnaissance, worker, and review swarms
- `references/recovery.md`: fallback behavior for thread limits, timeouts, interruptions, and ambiguous model visibility

## Why the repository stays small

This skill is strongest when it remains easy to audit. The repository separates the operational instructions, prompt templates, and recovery notes so each file answers one question quickly.

## Operational boundary design

The structure is intentionally small so the main agent can keep control of the critical path:

- `SKILL.md` defines the governance model and high-level rules.
- `references/*` provide reusable templates and recovery playbooks.
- `docs/*` and this repository-facing prose provide operational guidance for humans and auditors.

In this model, the main agent remains the single point of policy and synthesis, while subagents are expected to run bounded slices with explicit scope and a QA inventory.

## Orchestration flow diagram

![Codex Spark Eclipse Legion orchestration flow](/legion-orchestration-flow.drawio.svg)

The reusable diagram asset mirrors the governance model in `SKILL.md` and keeps the role split, canonical flow, reduce-fan-out rules, and reporting contract visible in one reference. The editable source lives at `docs/public/legion-orchestration-flow.drawio`.

## Documentation strategy

The VitePress site mirrors the same structure that new users need:

- getting started for setup
- usage for delegation rules, including scope, non-goals, completion criteria, and QA inventory
- architecture for repository layout
- troubleshooting for failure recovery

This keeps the English and Japanese docs parallel without copying every sentence from the root skill file.

## Visual identity

The SVG mark and hero art use an eclipse-and-spark motif to match the skill name. The same visual seed is reused across the README hero, docs logo, favicon, and social preview asset.
