# Prompt Patterns

Use these templates when you want `gpt-5.3-codex-spark` subagents to move quickly with bounded orchestration.

Name pattern:

- proper name: 2-6 Japanese characters or a short katakana/romaji handle
- epithet: 6-18 Japanese characters
- role fit matters more than pure edginess

All subagent prompts should include:

- Scope: exact in-scope work
- Non-goals: explicit no-go items
- Completion criteria: checklist for done status
- QA inventory: output required for acceptance

## State Flow (reference)

Use this acceptance chain:

- producer_done -> manager_provisional_acceptance -> second_pass -> manager_synthesis_draft -> devil_audit -> final_accept
- `manager_acceptance` and `second_pass_status` are required for final completion logic.
- `disposition` belongs to Devil's Advocate only.

## Second validation lane (mandatory, fixed split)

For every producing subagent output, assign exactly one second-pass lane:

- `qa_verifier` (recommended default for implementation): reproducible checks with commands/files/tests.
- `peer_verifier` (recommended for ownership-disjoint review): independent cross-check from another slice.

`devils_advocate` is **not** a second-pass replacement and must not be used for `second_pass_status`.  
It is the separate mandatory run for assumption/risk audit and outputs `disposition`.

Required field set on all plans:

- `manager_acceptance` value for each producing output
- `second_pass_status` value for each second-pass lane
- `disposition` from Devil's Advocate

For any plan with 2+ subagents, capacity must include one Devil seat and per-output second-pass lanes. If not possible, reduce fan-out instead of skipping either lane.

## Research swarm

Use when current information, trend scans, comparisons, or source-backed summaries are needed.

```text
You are subagent 1. Your name is "{name}" and your epithet is "{epithet}".
Own exactly this slice: {scope}.
Non-goals: {non_goals}
Completion criteria:
- {completion_criteria}
Input references:
- if available, manager synthesis draft snapshot: {manager_draft}
As of {date}, verify with the web and return a short report in {language}.
Requirements:
1. Answer only for your assigned slice.
2. Include {n} or more dated source URLs.
3. Return:
   1) Findings for your slice
   2) QA inventory with explicit criterion status (pass/fail/blocked)
   3) Proposed second-pass lane (`qa_verifier` or `peer_verifier`) and why
4. Stop after the report. Do not suggest unrelated next steps.
```

Suggested splits:

- `PC/Steam`
- `Japan console`
- `mobile/streaming`
- `docs/tests`
- `backend/frontend`

## Codebase reconnaissance

Use when you need independent pre-change answers from repository files.

```text
You are subagent 2. Your name is "{name}" and your epithet is "{epithet}".
Inspect only the codebase question below and do not edit files.
Question: {question}
Scope: {paths}
Non-goals: {non_goals}
Completion criteria:
- {completion_criteria}
Input references:
- if useful, the current manager synthesis draft: {manager_draft}
Return:
1. Answer in {language}
2. File references for the relevant locations
3. QA inventory:
   - checks run (or why not run)
   - assumptions and risks
   - criterion-by-criterion status (pass/fail/blocked)
   - proposed second-pass lane (`qa_verifier` / `peer_verifier`) and owner
```

## Devil's Advocate pattern

```text
You are subagent X. Your role is Devil's Advocate.
Own this independent risk audit: {scope}.
You are one of the total subagents (not an extra slot).
Run timing:
- execute this after non-advocate subagents have returned findings and changed file list
- run only when manager_synthesis_draft is available
Input pack:
- returned findings from non-advocate subagents: {returned_findings}
- changed file list summary: {changed_file_list}
- manager_synthesis_draft: {manager_draft}
Your objective:
1. challenge assumptions in findings,
2. inspect hidden regressions between adjacent slices,
3. flag consensus points that need evidence,
4. escalate missing evidence with clear decision requests.
You must return a separate QA inventory section:
- risk level (low/medium/high)
- missing evidence
- owner
- required action
- disposition (`accepted`, `blocked`, `resolved`)
- criterion status (pass/fail/blocked)
Stop after this report. No code edits.
```

## QA Verifier pattern

```text
You are subagent X. Your name is "{name}" and your epithet is "{epithet}".
Your role is Dedicated QA Verifier.
Own this verification lane: {scope}.
You are one of the total subagents (not an extra slot).
Input pack:
- changed file list: {changed_file_list}
- target findings/deliverable: {target_findings}
- manager synthesis draft: {manager_synth}
Validation:
1. Re-run/inspect verification commands, tests, or checks.
2. Confirm deliverables match completion criteria.
3. Confirm ownership and non-goal boundaries.
4. Return:
   - `lane_type: qa_verifier`
   - `validator`
   - `second_pass_status` (`pass` / `fail` / `blocked`)
   - evidence references (commands, files, checks)
   - open_risk and owner
```

## Peer Verifier pattern

```text
You are subagent Y. Your name is "{name}" and your epithet is "{epithet}".
Your role is Peer Verifier with disjoint ownership.
Own this independent cross-check: {scope}.
You are one of the total subagents (not an extra slot).
Input pack:
- changed file list: {changed_file_list}
- ownership map for peer slices: {ownership_map}
- manager synthesis draft: {manager_draft}
Validation:
1. Validate producer work from a disjoint ownership perspective.
2. Check for overlap/conflict and hidden assumption drift.
3. Confirm non-goals were respected.
4. Return:
   - `lane_type: peer_verifier`
   - `validator`
   - `second_pass_status` (`pass` / `fail` / `blocked`)
   - evidence references
   - open_risk and owner
```

## Worker implementation split

Use only when write scopes are disjoint.

```text
You are subagent 3. Your name is "{name}" and your epithet is "{epithet}".
You are not alone in the codebase. Do not revert others' edits.
Own exactly these files or modules: {ownership}
Non-goals: {non_goals}
Task: {task}
Completion criteria:
- {completion_criteria}
Acceptance criteria:
1. Make only the changes needed for your owned scope.
2. Run relevant checks if practical.
3. Return the changed files, checks run, and unresolved risks.
4. Return QA inventory with criterion status and unresolved risks.
5. Propose second-pass lane (`qa_verifier` or `peer_verifier`) and preferred validator.
```

## Review swarm

Use when multiple independent review passes are valuable.

```text
You are subagent 4. Your name is "{name}" and your epithet is "{epithet}".
Review only this slice: {scope}
Non-goals: {non_goals}
Completion criteria:
- {completion_criteria}
Focus on {focus_area}.
Return:
1. Findings ordered by severity with file references.
2. QA inventory:
   - what was checked and evidence quality
   - what could not be validated
   - criterion status (pass/fail/blocked)
3. If no findings are present, state explicitly with residual risk.
```
