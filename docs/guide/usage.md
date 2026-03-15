# Usage

## When to activate the skill

Reach for Codex Spark Eclipse Legion when the task has multiple non-blocking tracks such as:

- source-backed research slices
- codebase reconnaissance questions
- disjoint implementation ownership
- review or QA swarms

Do not reach for it just because multiple agents sound exciting. The next blocking step should usually stay local.

## Main Agent vs Subagent

This repository is optimized for a manager-led workflow:

- The main agent owns intent, acceptance criteria, risk decisions, and final synthesis.
- Subagents are junior teammates who need explicit direction, so prompts should include concrete scope, explicit non-goals, and explicit finish conditions.
- The main agent should remain ready to make the final call when outputs conflict or assumptions are invalid.
- For every multi-subagent run (two or more), allocate a fixed Devil's Advocate role from that same roster.
- If the Devil's Advocate role cannot be staffed, reduce fan-out instead of expanding scope.
- Every producing subagent must also run a separate second validation lane: `qa_verifier` or `peer_verifier` (never replaced by Devil's Advocate).
- `manager_acceptance` and `second_pass_status` are per producer, and both must be positive (`accepted` and `pass`) before final inclusion.
- Required flow:
  - `producer_done -> manager provisional acceptance -> second_pass -> manager synthesis draft -> devil_audit -> final_accept`
- If implementation-critical outputs cannot support this sequence, reduce fan-out or skip fan-out.

## Prompt design rules

Every delegated prompt should include:

- a subagent handle such as `subagent 1`
- a memorable name and epithet
- an exact scope
- a finish line that says what to return and how short to keep it
- verification expectations, especially links or changed files when relevant
- a non-goal list to prevent drift
- if two or more subagents are used, a dedicated Devil's Advocate assignment and escalation policy
- if per-subagent QA verification is needed, explicitly designate a QA verifier (or peer-check) lane and scope
- reserve seat: before fan-out
- run order: producer_done -> manager provisional acceptance -> second_pass -> manager synthesis draft -> devil_audit

A Devil's Advocate output is operationally mandatory and is treated like a separate QA lane.
They audit only:
- returned findings
- changed file lists
- manager synthesis draft
They must challenge assumptions and missing evidence in those inputs, check for hidden cross-slice regressions, and stop final synthesis from closing while high-impact issues remain.

The QA verifier lane is distinct:
- it validates each producing subagent output on objective criteria,
- the Devil's Advocate validates cross-cutting synthesis assumptions, regressions, and evidence sufficiency.

Status definitions:
- `manager_acceptance`: provisional manager decision on each producer output.
- `second_pass_status`: result from assigned `qa_verifier` / `peer_verifier` (`pass`/`fail`).
- `disposition`: Devil's Advocate outcome of risk treatment (`accepted` / `blocked` / `resolved`), not the same as second-pass grading.

## Delegation package

Before assigning a subagent, define:

- Scope: what must be done.
- Non-goals: what must not be changed.
- Completion definition: specific files, artifacts, and response style expected.
- QA inventory: checks the subagent must perform and report.
- Handoff boundaries: who decides if unresolved risks are acceptable.
- QA inventory for double-check:
  - assign a second verifier (or lane),
  - define the exact commands/checks that verifier will run,
  - define escalation when verifier and main orchestrator disagree.

Acceptance rule:
- a producer reaches completion only when `manager_acceptance=accepted` and `second_pass_status=pass`.

Devil's Advocate handoff input:
- returned findings
- changed file list
- manager synthesis draft

### Example of a concrete QA inventory

- Static checks: run `npm run docs:build` and report pass/fail.
- Ownership checks: confirm only files in the assigned scope were edited.
- Evidence checks: attach changed paths plus the command outputs used to validate them.
- Governance checks: note any decision point that should be escalated to the main agent.
- Risk checks: explicitly call out blockers, retries, or assumptions.
- Per-subagent acceptance checks: each producing subagent output is accepted only after both the main orchestrator and the QA verifier lane sign off.
- Final synthesis check: confirm the final synthesis references the per-subagent acceptance results.
- Final `final_accept` condition: every producing subagent has `manager_acceptance=accepted && second_pass_status=pass`; otherwise synthesis remains blocked regardless of Devil's Advocate disposition.

## Completion criteria for subagent outputs

Subagent work is complete when scope, non-goals, finish line, and QA inventory are all satisfied, or when blockers are documented with a clear escalation path.

## Expected report shape

The final answer should make it obvious:

- which Spark subagents ran
- what each one owned
- what each one returned
- which QA inventory items passed, failed, or stayed blocked
- which checks or sources backed the result
- what failed, retried, or stayed unfinished
- whether the Devil's Advocate escalated assumptions or missing evidence for the manager

Devil's Advocate return format:

- risk level: low / medium / high
- missing evidence: list
- owner: responsible role/person
- required action: next verification or decision step
- disposition: accepted | blocked | resolved

## Example split

```text
Use $codex-spark-eclipse-legion.
- subagent 1: docs drift review
- subagent 2: qa_verifier (docs build verification)
- subagent 3: release-note impact scan
- subagent 4: Devil's Advocate (cross-slice regression and evidence gap audit)

Scope:
- Update `docs/guide/usage.md` only.
- Do not edit `README.ja.md`, `SKILL.md`, or `references/`.

Run order:
- reserve Devil's Advocate (subagent 4) before starting fan-out
- run producers (subagent 1, 3) and record:
  - producer_done
  - manager provisional acceptance (`accepted` / `blocked`)
- run second-pass lane (subagent 2) against each producer and record `second_pass_status`
- manager synthesis draft:
  - draft synthesis based on returned findings and changed file list
- devil_audit:
  - run against returned findings + file list + manager draft
- final_accept only if every producer has `manager_acceptance=accepted` and `second_pass_status=pass`.

Finish line:
- Return changed file list and a short rationale.
- Provide three QA checks + evidence.
Keep the overall synthesis and decision local.
```

## Maintenance reminder

If you evolve the repo's guidance, keep the examples in `SKILL.md`, the README files, and these docs aligned so users do not see conflicting orchestration advice.
