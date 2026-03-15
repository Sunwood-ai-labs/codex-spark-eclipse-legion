# Troubleshooting

## Thread limit reached

If a spawn fails because the thread or agent limit is exhausted:

1. Close completed agents first.
2. Retry only the agents you still need.
3. Reduce the batch size from 3-4 down to 2 if the limit keeps recurring.

## Wait timed out

If `wait` returns before the result is final:

1. Decide whether that result is needed on the critical path right now.
2. Continue useful local work when you can.
3. Wait longer once or relaunch a shorter prompt only when the result truly blocks the next step.

## Agents returned interrupted

Common causes:

- the prompt was too long
- `fork_context` was unnecessary
- the finish line was vague

Shorten the prompt, keep `fork_context: false` unless proven necessary, and ask for one bounded deliverable.

## Model visibility is unclear

Sometimes runtime metadata does not expose the active model name. Safe reporting language:

```text
The subagent was requested with model `gpt-5.3-codex-spark`, but runtime metadata did not expose the active model name directly.
```

## Keep recovery boring

The goal of this skill is reliable fan-out, not drama during failure. Prefer small retries, clearer scopes, and fewer concurrent teammates over speculative complexity.

