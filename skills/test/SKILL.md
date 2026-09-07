---
name: test
description: Discover, run, and analyze relevant repository tests; repair task-related failures when implementation is authorized. Use for test requests and task verification, not general testing concepts or code reviews.
---

# Test Runner

Run checks that meaningfully verify the requested behavior. Report evidence, distinguish product failures from environment problems, and repair failures within the authorized task.

## Scope and autonomy

- Explicit test-only, discovery-only, or analysis-only requests do not authorize code fixes, including in YOLO mode. Honor any selected suites, files, or patterns.
- Check `AGENT_AUTONOMY_MODE` case-insensitively. In YOLO or an authorized autonomous implementation task, choose relevant checks and repair task-related failures without routine confirmations. Do not fix unrelated or pre-existing failures merely because tests exposed them.
- When invoked by a parent workflow, return results to it. Passing tests or absent test configuration ends this skill's test discovery, not the parent task's verification obligation. Do not restart the completion checklist or commit independently.

## Discover and select checks

Read applicable testing preferences and the repository's instructions. Discover commands from its package or build configuration, CI workflows, and documentation: for example `package.json`, `Makefile`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `pom.xml`, or `Gemfile`.

Prefer the project's documented runner and environment. Inspect what aggregate commands execute so you do not rerun their constituent suites unnecessarily.

- Follow an explicit user selection.
- For task verification, select checks covering changed behavior and relevant regressions. Use the task's file/diff scope, including new files, while preserving unrelated work.
- For an unqualified request to run tests, use the standard test command when practical. If several independent suites exist, choose a suitable set from the request and state it. Ask only when the choice has a material unresolved consequence; in YOLO use the best in-scope judgment.
- Do not add arbitrary verbose flags or assume every discovered command needs to run.

If no automated test configuration exists, say so. In an implementation workflow, perform appropriate available validation instead, such as running the changed command, exercising the browser flow, or checking the artifact. Absence of a test suite is not evidence that the change works.

## Execute and analyze

Run the selected checks, capturing stdout, stderr, and exit status. Inspect failures, assertions, relevant stack traces, and skipped tests. Do not report success from partial output or treat skipped checks as passing.

For failures, inspect relevant source and distinguish implementation defects, incorrect tests, pre-existing problems, and missing environment requirements. Group failures by root cause and identify the smallest justified repair. Do not weaken assertions just to obtain a pass.

## Repair and verify

When repairs are authorized, fix task-related causes and rerun affected checks. Broaden verification if the fix changes shared behavior or new evidence identifies a regression. Continue until relevant checks pass or a concrete blocker prevents progress; do not stop after an arbitrary single rerun, and do not repeat an unchanged failing command without a new reason.

For test-only requests, report failures without modifying code. If repairs need authorization, present numbered root causes and proposed fixes for user selection. Already-authorized implementation work does not need another confirmation.

Once relevant checks pass, avoid redundant reruns unless further edits or unresolved concerns justify them. Return the commands or suites run, observed pass/fail/skip results, any fixes, and remaining blockers or coverage limits to the parent workflow. Do not invent counts the runner did not provide.
