# Sensory Design Prescriptions

> Design preferences and practical starting points. Follow the existing project's design system unless the user specifies otherwise. Accessibility requirements take precedence over aesthetic choices; validate heuristics with the actual interface and its users.

**Brand defaults:**
- Accent: `#7ec0d0`
- Body background: `#fafbfc`
- Heading font: `"Montserrat Variable", system-ui, -apple-system, "Segoe UI", sans-serif` (500 font weight)
- Body font: `"Nunito Variable", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`

For new projects, prefer the listed fonts available through Google Fonts. Follow existing font delivery and privacy conventions.

---

## Visual Design

### Edges & Attention
- Prefer sharp, well-defined UI boundaries.
- Use a clear primary attention cue per priority level (color, size, motion, or orientation); add redundant cues when they improve accessibility.
- Place critical messages near the relevant control or content. Avoid flashing alerts and respect reduced-motion preferences.

### Grouping & Layout
- Use proximity to make grouping clear; place labels closer to their own fields.
- Use shared boundaries (cards, boxes) to reinforce grouping without contradicting spacing or labels.
- Use symmetry as default layout; break it deliberately for emphasis.
- Prefer hamburger menus on mobile. Top menu allowed on desktop.

### Color
- Use luminance contrast as well as hue to separate elements.
- Minimum contrast ratios: **4.5:1** body text, **3:1** large text (18pt+ / 14pt+ bold), **7:1** enhanced.
- Check readability in both light and dark themes; any additional contrast metric should supplement required WCAG checks.
- Prefer blue for fills and large shapes; small text still needs sufficient contrast regardless of hue.
- Never encode information in color alone — always add shape, pattern, icon, or label. Especially avoid red-vs-green without a secondary cue.
- Treat color associations as context-dependent aesthetic choices, not reliable predictors of emotion.
- Prefer solid-color surfaces without a contrasting border and with white text where it meets contrast requirements.

### Typography
- Choose typefaces for readable letterforms and clear confusable-character differentiation (1/I/l, 0/O), rather than assuming serif or sans-serif is universally better.
- Line length: **45–75 characters** (~66 ideal). Use `max-width: 65ch`.
- Prefer body line height around **1.5×** as a design starting point; choose default spacing for the font, language, and layout.
- **WCAG 2.2 SC 1.4.12:** support user overrides to line height **1.5×**, paragraph spacing **2×**, letter spacing **0.12em**, and word spacing **0.16em**, applied together without lost content or functionality. These are override tolerance values, not required defaults; properties inapplicable to the language or script are excepted. [W3C explanation](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).
- Spacing preferences vary by reader; avoid claiming one adjustment or typeface benefits everyone with dyslexia.
- Prefer upright body text; reserve italics for short emphasis.
- Prefer familiar typefaces such as Helvetica, Arial, Verdana, or Courier when offering reading alternatives.
- Respect user font and spacing overrides. Make sure there is a setting to + and - the text size.
- Implement flow-text resizing so text is comfortable on multiple screen-sizes.

---

## Audio & Haptics

### Sound
- Routine UI feedback: **300–1,500 Hz**. Urgent warnings: **2,000–4,000 Hz** (sparingly — overuse triggers app muting).
- Map sounds to real-world analogues (crumple = delete, click = toggle, whoosh = send).
- For abstract categories, prefer distinct **timbres** over pitch changes; verify users can distinguish them.
- Prefer short speech cues ("sent", "error", "done") over abstract tones when vocabulary is small.
- Notification sounds interrupt attention — keep them rare.
- Satisfying feedback = short duration + crisp onset + harmonic consonance + moderate volume.
- Never add sound where users don't expect it. Provide independent mute controls for sounds.

### Haptics
- Prefer short crisp taps at moderate intensity; tune using platform feedback presets and test on actual devices.
- iOS: `UIImpactFeedbackGenerator` (physical), `UISelectionFeedbackGenerator` (pickers), `UINotificationFeedbackGenerator` (outcomes), Core Haptics for custom.
- Android: use `HapticFeedbackConstants` — don't try to match iOS cross-platform.
- Reserve haptics for meaningful state changes only.
- Always provide independent haptics disable setting.

---

## Interaction & Layout

### Spatial Consistency
- Keep nav, key actions, and structural landmarks in consistent positions across all screens. Never rearrange internalized layouts without a compelling reason.
- Prefer easily reached positions for frequent actions; account for touch reach, pointer use, and platform gestures.
- Minimum touch targets: **44×44pt** (iOS) / **48×48dp** (Android).

### Animation
- Animate elements from origin to destination — layout changes without animation feel like teleportation.
- Transition types: **container transform** (expand into view), **shared axis** (hierarchy nav), **fade through** (unrelated views), **fade** (appear/disappear).
- Never use decorative animation — every animation must communicate spatial relationship, state change, or causality.
- Starting durations: **100–200ms** micro-interactions, **200–350ms** element transitions, **350–500ms** view transitions. Adjust to the task and respect reduced-motion settings.
- Easing: `ease-out` for enter, `ease-in` for exit, `ease`/`linear` for state changes.

### Cognitive Load
- Prefer small groups of options; use four as a starting point, not a universal cognitive limit.
- For visually demanding tasks, add feedback via a different channel (haptic/audio), not more visuals.
- Keep feedback across channels synchronized and clearly tied to its action.
- Eliminate elements that do not serve the task. Make important content recognizable as part of the workflow rather than advertising.

### Time Perception
- Aim for immediate interaction feedback; show a loading state promptly when an operation takes noticeable time.
- Prefer skeleton screens when they accurately preview the arriving content; respect reduced-motion settings.
- Show remaining time or determinate progress when measurable. Otherwise show honest indeterminate status.
- Choose percentages or completed steps to match the work being measured; do not invent progress or reorder necessary steps to imply speed.

---

## Ethics

- Ethics test: would the user regret the behavior your interface optimizes for? If yes, it's manipulation.
- Never combine variable reward + low-friction repetition + infinite scroll + notification badges (= slot machine).
- Never auto-play, auto-scroll, or remove natural stopping points without explicit opt-in.
- Tie every sensory reward to a user-initiated, goal-directed action. Completion checkmark = good. Engineered notification badge = bad.
- Pair completion moments with brief multimodal feedback (visual + haptic + audio, simultaneous). Make destructive-action feedback distinct and heavier.

---

## Web Implementation

### Units & Root Font Size
- Prefer `html { font-size: 100%; }` to preserve the user's default size; avoid fixed root sizing that defeats font preferences.
- `rem` for layout/text sizing. `em` for component-internal spacing (button padding, letter-spacing). `px` only for borders/shadows. `vw`/`vh`/`dvh` for viewport-relative sizing, never alone for text.

### Fluid Typography
```css
body { font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem); }
h1   { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem); }
```
- Never set a `clamp()` minimum below `1rem` for body text. Use [Utopia](https://utopia.fyi) to generate scales.

### Line Length & Spacing Scale
```css
.prose { max-width: 65ch; width: 100%; padding-inline: 1rem; }
```
```css
:root {
  --space-xs: 0.25rem;  --space-s: 0.5rem;   --space-m: 1rem;
  --space-l: 1.5rem;    --space-xl: 2rem;     --space-2xl: 3rem;  --space-3xl: 4rem;
}
```
- Gap between related elements must be < half the gap between unrelated groups.
