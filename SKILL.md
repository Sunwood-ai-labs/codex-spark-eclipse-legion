---
name: codex-spark-eclipse-legion
description: Summon native Codex subagents with the `gpt-5.3-codex-spark` model as a named legion with chuunibyou-style aliases, explicit ownership, minimal context, selective waits, and teammate-by-teammate reporting. Use when the user asks for Spark subagents, wants aggressive fan-out across 2-4 independent workstreams, or wants dramatic teammate names plus a clear report of who did what.
---

# Codex Spark Eclipse Legion

Use this skill when the task should be pushed through native Codex subagents instead of MCP or external orchestrators.

Default to the model slug `gpt-5.3-codex-spark`. Favor fast, bounded delegation with strong ownership and short reports over vague "go explore" prompts.

## Use This Skill When

- The user explicitly asks for `GPT-5.3-Codex-Spark`, Spark subagents, or "3 people in parallel".
- The task splits cleanly into 2-4 independent tracks such as research slices, codebase questions, review slices, or disjoint file ownership.
- The user wants named teammates, roles, or a final report that explains who investigated what.
- The task benefits from fast parallel passes, but does not require shared mutable state across agents.

Skip this skill when the next step is blocked on one urgent answer, the task is tiny, or multiple agents would collide on the same files.

## Naming Ritual

Treat each spawned agent like a summoned specialist.

- Give every agent a short proper name and a dramatic epithet.
- Keep the pair memorable and readable in Japanese.
- Match the name to the role so the report feels intentional rather than random.
- Reuse the same names through the whole turn so the user can track who did what.

Good examples:

- `黒羽ライト / 深淵のランキング観測者`
- `星影レイ / 月蝕の売上追跡卿`
- `紫苑ヴェスパー / 終焉の流行詠み`

Avoid names that are so long they make prompts noisy.

## Quick Start

1. Keep the immediate blocking step local. Delegate sidecar work, not the entire critical path.
2. Split the task into 2-4 disjoint scopes with concrete acceptance criteria.
3. Use `fork_context: false` by default. Turn it on only when the agent truly needs the exact conversation history.
4. Set `model: "gpt-5.3-codex-spark"` explicitly for every subagent.
5. Use `default` for general research, `explorer` for codebase questions, and `worker` only for bounded code edits with explicit file ownership.
6. Spawn independent agents in parallel with `multi_tool_use.parallel`.
7. While they run, do non-overlapping local work instead of idling.
8. Wait only when a returned result is needed for the next local step.
9. Close completed agents so you do not hit the thread limit.
10. In the final response, report each teammate's name, epithet, scope, and outcome.

## Prompt Rules

Every delegated prompt should include:

- A machine-usable handle such as `subagent 2`
- A morale booster such as a short name and dramatic epithet
- The exact scope: files, questions, market segment, or platform slice
- The finish line: what to return and how short it should be
- Verification rules:
  For web tasks, require dated sources and links.
  For code tasks, require changed files and note that the agent is not alone in the codebase.
- Non-goals so the agent does not drift into adjacent work

Use the templates in [references/prompt-patterns.md](./references/prompt-patterns.md) instead of rewriting these from scratch.

## Operating Patterns

### Research fan-out

- Split by source family or market, not by vague themes.
- Good split: `PC/Steam`, `Japan console`, `mobile/streaming`.
- Require each agent to cite dates because "latest" changes quickly.

### Codebase reconnaissance

- Use `explorer` agents for separate codebase questions.
- Keep the integration, tradeoff call, and final explanation local.

### Implementation split

- Only use `worker` when write scopes are disjoint.
- Assign ownership by file or module, not by abstract feature labels.
- Tell workers they are not alone in the codebase and must not revert others' edits.

### Review or QA swarm

- One agent can inspect correctness, another can inspect tests, and another can inspect docs or release risks.
- Synthesize findings locally so the user gets one coherent answer.

## Failure Handling

- If you hit `agent thread limit reached`, close completed or idle agents first, then retry the spawn.
- If `wait` times out, do not reflexively wait again. Either continue local work or relaunch a shorter prompt.
- If agents come back `Interrupted`, shrink the prompt, disable `fork_context`, and ask for a smaller deliverable.
- If a subagent's runtime cannot prove the model name, report that the model was requested as `gpt-5.3-codex-spark` and that runtime visibility may be hidden.

See [references/recovery.md](./references/recovery.md) for retry patterns and reporting language.

## Reporting Contract

When you use this skill, the final response should make it easy to answer:

- Which Spark subagents ran
- Which names and epithets they were given
- What each one owned
- What each one returned
- Which sources or checks backed the result
- What was not finished or had to be retried

Short example:

- `黒羽ライト / 深淵の観測者`: PC and Steam trend scan, returned dated source-backed summary.
- `星影レイ / 月蝕の売上追跡卿`: Japanese console and sales ranking scan, returned domestic trend summary.
- `紫苑ヴェスパー / 終焉の流行詠み`: Mobile and streaming trend scan, returned social buzz summary.

## References

- For reusable prompt shapes, read [references/prompt-patterns.md](./references/prompt-patterns.md).
- For thread limits, timeouts, and retry wording, read [references/recovery.md](./references/recovery.md).
