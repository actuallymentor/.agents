---
name: mentordesign
description: Audit or align app and website UI/UX with Mentor's design preferences. Use for interface reviews, implementation and consistency passes; not backend-only work.
---

# Mentor design

Work through the sections below. Check implementation **and rendered behavior**; a source-code match is not a visual pass.

## 1. Load the current specification

- [ ] Read project instructions, [visual preferences](../../preferences/visual-design-preferences.md) and [technical preferences](../../preferences/technical-design-preferences.md).
- [ ] Establish scope: review or implementation; app, website or both; routes and flows included. A full audit covers all user-facing routes, including authenticated and exceptional states.
- [ ] Resolve precedence: explicit task/project requirements override defaults; current preference files override this checklist and older examples. Preserve intentional exceptions with their reason.
- [ ] Extract every applicable preference bullet and table row into the audit ledger. Distinguish required choices, tunable starting points, inherited guidance and unresolved decisions.
- [ ] Map each extracted rule to a check below. Add a concrete run-specific check for every unmapped rule; never silently skip newly added preferences.
- [ ] Read exact colors, dimensions, fonts, libraries and timings from the current technical file. Do not freeze copies of those values in this skill.

## 2. Inventory the interface

- [ ] Find route definitions, layouts, templates, shared components, local variants, portals and third-party widgets. Include dialogs, menus, tooltips, footers and error pages.
- [ ] Find theme/token definitions, global CSS, utility configuration, inline styles, CSS-in-JS, pseudo-elements, SVG/canvas styling and motion configuration. Search with `rg`; inspect runtime-generated styles too.
- [ ] List all button/link/input/select/icon instances and their shared owners. Include clickable rows, custom role-based controls and controls rendered only in special states.
- [ ] Map each user task from entry point to completion, cancellation and failure. Identify the primary action and consequential actions on each screen.
- [ ] Run the existing project; capture baseline mobile/desktop renders and representative interactions. Record startup or access blockers rather than claiming unseen screens pass.
- [ ] Build a route × component variant × breakpoint × theme × state matrix. Inspect every distinct variant; group identical shared instances only after verifying they share styles and behavior.

Keep a compact ledger; do not mark whole categories complete from one screenshot:

| Rule / source section | Route, component, state | Result | Evidence / fix |
| --- | --- | --- | --- |
| Current preference | Concrete location | Pass / gap / override / N/A / unverified | Measurement, render, interaction or reason |

## 3. Hierarchy, spacing and padding

- [ ] Inspect every screen at its actual content density. Identify headings, groups and primary actions without relying on heavy bold or large colored surfaces.
- [ ] Measure outer gutters, section gaps, column gaps and component padding against current spacing guidance. Find arbitrary one-off values and inconsistent equivalents.
- [ ] Compare label-to-field, heading-to-body and item-to-action gaps with inter-group gaps. Keep related content together; remove ambiguous grouping.
- [ ] Check alignment across neighboring labels, inputs, buttons, icons, cards and table columns. Check variable-length content, not only identical placeholders.
- [ ] Inspect horizontal and vertical padding inside every control/surface. Distinguish visible padding from invisible hit areas; avoid cramped labels and oversized button faces.
- [ ] Check content width, prose measure, wrapping and section rhythm on narrow and wide screens. Remove accidental empty space without flattening meaningful hierarchy.
- [ ] Compare corner radii, borders, shadows and surface nesting across components. Remove excessive rounding, redundant containers and mismatched visual weight.

## 4. Color, surfaces and themes

