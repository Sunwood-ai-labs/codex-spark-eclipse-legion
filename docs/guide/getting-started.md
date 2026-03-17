# Getting Started

## What you need

- A Codex environment where this skill can be listed or referenced
- Tasks that genuinely benefit from a 3-4 seat roster, usually 1-2 producers plus mandatory Devil's Advocate and Material Design support
- Comfort with keeping the immediate blocking step local

## Installation flow

1. Clone this repository from [GitHub](https://github.com/Sunwood-ai-labs/codex-spark-eclipse-legion), or place it somewhere your Codex environment can access it.
2. Keep the root `SKILL.md`, `references/`, and `agents/openai.yaml` together so the repository stays self-contained.
3. Mention `$codex-spark-eclipse-legion` when the user asks for Spark teammates, parallel work, or a teammate-by-teammate report.

## First prompt

Use a short request that makes the parallel split explicit.

```text
Use $codex-spark-eclipse-legion to fan this review out across four Spark subagents.
Keep the merge decision local.
Reserve one Material Design designer and one Devil's Advocate.
Let the other teammates inspect docs drift and peer verification in parallel.
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
- The final response names each teammate, their scope, what they returned, and the final `material_design_status`.
