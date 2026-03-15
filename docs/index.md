---
layout: home
title: Codex Spark Eclipse Legion
hero:
  name: Codex Spark Eclipse Legion
  text: Summon a named Spark squad without losing control
  tagline: A Codex skill for fast native subagent fan-out, explicit ownership, and teammate-by-teammate reporting.
  image:
    src: /legion-mark.svg
    alt: Codex Spark Eclipse Legion mark
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Sunwood-ai-labs/codex-spark-eclipse-legion
    - theme: alt
      text: Read in Japanese
      link: /ja/
features:
  - title: Dramatic teammate naming
    details: Give every Spark agent a short codename and an epithet so the final report feels deliberate and easy to scan.
  - title: Sharp ownership boundaries
    details: Split work into 2-4 independent slices, keep the critical path local, and delegate only bounded sidecar tasks.
  - title: Manager-led delivery
    details: The main agent remains accountable for decisions and synthesis, while subagents execute explicit, bounded tasks with clear acceptance criteria.
  - title: Calm recovery paths
    details: Handle thread limits, wait timeouts, interrupted runs, and model-visibility ambiguity without losing momentum.
---

## Why this repository exists

This repository turns the raw skill definition into a public-facing package with bilingual onboarding, docs, visual assets, and deployment automation. The root `SKILL.md` remains the source of truth, while these docs explain how to adopt and maintain it.

## What to read next

- Start with [Getting Started](/guide/getting-started) for installation, prerequisites, and the first prompt.
- Continue to [Usage](/guide/usage) for delegation scope design, completion criteria, and QA inventory examples.
- Visit [Architecture](/guide/architecture) to see why the repository keeps manager and worker responsibilities separated in a compact layout.
- Keep [Troubleshooting](/guide/troubleshooting) handy for stalled or interrupted subagent runs.
