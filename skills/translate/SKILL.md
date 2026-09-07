---
name: translate
description: Create or synchronize i18n translation files using the project's actual source language and requested or configured target locales. Not for general text editing or code review.
---

# Translate Skill

Discover the project's i18n setup and synchronize translations within the requested scope. Audit-only requests return findings without changing files. Autonomy changes confirmation behavior, not the requested languages or scope.

## Discover Source and Targets

- Inspect package dependencies, i18n configuration, extraction scripts, and translation directories to identify the framework, formats, namespaces, and locale conventions.
- Determine the actual source language from project configuration and source messages. A fallback locale alone is not proof of the authoring language. Do not rename or relabel a sole locale as English.
- Use the requested target locales; otherwise use the project's configured targets or existing translation locales. Do not invent a default set of new languages.
- If the source or targets cannot be determined, report what is missing and clarify before dependent edits. Continue any independent audit work. If no i18n setup exists, report that fact; create a new setup only when the user requested it.

## Audit and Synchronize

1. Read the relevant source catalogs and compare messages using the framework's structure, not merely literal key equality. Account for namespaces, ICU select/plural messages, locale-specific plural categories, and framework metadata.
2. Translate missing messages into the selected targets. Preserve valid existing translations and legitimate locale-specific variants.
3. Identify changed source messages using available history, source hashes, fuzzy markers, or catalog metadata. Update affected translations when the change is established. If freshness cannot be established, report the uncertainty rather than treating matching keys as proof of current translations.
4. Investigate target-only entries before removing anything. Delete only entries confirmed obsolete by the source/extraction workflow and usage evidence within the task's scope. Preserve ambiguous entries and report them.

## Translation and Validation

- Preserve interpolation variables, positional arguments, markup, and message syntax. Use the framework's required plural/select forms for each target language; do not force English's forms onto other locales.
- Keep translations natural and idiomatic. Preserve format, encoding, nesting, and ordering conventions except where the framework requires locale-specific differences.
- Run the project's available catalog validation or compilation and focused checks for placeholders and plural/select syntax. Distinguish structural validation from linguistic review.
- Report languages and messages updated, validation results, and ambiguities needing review. Return to the parent task's completion workflow; do not invoke the checklist recursively.
