# Sensory Design Prescriptions

> Actionable rules for interfaces that work with the human nervous system. Every rule is an engineering constraint, not opinion.

**Brand defaults:**
- Accent: `#7ec0d0`
- Body background: `#fafbfc`
- Heading font: `"Montserrat Variable", system-ui, -apple-system, "Segoe UI", sans-serif` (500 font weight)
- Body font: `"Nunito Variable", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`

Note: the primary font must be made available through Google Fonts.

---

## Visual Design

### Edges & Attention
- Give UI elements sharp, well-defined boundaries — blurred/gradient-only edges slow recognition.
- Use **one** pre-attentive channel per priority level (color, size, motion, or orientation). Combining channels defeats pop-out.
- Place critical messages within ~2.5 cm of the user's focus point. Use motion/color flash for peripheral alerts — peripheral vision cannot read text.

### Grouping & Layout
- Proximity is the strongest grouping signal — a label equidistant between two fields belongs to neither.
- Enclosing elements in a shared boundary (card, box) overrides all other grouping, including proximity.
- Use symmetry as default layout; break it deliberately for emphasis.

### Color
- Separate elements by **brightness**, not just hue. Two hues at equal brightness blur together.
- Minimum contrast ratios: **4.5:1** body text, **3:1** large text (18pt+ / 14pt+ bold), **7:1** enhanced.
- Light-on-dark needs slightly higher ratios than dark-on-light (polarity asymmetry). APCA algorithm handles this.
- Never use blue for fine detail or small text — reserve for fills and large shapes.
- Never encode information in color alone — always add shape, pattern, icon, or label. Especially avoid red-vs-green without a secondary cue (~8% of males are color-blind).
- Red/warm = arousal, blue/cool = calm. Stop there — broader color psychology is weakly supported.
- Surfaces that are a solid color must 1) not have a border of a different color type and 2) idally have white text, unless that makes the text impossible to read

### Typography
- Serif vs sans-serif: no measurable legibility difference. Prioritize large x-height, clear confusable-character differentiation (1/I/l, 0/O), consistent stroke width.
- Line length: **45–75 characters** (~66 ideal). Use `max-width: 65ch`.
- Line height: **≥ 1.5×** font size for body text.
- Letter spacing: **≥ 0.12em**. Word spacing: **≥ 0.16em**. Paragraph spacing: **≥ 2×** font size.
- Increased letter spacing is the single most effective dyslexia intervention — zero negative impact on other readers.
- Never use italic for body content (impairs dyslexic reading).
- Preferred dyslexia-friendly typefaces: Helvetica, Arial, Verdana, Courier. Not "dyslexia fonts" (OpenDyslexic, Dyslexie).
- Expose font size, letter spacing, and line height as user settings.

---

## Audio & Haptics

### Sound
- Routine UI feedback: **300–1,500 Hz**. Urgent warnings: **2,000–4,000 Hz** (sparingly — overuse triggers app muting).
- Map sounds to real-world analogues (crumple = delete, click = toggle, whoosh = send).
- For abstract categories, use distinct **timbres** over pitch changes (~80% recognition vs much lower).
- Prefer short speech cues ("sent", "error", "done") over abstract tones when vocabulary is small.
- Every notification sound increases error rates on the user's current task — keep them rare.
- Satisfying feedback = short duration + crisp onset + harmonic consonance + moderate volume.
- Never add sound where users don't expect it. Always make all sounds independently mutable.

### Haptics
- Satisfying click: **150–250 Hz**, short crisp taps, moderate amplitude. Below 150 Hz = calm. Above 200 Hz + high amplitude = urgent.
- iOS: `UIImpactFeedbackGenerator` (physical), `UISelectionFeedbackGenerator` (pickers), `UINotificationFeedbackGenerator` (outcomes), Core Haptics for custom.
- Android: use `HapticFeedbackConstants` — don't try to match iOS cross-platform.
- Reserve haptics for meaningful state change only. Phantom vibration syndrome affects 78–89% of users.
- Always provide independent haptics disable setting.

---

## Interaction & Layout

### Spatial Consistency
- Keep nav, key actions, and structural landmarks in consistent positions across all screens. Never rearrange internalized layouts without a compelling reason.
- Place frequent actions near screen edges/corners (Fitts's Law — edges prevent overshooting).
- Minimum touch targets: **44×44pt** (iOS) / **48×48dp** (Android).

### Animation
- Animate elements from origin to destination — layout changes without animation feel like teleportation.
- Transition types: **container transform** (expand into view), **shared axis** (hierarchy nav), **fade through** (unrelated views), **fade** (appear/disappear).
- Never use decorative animation — every animation must communicate spatial relationship, state change, or causality.
- Durations: **100–200ms** micro-interactions, **200–350ms** element transitions, **350–500ms** view transitions. > 500ms = sluggish, < 100ms = imperceptible.
- Easing: `ease-out` for enter, `ease-in` for exit, `ease`/`linear` for state changes.

### Cognitive Load
- Present **≤ 4 unchunked options** at once. More → group into meaningful chunks first.
- For visually demanding tasks, add feedback via a different channel (haptic/audio), not more visuals.
- Cross-modal feedback must align in time and space — a 200ms delay feels broken.
- Eliminate every element that doesn't serve the current task. Never place important content in banner-shaped containers (banner blindness).

### Time Perception
- **< 100ms** = instantaneous. **< 1s** = conversational. **< 10s** = maximum without feedback.
- Show skeleton screens during loading. Animate progress bars with backward-moving stripes + deceleration (~11% perceived reduction).
- Always communicate whether a wait is bounded. Show remaining time or determinate progress.
- Show progress as percentage ("64% complete" > "3 steps remaining"). Front-load easy steps to build momentum.

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
- **Never override the root font size.** `html { font-size: 100%; }` — anything else breaks user accessibility settings.
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