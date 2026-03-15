<div align="center">
  <img src="docs/public/legion-hero.svg" alt="Codex Spark Eclipse Legion hero art" width="100%" />
  <h1>Codex Spark Eclipse Legion</h1>
  <p><strong>Summon named <code>gpt-5.3-codex-spark</code> subagents with crisp ownership, short prompts, and teammate-by-teammate reporting.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Codex-Skill-0f172a?style=flat-square" alt="Codex Skill" />
    <img src="https://img.shields.io/badge/Subagents-GPT--5.3--Codex--Spark-f97316?style=flat-square" alt="Spark subagents" />
    <img src="https://img.shields.io/badge/Docs-VitePress-14b8a6?style=flat-square" alt="VitePress docs" />
    <img src="https://img.shields.io/badge/License-MIT-16a34a?style=flat-square" alt="MIT License" />
  </p>
  <p>
    <a href="./README.md"><strong>English</strong></a> |
    <a href="./README.ja.md"><strong>日本語</strong></a>
  </p>
</div>

## ✨ Overview

Codex Spark Eclipse Legion is a focused skill for moments when one agent is not enough and a giant orchestrator would be overkill. It teaches Codex how to summon a small squad of native Spark subagents, give each one a memorable codename, keep ownership boundaries sharp, and report outcomes teammate by teammate.

The repository now ships a polished public surface:

- a guided English and Japanese README
- a bilingual VitePress documentation site
- reusable SVG identity assets for the README and docs
- GitHub Actions workflows for docs validation and Pages deployment

## ⚡ Quick Start

1. Place this repository somewhere your Codex environment can read it.
2. Use the skill name `codex-spark-eclipse-legion` or mention `$codex-spark-eclipse-legion` in a request when a task benefits from 2-4 parallel subagents.
3. Keep the immediate blocking step local and delegate only the non-blocking sidecar work.

Preview the docs locally:

```bash
npm install
npm run docs:dev
```

Build the docs for CI or Pages:

```bash
npm run docs:build
```

## 🧭 When To Use It

Use this skill when:

- the task splits cleanly into independent tracks such as research slices, QA passes, or file ownership
- the user explicitly wants Spark teammates, aggressive fan-out, or a teammate-by-teammate report
- you want named subagents without dragging in a heavier external orchestrator

Skip it when the next answer is urgently needed on the critical path, when the task is tiny, or when multiple agents would collide on the same files.

## 🛰️ What The Skill Enforces

- Dramatic but readable teammate names and epithets
- Explicit ownership for each delegated slice
- Selective waiting instead of reflexively blocking on every agent
- Short final reports that explain who owned what and what came back
- Recovery guidance for thread limits, timeouts, and interrupted runs

The authoritative behavior lives in the root `SKILL.md`. The docs in this repo are the public-facing guide for learning and maintaining that skill.

## 🧱 Repository Layout

- `SKILL.md`: the operational skill definition used by Codex
- `agents/openai.yaml`: a concise interface description for compatible tooling
- `references/prompt-patterns.md`: reusable prompt templates for research, reconnaissance, workers, and review swarms
- `references/recovery.md`: retry and recovery playbook for common orchestration failures
- `docs/`: bilingual VitePress site for onboarding and maintenance

## 📚 Documentation Map

- [Docs home](./docs/index.md)
- [Getting started](./docs/guide/getting-started.md)
- [Usage guide](./docs/guide/usage.md)
- [Architecture notes](./docs/guide/architecture.md)
- [Troubleshooting](./docs/guide/troubleshooting.md)
- [Contributing](./CONTRIBUTING.md)
- [Japanese README](./README.ja.md)

## 🤝 Maintenance Notes

- Keep examples in `SKILL.md`, `README.md`, `README.ja.md`, and `docs/` aligned when behavior changes.
- Prefer short, bounded prompt examples over giant orchestration scripts.
- If you add Python helpers later, run them with `uv run ...` rather than bare `python ...`.
- Use [CONTRIBUTING.md](./CONTRIBUTING.md) as the shared checklist for public-facing updates.

## 📄 License

This repository is released under the [MIT License](./LICENSE).
