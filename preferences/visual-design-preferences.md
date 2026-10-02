# Visual design preferences

Apps and websites, mobile and desktop. Pair with [technical values](technical-design-preferences.md). Explicit project requests override these defaults. App navigation and website composition have separate defaults below.

## Philosophy

- Clear structure, predictable behavior, explicit state. Structure beats empty space; never cramped.
- Warm, precise, professional; never corporate or amateurish. Restrained weight and rounding.
- Quiet neutral surfaces; purposeful color and subtle premium motion. No visual clutter or gratuitous effects.
- Consistent alignment, grouping and landmarks. Keep labels close to their fields; related items closer than unrelated groups.
- Use size, spacing and muted supporting text before boldness. Upright body text; short italic emphasis only.

## Surfaces

- Very light gray page, white content; Solarized-style deep-blue dark surfaces. Follow device theme initially.
- Keep the exact brand blue central; shades support hover/state. Avoid large permanent colored fills.
- Actionable rows: subtle full-row hover tint. Inline interactive text: color + underline.

## App navigation

- Mobile: compact cards with details visible; frequent destinations in icon-only bottom tabs. Active icon + top-edge line, no filled active pill.
- Secondary settings/docs/help: top-right hamburger. Subtle top-right language switcher.
- Desktop: useful content width; top navigation with icon, text and active underline. Tables where appropriate.

## Websites

- Hero: split text/artwork on desktop; centered introduction with compact inset artwork on mobile. Subsequent reading is left-aligned.
- Prefer restrained abstract artwork for this direction. Phone mockups were explored; no general ban on product imagery or photography.
- Open sections with clear separation; avoid repetitive card containers that feel cookie cutter.
- Desktop body: alternate text/artwork sides. Mobile: stack sections with consistent reading order.
- Thin separators span the full content width on both devices. Generous space above/below; keep each text group together. Prefer these over short accent marks for this composition.
- Open menu: full-screen on mobile, right-side panel on desktop; top-right trigger/close.
- Footer surface and which desktop links stay visible in the header remain undecided.

## Buttons and icons

- Small pill buttons with larger invisible, non-overlapping tap areas. Primary: brand blue + white text; secondary: quiet outline.
- Primary actions retain labels. Compact item actions expand from icon to icon + label on hover/focus; neighbors may move aside.
- Touch long-press reveals the label without activating; a separate tap activates. Keep consequential-action confirmation.
- Fine Lucide icons on actions and details, not content headings. Detail icons match their labels' color.
- Status: small tinted pill, semantic icon + text. Never convey meaning through color alone.

## Forms and choices

- Labels above fields; thin neutral outlines, light interiors. Focus: soft halo meeting the surface, no hard dark rim.
- Outlined **i** at label-row right opens centered help modal: descriptive heading, useful prose, close/acknowledge.
- Debounced validation after typing stops. Invalid field: red outline + softly tinted explanation and warning icon.
- Segmented controls, radios and dropdowns: choose by context. Selected radios have no dark rim.
- Live on/off filters: switches; whole row tappable. Checkboxes remain valid: empty off, blue-filled on.
- Longer dropdowns: search/autocomplete. Whole trigger toggles list; opening focuses search. Single selection closes it.
- Multi-select: keep list open while selecting; show removable chips below. Collapse excess into expandable **+N more**, then **Show less**.
- Outside click/tap and Escape close dropdowns without clearing selections.

## Save and consequential actions

- Dirty: field **Unsaved** badges + amber banner immediately above end-of-form Save/Discard; not sticky.
- Pending: Save button gently shimmers. Saving: spinner + **Saving…**.
- Success: badges disappear, amber banner fades/collapses, button becomes **Changes saved** until edit/navigation. **No green banner.**
- Next edit restores dirty state. Disable actions when nothing is pending; keep button width stable.
- Failed save: explicit modal, preserve edits, offer retry/back to editing.
- Confirm nontrivial actions before execution; subtle Undo alone is insufficient. Permanent project/file deletion: acknowledgment checkbox enables Delete.

## Lists, charts and first use

- Search + compact Filters button, active count, removable filter chips and Clear. Changes apply live; panel stays open; no Apply step.
- Pagination + nearby page-size dropdown. Page changes scroll to top of results.
- Initial load and refresh: replace results with layout-shaped shimmer skeletons. Failed load: modal with retry/close; retry remains available after dismissal.
- Empty state: small relevant icon, concise heading/explanation, clear action; balance within the real app shell.
- Charts: coordinated colors, draw on load; keep values hidden until a nearby hover/tap tooltip, unless the task needs persistent labels.
- Optional skippable explanatory tour; no practice tasks or real-data creation.

## Motion and inclusive use

- Gentle lift/press, modal rise/fade, navigation crossfade, short stagger for arriving items. No bounce or exaggerated travel.
- Repeat a narrow sheen on the next important pending action; stop during saving/after completion. Respect reduced motion.
- Preserve keyboard access, focus, text resizing and user font/spacing overrides. Provide text-size controls. No hover-only essentials.
- Feedback is immediate and honest: no invented progress or artificial waits.
- Sound only where expected; rare, short, recognizable, synchronized. Haptics: meaningful crisp taps. Independent sound/haptics off controls.
