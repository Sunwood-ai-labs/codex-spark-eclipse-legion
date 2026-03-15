# Getting Started

## What you need

- A Codex environment where this skill can be listed or referenced
- Tasks that genuinely benefit from 2-4 independent workstreams
- Comfort with keeping the immediate blocking step local

## Installation flow

1. Clone this repository from [GitHub](https://github.com/Sunwood-ai-labs/codex-spark-eclipse-legion), or place it somewhere your Codex environment can access it.
2. Keep the root `SKILL.md`, `references/`, and `agents/openai.yaml` together so the repository stays self-contained.
3. Mention `$codex-spark-eclipse-legion` when the user asks for Spark teammates, parallel work, or a teammate-by-teammate report.

## First prompt

Use a short request that makes the parallel split explicit.

```text
Use $codex-spark-eclipse-legion to fan this review out across three Spark subagents.
Keep the merge decision local, but let the teammates inspect tests, docs, and release risk in parallel.
```

## Local docs workflow

Run the documentation site when you want to review or update the public-facing guidance.

```bash
npm install
npm run docs:dev
```

For CI or release checks:

```bash
npm run docs:build
```

## Success criteria

- The delegated slices are genuinely independent.
- Each subagent gets a concrete ownership boundary and a finish line.
- The final response names each teammate, their scope, and what they returned.