- [ ] Inventory every color source: tokens, literals, utilities, inline styles, gradients, opacity, SVG fills/strokes, canvas marks, images, third-party defaults and browser-native controls.
- [ ] Assign each use a role: page, raised surface, text, muted text, brand, interaction, semantic feedback or data series. Compare computed colors with the current palette.
- [ ] Find near-duplicate brand blues and accidental replacements. Keep the exact accent central; check that shades serve an approved role/state.
- [ ] Inspect light/dark page and raised surfaces, overlays and nested panels. Check device-theme initialization and any existing manual override behavior.
- [ ] Inspect foreground/background pairs in default, hover, focus, active, selected, disabled, loading, error and success states, including translucent layers.
- [ ] Measure text, control, icon and focus contrast against the current thresholds. Handle documented palette conflicts explicitly; do not silently change branding or claim compliance.
- [ ] Find large permanent colored fills and decorative color without a purpose. Check that status and selection also have text, shape or semantic cues.
- [ ] Verify muted text remains readable and meaningfully secondary. Inspect charts and illustrations for coordinated colors without treating incidental image colors as new tokens.

## 5. Typography and content

- [ ] Inspect loaded fonts and computed family/weight on headings, body, labels, buttons, inputs, menus and tables. Check fallback rendering and unintended browser defaults.
- [ ] Compare font sizes, line heights, letter spacing, units and line lengths with the current technical file. Keep functional and website hero typography distinct.
- [ ] Use size, spacing and muted supporting text before additional boldness. Inspect overly heavy headings, excessive italics and inconsistent label weight.
- [ ] Check heading order, landmarks and descriptive labels. Ensure each action says what it does and repeated labels remain distinguishable in context.
- [ ] Exercise long titles, translated labels, multiline values and user content. Check truncation exposes necessary information without hover-only access.
- [ ] Check root sizing, text-size controls and font/spacing overrides. Enlarged text must reflow without lost content, overlap or clipped actions.

## 6. Buttons, links and action targets

- [ ] Find all native/custom buttons, submit controls, icon actions, clickable rows and links styled as buttons. Inspect each variant, including third-party controls.
- [ ] Compare face height, horizontal padding, radius, label size, icon size and icon gap with current button specifications.
- [ ] Measure effective pointer/touch targets separately from visible faces. Check invisible padding does not overlap neighboring targets or intercept unrelated clicks.
- [ ] Check primary/secondary hierarchy, filled/outline treatments and clear labels. Keep primary actions labeled; avoid several equally dominant actions.
- [ ] Check filled buttons retain the specified solid base; remove static gradients while preserving approved state-dependent sheen.
- [ ] Exercise hover, focus, press, disabled and loading states. Check lift/press behavior, stable dimensions and feedback for every actionable surface.
- [ ] Check inline links use the specified color/underline treatment. Verify destinations, keyboard activation and native link/button semantics; remove clickable non-semantic wrappers.
- [ ] Inspect compact expanding actions: icon-only rest state, label on hover/focus, graceful neighboring movement and no clipping or target collision.
- [ ] Test touch long-press reveals without activation, release does not fire, scrolling cancels and a separate tap activates. Preserve a discoverable path to essential actions.

## 7. Icons and status indicators

- [ ] Inventory icon packages, hand-drawn SVGs, emoji substitutes and bundled vendor icons. Use the specified library/assets without changing the application's framework for it.
- [ ] Compare icon size, stroke weight, optical alignment and spacing across navigation, inline actions, help, status and details.
- [ ] Remove ornamental heading icons where preferences call for text-only headings. Keep action/detail icons relevant and detail-icon color matched to its label.
- [ ] Check icon-only controls have accessible names; hide decorative icons from assistive technology. Avoid duplicate spoken labels.
- [ ] Check status pills use the intended tint, icon and text. Confirm status remains understandable without color and does not overpower surrounding content.

## 8. App navigation

- [ ] Inventory primary destinations and secondary settings/docs/help. Compare placement with app-specific navigation rules; do not impose app tabs on websites.
- [ ] Inspect desktop top navigation labels, icons and active underline. Check route matching, nested routes and browser Back/Forward.
- [ ] Inspect mobile bottom navigation icon size, active icon/line treatment and effective targets. Check safe-area spacing and obscured content/actions.
- [ ] Check secondary menu and language-switcher placement, visibility and operation. Verify the current destination is clear without a filled active pill where prohibited.
- [ ] Exercise navigation with keyboard and touch, across breakpoints and with a mobile keyboard open. Check focus and scroll behavior after route changes.

