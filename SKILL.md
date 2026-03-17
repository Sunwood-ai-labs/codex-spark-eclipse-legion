---
name: codex-spark-eclipse-legion
description: Summon native Codex subagents with the `gpt-5.3-codex-spark` model as a named legion with chuunibyou-style aliases, explicit ownership, mandatory Devil's Advocate and Material Design designer seats, minimal context, selective waits, and teammate-by-teammate reporting. Use when the user asks for Spark subagents, wants aggressive fan-out across 2-4 independent workstreams, or wants dramatic teammate names plus a clear report of who did what.
---

# Codex Spark Eclipse Legion

Use this skill when the task should be pushed through native Codex subagents instead of MCP or external orchestrators.

Default to the model slug `gpt-5.3-codex-spark`. Favor fast, bounded delegation with strong ownership and short reports over vague "go explore" prompts.

## Management and Operator Split

When you use this skill, you are the manager by default and should keep orchestration and final synthesis tight. Subagents are operators with bounded execution authority.

- Main agent duty: define boundaries, coordinate dependencies, integrate outputs, and finalize decisions.
- Subagent duty: execute only the scoped slice, keep to non-goals, and report results with QA inventory plus executed-check evidence.
- Treat every subagent as a `junior teammate` who needs explicit instructions and a checklist.

## Unified Orchestration Model

The flow for any plan with two or more subagents is:

`producer_done -> manager_provisional_acceptance -> second_pass -> manager_synthesis_draft -> devil_audit -> final_accept`

State vocabulary is fixed:

- `manager_acceptance`: status of each producing output (`accepted`, `requires adjustment`, `blocked`)
- `second_pass_status`: status of each producing output second validation (`pass`, `fail`, `blocked`)
- `material_design_status`: status of the mandatory Material Design review (`pass`, `requires adjustment`, `not_applicable`, `blocked`)
- `disposition`: Devil's Advocate result (`accepted`, `blocked`, `resolved`)

Final completion condition:

- every producing output has `manager_acceptance = accepted`
- every producing output has `second_pass_status = pass`
- `material_design_status = pass` or `not_applicable`

## Required Seats and Capacity

For any plan with two or more subagents, all are required:

- one dedicated Devil's Advocate seat for the entire run,
- one dedicated Material Design Designer seat for the entire run,
- one second-pass lane for each producing subagent output.

If required capacity cannot be ensured, do not fan-out; reduce scope and rerun with fewer agents.
Because both fixed seats consume roster capacity, most runs should cap at 1-2 producing subagents unless second-pass can be handled by peer verification without collisions.

## Material Design Seat Rules

`material_design_designer` is a mandatory design-system audit lane for any multi-subagent plan. It is distinct from both `qa_verifier` / `peer_verifier` and `devils_advocate`.

Responsibilities:

- audit user-facing surfaces, interaction states, hierarchy, spacing, theming, and accessibility against Material Design expectations
- return concrete component guidance and required follow-up for UI-affecting work
- if no user-facing surface changed, explicitly return `material_design_status = not_applicable` with a short rationale

It is not:

- a second-pass replacement
- a Devil's Advocate replacement
- the final decision-maker on product tradeoffs

Run timing:

- reserve the seat before fan-out
- execute after producer outputs are available
- record `material_design_status` before the manager finalizes `manager_synthesis_draft`
- treat it as a required supporting lane, not a replacement for the canonical state chain

## Second-Validation Lane Rules

Second-pass is one of:

- `qa_verifier`: reproducible checks with commands/files/tests.
- `peer_verifier`: independent confirmation from a disjoint ownership slice.

`devils_advocate` and `material_design_designer` are not second-pass replacements.
The former is an assumption/risk audit lane used in `devil_audit` and only produces `disposition` and escalation actions.
The latter is a design-system audit lane that produces `material_design_status`, component guidance, accessibility notes, and required actions.

Run order:

1. Reserve Devil's Advocate seat + Material Design Designer seat + per-output second-pass assignments before fan-out.
2. Run producing and supporting subagents.
3. On return, set `manager_provisional_acceptance` as `manager_acceptance` (`accepted`/`requires adjustment`/`blocked`).
4. Run second-pass (`qa_verifier` or `peer_verifier`) for each producing output and record `second_pass_status`.
5. Run Material Design review and record `material_design_status`.
6. Draft manager synthesis and provide to Devil's Advocate.
7. Run Devil's Advocate audit and record `disposition`.
8. Finalize only when completion condition holds.

## Use This Skill When

- The user explicitly asks for `GPT-5.3-Codex-Spark`, Spark subagents, or "3 people in parallel".
- The task splits cleanly into 2-4 independent tracks such as research slices, codebase questions, review slices, or disjoint file ownership.
- The user wants named teammates, roles, or a teammate-by-teammate final report.
- The task benefits from fast parallel passes without shared mutable state across agents.

