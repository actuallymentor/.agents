---
name: translate
description: Trigger when the user wants to sync, update, or create i18n translation files. Finds the project's translation module, maps translation files, and ensures all languages are up to date using English as the canonical source. Do NOT trigger for code reviews, style checks, or general text editing.
---

# Translate Skill

Discover the project's i18n setup, map translation files, and synchronize all languages against the English canonical source.

## YOLO Mode

Before starting, check `echo $AGENT_AUTONOMY_MODE`. If set to `yolo`, operate fully autonomously — skip all user confirmations, proceed through every step without asking.

## Step 1: Discover Translation Module

Search the project for an i18n / translation module:

1. **Package files** — check `package.json`, `Gemfile`, `requirements.txt`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `composer.json` for i18n libraries (e.g. `i18next`, `react-intl`, `vue-i18n`, `gettext`, `ruby-i18n`, `fluent`)
2. **Config files** — look for `i18n.config.*`, `next-i18next.config.*`, `.i18nrc`, `babel.config.*` with i18n plugins, or similar
3. **Code imports** — grep for `import.*i18n`, `require.*i18n`, `from.*i18n`, `useTranslation`, `t(`, `I18n.t` patterns
4. **Translation directories** — check for `locales/`, `translations/`, `i18n/`, `lang/`, `messages/`, `src/locales/`, `public/locales/`

**If no translation module or translation files are found, inform the user and stop immediately.** Do not proceed.

If found, report:
- Which i18n library is in use
- Where translation files live
- What format they use (JSON, YAML, PO, XLIFF, etc.)
- Which languages currently exist

## Step 2: Audit and Sync Translations

Use English (`en`) as the canonical language.

### If multiple language files already exist:

1. Read the English source file in full
2. For each other language file, compare keys against English
3. Identify **missing keys** (in English but not in target) and **orphaned keys** (in target but not in English)
4. Translate missing keys into the target language
5. Remove orphaned keys to keep files in sync
6. Preserve existing translations — only touch missing or orphaned entries

### If only one language file exists:

1. Treat it as the English canonical source (rename if needed)
2. Create language files for: **es** (Spanish), **de** (German), **ja** (Japanese), **fr** (French), **pt** (Portuguese), **ru** (Russian), **it** (Italian), **nl** (Dutch), **pl** (Polish), **zh** (Chinese)
3. Translate all keys into each new language
4. Match the file format and naming convention of the original

## Translation Guidelines

- Preserve interpolation variables (`{{name}}`, `{count}`, `%{user}`, `%s`, etc.) exactly as-is
- Respect pluralization rules for each target language
- Keep translations natural and idiomatic — not word-for-word literal
- Maintain the same nesting structure and key order as the English source
- Use UTF-8 encoding for all files

## Step 3: Report

Summarize what was done:
- Languages updated or created
- Number of keys translated per language
- Any keys that were ambiguous or need human review (flag these clearly)