## 9. Website composition and menus

- [ ] Inspect desktop hero text/art split and mobile centered introduction with compact inset artwork. Check the following reading sections return to left alignment.
- [ ] Check abstract artwork is restrained, relevant, responsive and not stretched. Distinguish decorative assets from informative images for alternative text.
- [ ] Inspect repeated body sections: open composition, alternating text/art sides on desktop and consistent stacked reading order on mobile.
- [ ] Check separators span the full content width across both columns, align with gutters and have generous space on both sides. Keep internal text groups tighter.
- [ ] Find repetitive card containers, oversized decoration or empty hero space that delays useful content. Assess the page as a whole, not isolated components.
- [ ] Open the website menu at both sizes. Check full-screen mobile and right-side desktop presentation, top-right trigger/close, current-page state and all destinations.
- [ ] Test menu focus, keyboard navigation, Escape, close, focus return, background interaction/scroll control and resizing while open. Verify long menus remain usable.
- [ ] Inspect desktop header links and footer for usability and consistency. Do not invent a settled preference for choices the current files leave open.

## 10. Fields, labels, help and validation

- [ ] Inventory text, numeric, date, file and other fields, including custom editors. Check appropriate native semantics/input modes, labels and autocomplete where applicable.
- [ ] Inspect label placement, outline, interior, padding and soft focus treatment against current rules. Check focus has no unintended hard dark rim.
- [ ] Find help affordances; check the specified **i** design, position and target. Open each distinct help variant and verify useful descriptive content.
- [ ] Exercise help modal close/acknowledge, focus containment/return and small-screen scrolling. Keep required instructions available when users need them.
- [ ] Type, pause, correct, clear and paste values. Verify debounced validation follows the current policy rather than firing misleading errors during typing.
- [ ] Check invalid-field outline, explanatory text and warning icon; associate errors with fields and announce them appropriately. Preserve entered values.
- [ ] Test pending async validation, stale results, dependent fields and submit with errors. Make the next corrective action clear without losing context.

## 11. Choices, dropdowns and filters

- [ ] Inspect segmented controls, radios, switches and checkboxes in context. Check selected radios, empty/off and filled/on checkbox states against current rules.
- [ ] Verify live on/off filters use the preferred control and whole-row activation. Ensure label taps activate once and do not interfere with other row actions.
- [ ] Open every distinct dropdown variant from the whole trigger; verify toggle behavior and immediate search focus where specified.
- [ ] Check larger option sets provide search/autocomplete. Exercise matching, no results, clearing, keyboard selection and selection persistence.
- [ ] Verify single selection closes the list; multi-selection stays open. Outside click/tap and Escape close without clearing values; focus returns appropriately.
- [ ] Inspect multi-select chips, individual removal and overflow expansion/collapse. Test long labels, many selections and no selected items.
- [ ] Check search/Filters controls, active count, removable active-filter chips and Clear. Verify live updates and the specified panel persistence; no unintended Apply step.

## 12. Save lifecycle and consequential actions

- [ ] For every editable form, exercise clean → dirty → saving → saved → edited. Compare field badges, banner placement, button labels and enabled states with current rules.
- [ ] Check dirty-field indication and pending-action sheen; banner is positioned with the end-of-form actions as specified, not accidentally sticky.
- [ ] Check saving spinner/label, stable button width and duplicate-submit prevention. Test rapid edits and an edit made while a request is in flight.
- [ ] Verify success removes badges/banner, leaves the specified persistent button feedback and adds no unwanted success banner. A later edit must restore dirty state.
- [ ] Confirm the saved snapshot matches what was submitted; later edits remain dirty. Do not falsely report newer unsaved input as saved.
- [ ] Force save failure safely; verify explicit feedback, preserved edits, retry/back-to-editing and recovery. Check retry cannot duplicate a completed operation.
- [ ] Test Discard, Cancel and existing navigation guards. Make their scope and consequences explicit; preserve the intended draft behavior.
- [ ] Inventory delete, overwrite, publish and other nontrivial actions. Check explicit pre-action confirmation; do not rely solely on an easily missed Undo message.
- [ ] Check permanent deletion uses the specified acknowledgment gate, names the target and permits safe cancellation. Test with disposable data only.