Skip this skill when the next step is urgent, the task is tiny, or multiple agents would collide on the same files.

## Naming Ritual

- Give every agent a short proper name and a dramatic epithet.
- Keep the pair memorable and readable.
- Match the name to role ownership.
- Reuse the same names throughout a turn.

Good examples:

- `黒羽ライト / 深淵のランキング観測者`
- `星影レイ / 月蝕の売上追跡卿`
- `紫苑ヴェスパー / 終焉の流行詠み`

Avoid names that are so long they make prompts noisy.

## Quick Start

1. Keep the immediate blocking step local. Delegate sidecar work, not the entire critical path.
2. Split the task into 2-4 disjoint scopes with concrete acceptance criteria.
   - Split only when the required Devil seat, required Material Design seat, and required second-pass slots are guaranteed.
   - With both fixed seats present, practical producer capacity is usually 1-2 subagents.
3. Set `model: "gpt-5.3-codex-spark"` explicitly for every subagent.
4. Spawn in parallel with `multi_tool_use.parallel`.
5. While running, do non-overlapping local work.
6. Wait only when the next local step requires returned results.
7. Close completed agents so you do not hit thread limits.
8. In final response, report names/epithets, scope, outcomes, QA inventory performed, and QA status.

## Prompt Rules

Every delegated prompt should include:

- A machine-usable handle such as `subagent 2`
- A short name and dramatic epithet
- Exact scope and non-goals
- Finish line and completion criteria checklist
- A second-pass assignment for producing outputs (`qa_verifier` or `peer_verifier`)
- A Material Design review assignment, or an explicit `no user-facing surface` check
- Verification rules:
  - web tasks: dated sources and links
  - code tasks: changed files and non-goal boundaries
- A QA inventory requirement and acceptance checks

For any plan with two or more subagents, include the required Devil seat, required Material Design seat, second-pass plan, and expected `manager_acceptance` / `second_pass_status` / `material_design_status` handling.

QA inventory (required per subagent):

1. File-level deliverables or findings with exact locations.
2. Checks executed (commands, manual tests, comparisons, or reasoning notes).
3. Assumptions or risks that could affect correctness.
4. What is still unverified and why.
5. Criterion status (`pass` / `fail` / `blocked`) for each item.
6. `manager_acceptance` plus rationale.
7. `second_pass_status` with lane (`qa_verifier` or `peer_verifier`) and evidence.
8. For Material Design Designer: `surface_scope`, `material_design_status`, `component guidance`, `accessibility notes`, `required action`.
9. For Devil's Advocate: `risk level`, `missing evidence`, `owner`, `required action`, `disposition`.

Use templates in [references/prompt-patterns.md](./references/prompt-patterns.md).

## Operating Patterns

### Research fan-out

- Split by source family/market, not vague themes.
- Require each agent to cite dates when using the web.

### Codebase reconnaissance

- Use independent `explorer` style subagents for questions.
- Keep synthesis locally.

### Implementation split

- Use `worker` only when write scopes are disjoint.
- Assign ownership by file/module.

### Review or QA swarm

- Separate correctness/tests/risk reviews by owner.
- Route user-facing system and component review to the Material Design designer seat.
- Synthesize findings locally to one coherent answer.

## Failure Handling

- If `agent thread limit reached`, close completed/idle agents first, then retry.
- If `wait` times out, continue local work or relaunch a shorter prompt.
- If a subagent is `Interrupted`, shrink the prompt and request a smaller deliverable.
- If model identity is not visible in runtime, report request as `gpt-5.3-codex-spark` was set.

See [references/recovery.md](./references/recovery.md) for retry language.

## Reporting Contract

Final response should include:

- Which subagents ran and their roles
- Exact ownership and returned findings
- QA inventory from each output, including what was actually executed versus left unverified
- A compact executed-check summary for each teammate or lane
- Final `manager_acceptance`, `second_pass_status`, `material_design_status`, and Devil `disposition`
- Evidence list and unresolved risks with owners
- What was retried/not finished

In multi-subagent plans, final output is complete only when:

- every producing output has `manager_acceptance = accepted`
- every producing output has `second_pass_status = pass`
- `material_design_status = pass` or `not_applicable`
- Devil's Advocate `disposition` is recorded.

Short example format remains team-wise with outcome summaries and risk statements.
When space is tight, prefer one compact line per teammate that still includes:

- owned scope
- QA inventory performed (for example `uv run pytest`, `npm run docs:build`, smoke run, manual check)
- final acceptance status

## References

- For reusable prompt shapes, read [references/prompt-patterns.md](./references/prompt-patterns.md).
- For thread limits and retries, read [references/recovery.md](./references/recovery.md).
