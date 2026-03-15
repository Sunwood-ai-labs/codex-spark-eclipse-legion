# Usage

## When to activate the skill

Reach for Codex Spark Eclipse Legion when the task has multiple non-blocking tracks such as:

- source-backed research slices
- codebase reconnaissance questions
- disjoint implementation ownership
- review or QA swarms

Do not reach for it just because multiple agents sound exciting. The next blocking step should usually stay local.

## Prompt design rules

Every delegated prompt should include:

- a subagent handle such as `subagent 1`
- a memorable name and epithet
- an exact scope
- a finish line that says what to return and how short to keep it
- verification expectations, especially links or changed files when relevant

## Expected report shape

The final answer should make it obvious:

- which Spark subagents ran
- what each one owned
- what each one returned
- which checks or sources backed the result
- what failed, retried, or stayed unfinished

## Example split

```text
Use $codex-spark-eclipse-legion.
- subagent 1: docs drift review
- subagent 2: build and test risk review
- subagent 3: release-note impact scan
Keep the overall synthesis and decision local.
```

## Maintenance reminder

If you evolve the repo's guidance, keep the examples in `SKILL.md`, the README files, and these docs aligned so users do not see conflicting orchestration advice.