## 13. Lists, tables and pagination

- [ ] Inspect each list/table at zero, one, many and unusually long records. Check alignment, density, visible details and suitable mobile presentation.
- [ ] Check table headers, numeric alignment, row actions and hover treatment. Ensure clickable rows do not conflict with nested links/buttons.
- [ ] Verify pagination and nearby page-size control. Exercise first/last page, changed page size and filters that reduce the page count.
- [ ] Verify page changes scroll to the specified results position; avoid hiding the result heading under a fixed header or losing keyboard context.
- [ ] Test rapid search/filter/page changes and slow responses. Ensure stale responses cannot replace newer results or contradict the visible controls.

## 14. Loading, empty, error and onboarding states

- [ ] Trigger initial load and refresh. Check layout-shaped skeletons, sweep behavior and replacement of old results according to current preferences.
- [ ] Check pending feedback appears promptly without invented progress or artificial minimum delays. Reserve geometry to avoid disruptive layout jumps.
- [ ] Force read/load failure; check modal retry/close and a retry path after dismissal. Verify recovery and prevent repeated stacked error dialogs.
- [ ] Inspect empty and no-match states within the actual page shell: balanced icon, concise explanation and an appropriate action.
- [ ] Check offline/unavailable and permission states where supported. Preserve context and explain the available recovery path.
- [ ] Inspect first-use guidance: optional, skippable and explanatory. Verify skipping works and no required practice task creates real data.

## 15. Charts and data graphics

- [ ] Inventory chart libraries, SVG/canvas graphics and custom legends. Compare series colors, label contrast and hierarchy with current preferences.
- [ ] Check initial draw behavior and timing. Verify series animate as specified and final data remains accurate under reduced motion.
- [ ] Test nearby hover/tap values, touch persistence/dismissal and keyboard-accessible equivalents. Avoid persistent value clutter unless the task requires it.
- [ ] Check resizing, long labels, missing/zero values and many series. Preserve legibility without clipped axes, overlapping labels or color-only meaning.

## 16. Animated artwork: opportunities and execution

- [ ] Inventory existing illustrations and decorative assets by route/section; distinguish them from icons, controls, charts and informative images.
- [ ] Walk every page for useful additions: heroes, explanatory sections, onboarding, empty states and quiet transitions. Look beyond places that already contain artwork.
- [ ] For each candidate, record location, content purpose, proposed subject/motion and likely benefit. Prefer additions that explain a concept or create relevant atmosphere; do not fill space by default.
- [ ] Assess whether to animate an existing asset, add new artwork or leave the area quiet. Check reading density, primary actions and nearby motion before recommending placement.
- [ ] Include suitable body sections, not just heroes. Review the whole viewport/page for cumulative motion and color; several independent illustrations must remain calm together.
- [ ] In review mode, report concrete opportunities alongside violations. In implementation mode, create suitable artwork within scope and preview it in the real layout.
- [ ] Check perceptible but gentle movement plus gradual shade changes against current preferences. Use the full allowed palette without treating new artwork hues as functional UI tokens.
- [ ] Watch complete cycles: seamless continuous loops, independent periods/phases, no synchronized reset, flashing, abrupt hue jumps or unnecessarily long quiet pauses.
- [ ] Check artwork remains decorative: no required hover/click, fake status/progress or obstruction of text/actions. Hide purely decorative assets from assistive technology; describe meaningful imagery.
- [ ] Verify static first render, reduced-motion and load-failure alternatives. Reserve dimensions; inspect responsive cropping, both themes and nearby content for layout shift.
- [ ] Test offscreen/background pause, smooth resume and cleanup after navigation. Check CPU/rendering cost, asset/runtime load and smoothness with several illustrations on mobile.
- [ ] Compare animated and static versions in context. Record why each proposed addition helps, or why leaving it static/absent better supports the task.

