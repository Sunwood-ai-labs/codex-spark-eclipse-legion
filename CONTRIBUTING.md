# Contributing

## Scope

This repository packages the `codex-spark-eclipse-legion` skill for public use. Changes should keep the root skill definition, the README files, and the docs site aligned.

## Before you open a change

- Confirm whether the behavior change belongs in `SKILL.md`, `references/`, or both.
- Keep English and Japanese user-facing docs structurally parallel when you update guidance.
- Reuse the existing SVG identity assets unless the visual direction truly changes.

## Local checks

Install dependencies once:

```bash
npm install
```

Run the docs build before finishing:

```bash
npm run docs:build
```

If you add Python helpers in the future, run them with `uv run ...`.

## Content sync checklist

- Update `SKILL.md` when the operational behavior changes.
- Update `README.md` and `README.ja.md` when onboarding or positioning changes.
- Update the matching English and Japanese docs pages when guide content changes.
- Keep examples short, bounded, and ownership-oriented.

## Commit style

- Prefer small, recoverable commits.
- Make the user-facing impact obvious in the commit message.
- Avoid mixing unrelated docs, workflow, and behavior edits in one change when possible.

