# Recovery

Use this file when Spark subagent orchestration stalls or over-parallelizes.

## Thread limit reached

Symptom:

- spawn fails with a thread or agent limit error

Response:

1. Close completed agents first.
2. Retry only the agents you still need.
3. If the limit keeps recurring, reduce the batch size from 3-4 down to 2.

## Wait timeout

Symptom:

- `wait` returns without a final status

Response:

1. Ask whether the result is needed right now.
2. If not needed, continue useful local work.
3. If needed, either wait longer once or relaunch a shorter prompt.

Do not busy-poll.

## Interrupted agents

Symptom:

- agent returns `Interrupted`

Likely causes:

- prompt too long
- `fork_context` was unnecessary
- finish line was vague

Response:

1. Retry with `fork_context: false`.
2. Reduce the deliverable to one short report.
3. Remove unrelated background context.

## Model visibility is unclear

Sometimes the runtime does not expose the active model name inside the subagent context.

Safe reporting language:

```text
The subagent was requested with model `gpt-5.3-codex-spark`, but runtime metadata did not expose the active model name directly.
```

## Final report fallback

If one or more agents fail, still report:

- which agents launched
- which agents completed
- what useful output was recovered
- what was retried or skipped

Do not pretend all parallel work succeeded if some branches clearly failed.