## 17. Animation and interaction timing

- [ ] Inventory CSS transitions/keyframes, animation libraries, SVG/canvas loops, scroll effects and interaction timers, including third-party defaults.
- [ ] Compare duration, easing, distance, scale, stagger and repeat interval with current motion specifications. Measure repeating cycles start-to-start; distinguish explicitly tuned values from starting points.
- [ ] Identify retired/rejected timing defaults and unresolved trials in the current preferences. Do not reuse them as approved timings or slow functional feedback to match decorative artwork.
- [ ] Exercise hover/press, modal enter/exit, navigation, content arrival, icon expansion, banner removal, chart draw and skeleton motion wherever present.
- [ ] Check pending-action sheen starts under the specified conditions, repeats gently, resets while typing and stops while saving/clean or when the document is hidden.
- [ ] Remove unintended bounce, exaggerated travel, competing loops and excessive stagger. Do not infer website drawer timing from unrelated modal specimens.
- [ ] Toggle reduced motion; verify necessary state changes remain understandable without decorative movement. No content may depend on an animation completing to become usable.
- [ ] Test rapid open/close, repeated taps, route changes and interrupted requests. Check cleanup, final states and absence of stranded overlays or flashing content.

## 18. Accessibility and responsive behavior

- [ ] Complete primary tasks with keyboard only: tab order, visible focus, activation, Escape and return focus. Check modal focus containment and background inertness.
- [ ] Inspect accessible names, roles, expanded/selected/disabled states, landmarks and live announcements. Use assistive-technology checks where available; avoid announcing every animation frame.
- [ ] Test narrow phones, wide desktop, intermediate widths and immediately around layout breakpoints. Check horizontal overflow, clipping, overlapping targets and reading order.
- [ ] Test enlarged text, zoom, long translations and current spacing overrides in both themes. Check menus, dialogs, footers and fixed UI as well as page content.
- [ ] Test forced colors and retained system focus indication. Verify errors, active states and chart meaning survive removal of color cues.
- [ ] Exercise touch gestures on an available real touch device, including long-press and scroll cancellation. Label emulation-only coverage explicitly.

## 19. Optional sound and haptics

- [ ] If present, inventory each cue and its triggering event. Check rarity, meaning, duration, synchronization and current technical guidance.
- [ ] Check independent off controls and a complete silent experience. Do not add sound/haptics merely to satisfy this section.
- [ ] Verify native presets on supported devices; do not assume equivalent intensity across platforms. Mark unavailable-device checks unverified.

## 20. Fix and verify

- [ ] In review-only mode, report findings without editing. For alignment, prioritize broken tasks, unclear state and accessibility before visual polish; implement within the requested scope.
- [ ] Fix shared tokens/components first, then local exceptions. Check all consumers for regressions; avoid framework swaps and unrelated redesigns.
- [ ] Render changed screens in a real browser, inspect computed values and repeat affected user journeys across the matrix. Static images do not verify interaction or timing.
- [ ] Run relevant existing checks; add regression coverage for meaningful behavior where needed. Screenshots alone do not establish functional correctness.
- [ ] Compare before/after renders at matching sizes and themes. Review overall hierarchy and rhythm after local fixes; retain useful visual evidence.
- [ ] Reconcile every extracted rule and inventoried variant with the ledger. No silent omissions: record N/A reasons, intentional overrides and unverified states.
- [ ] Report changes/findings with concrete screen/component locations, evidence, remaining conflicts and limitations. Separate measured failures from taste judgments.
- [ ] Do not edit global preferences, publish, push or execute consequential operations on real data merely because this skill was invoked.
