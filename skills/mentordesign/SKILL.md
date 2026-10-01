---
name: mentordesign
description: Audit or align an app's UI and UX with Mentor's visual and technical design preferences. Use for design reviews, interface implementation and consistency passes; not backend-only work.
---

# Mentor design

1. **Load rules.** Read project instructions, [visual preferences](../../preferences/visual-design-preferences.md) and [technical preferences](../../preferences/technical-design-preferences.md). Explicit task/project requirements override defaults. Read linked examples only for visual ambiguity; newer written decisions beat older specimens.
2. **Inspect the app.** Identify framework, tokens, fonts, icons, shared controls, navigation and state handling. Run the existing app; inspect representative mobile and desktop screens before changing anything.
3. **Map gaps.** Check hierarchy/spacing, themes, buttons/icons, forms/help, choices, save lifecycle, consequences, loading/errors, lists/charts and motion. Mark each relevant rule satisfied, missing or intentionally overridden. Prioritize broken workflows, unclear state and accessibility over cosmetic polish.
4. **Choose scope.** For a review, report concrete findings with screen/component references and stop. For requested alignment, make a short plan and implement within scope. Reuse shared components/tokens; avoid framework swaps or unrelated redesign. Keep tunable examples tunable. Surface genuine conflicts, especially accent-button contrast; never silently substitute a different brand treatment.
5. **Verify as a user.** Use a real browser. Check narrow/wide layouts, both themes, keyboard/focus, enlarged text and reduced motion. Exercise dirty → saving → saved → edited, failed save/load, confirmation, searchable dropdowns/outside dismissal, chips, pagination and motion where affected. Check long labels and empty states. Test touch gestures on an available touch device; report if unverified. No destructive actions on real data.
6. **Finish.** Run relevant existing checks; inspect rendered results. Report changes, evidence, intentional exceptions and remaining gaps tersely. Preserve useful before/after renders. Do not alter global preferences, publish or push merely because this skill was invoked.
