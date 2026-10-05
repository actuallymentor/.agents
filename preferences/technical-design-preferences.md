# Technical design preferences

Pair with [visual rules](visual-design-preferences.md). **Defaults marked “starting point” are tunable; do not turn specimen values into universal requirements.**

## Palette

| Token | Value |
| --- | --- |
| Brand accent | `#7ec0d0` |
| Light page / surface | `#fafbfc` / `#ffffff` |
| Dark page / raised surface | `#002b36` / `#073642` |
| Light text / muted¹ | `#1a1a2e` / `#6b7280` |
| Dark text / muted¹ | `#e6ecf0` / `#aab6c1` |
| Primary button | Solid accent fill, white text; no static gradient |
| Approved darker fallback | `#376675`, white text |
| Chart pairing | Accent + coral `#e07c5a` |

¹ Starting tokens. Gold `#f0c040` appears in the reference chart; not a mandatory third series. Semantic colors remain contextual.

**Known conflict:** white on accent ≈2.03:1; the preferred aesthetic is not contrast-compliant for normal text. Do not silently replace it or claim compliance. Resolve production contrast explicitly; the darker fallback is available. Retain contrast checks: 4.5:1 normal text, 3:1 large text, 7:1 enhanced target.

## Type, icons and dimensions

| Element | Default |
| --- | --- |
| Headings | Montserrat Variable, 400; functional heading 26px equivalent |
| Body / labels | Nunito Variable, 400 / 500 |
| Fallback fonts | `system-ui, -apple-system, "Segoe UI", sans-serif` |
| Icons | `lucide-react`, `strokeWidth={1.5}`; navigation 20px, inline/help 16px |
| Button face | 32px high, 14px horizontal padding, 15px label, 16px icon; pill radius |
| Button hit area¹ | ≥44px high, ≥44px wide; +4px invisible lateral padding; never overlap |
| Mobile active line¹ | 3px, spanning tab button width |
| Focus halo¹ | 5px spread; accent ~27% light / 25% dark opacity; no dark rim |
| Collapsed chip count¹ | Three, then +N more |

¹ Starting points. Dimensions describe the default scale, not fixed caps: grow for larger text/wrapping. Native targets: iOS 44pt, Android 48dp. Use matching Lucide assets on non-React stacks; do not migrate frameworks for icons.

- Google Fonts preferred for new projects; preserve existing font delivery/privacy conventions.
- Root font size `100%`; `rem` for type/layout, `em` for internal spacing, px for fine borders/shadows. Convert specimen pixels at a 16px reference root.
- Fluid body minimum `1rem`; line-height ~1.5; prose 45–75 characters, `max-width:65ch`.
- Starting spacing scale: `.25, .5, 1, 1.5, 2, 3, 4rem`. Related gaps smaller than half inter-group gaps.
- Support overrides: line-height 1.5, paragraph spacing 2em, letter spacing .12em, word spacing .16em; no lost content/actions.
- Use `prefers-color-scheme` initially; remembered manual overrides remain a project decision.

## Website layout

- Reuse the palette, fonts and controls above. Hero type scales separately from the functional-heading default; exact website sizes remain unset.
- Desktop sections: alternating text/artwork columns within a shared content width. Mobile: one column; keep semantic reading order independent of visual alternation.
- Separators: thin, subtle, full **content** width across both columns; align with outer content margins. Section padding is generous; internal text gaps stay tighter.
- Mobile hero artwork: inset, compact; preserve aspect ratio and avoid stretching. Adapt artwork to the available width.
- Menu overlay: full-screen mobile / right-side panel desktop. Apply focus management, Escape/close, focus return and background scroll control.
- Breakpoints, column ratios, section padding, separator token, drawer width and menu animation are project choices; rendered examples did not establish exact values.

## Motion

| Effect | Timing and amplitude |
| --- | --- |
| Modal | **500ms in / 200ms out**; 8px rise + fade¹ |
| Chart draw | **1300ms**, series together |
| Attention sheen | **3000ms start-to-start**; 1400ms pass + 1600ms quiet¹ |
| Hover / press¹ | 160ms; lift 1px, press scale .985 |
| Unsaved banner removal¹ | 200ms fade + collapse |
| Navigation¹ | 280ms moving indicator + crossfade; no slide |
| Content arrival | Retune per context: 320ms section reveals felt too quick; 700ms trial not approved |
| Icon-label expansion¹ | 240ms; touch hold 450ms |
| Skeleton sweep¹ | 1800ms cycle |

¹ Tested starting points; bold timings were explicitly tuned/selected.

- Modal enter easing: `cubic-bezier(.2,.8,.2,1)`; exit `ease-in`.
- Sheen¹: 45% width, white peak 26%, −18° skew; start ~800ms after typing pauses. Reset while typing; stop when saving/clean; pause in hidden documents.
- Honor `prefers-reduced-motion`; cap stagger across long lists. Demo request delays are not production minimums.

## Animated artwork

- Continuous, seamless loops; vary element periods/phases for independent rhythms. Choose duration/amplitude per scene; demo timings are not fixed tokens.
- Tune noticeability at actual mobile/desktop render sizes, in both themes. Account for moving-element size, on-screen travel, speed, opacity, background contrast and the difference between animated shades; source SVG units alone are insufficient.
- If motion is hard to notice in normal viewing, adjust amplitude, timing, scale or color separation and recheck the whole scene. Subtle must not mean imperceptible; retain reduced-motion behavior and avoid overwhelming effects.
- Animate transforms and gradual color/shade changes. Broader artwork colors do not replace functional UI palette tokens or imply approval of button gradients.
- Pause when offscreen or document-hidden; resume without a jump. Clean up animation work on unmount/navigation.
- Respect `prefers-reduced-motion`; supply a deliberate static composition. Show it immediately while animation loads or if it fails.
- Reserve artwork dimensions/aspect ratio; adapt composition to viewport/theme. Avoid clipping, layout shift and delayed access to content.
- Choose a lightweight implementation suited to the asset and existing stack; no mandatory animation library. Check asset/runtime cost and smoothness on mobile with several visible illustrations.

## Behavior safeguards

- Native semantics, accessible icon names, keyboard dropdown selection/Escape, modal focus management and return focus. Retain system focus indication in forced-color mode.
- Long-press release must not activate an action; cancel on scrolling. Validate on real touch devices.
- Save the submitted snapshot; later edits stay dirty. Avoid duplicate submissions and stale async results.
- Validation debounce, page sizes, dropdown search cutoff and semantic palette: choose per project; not settled constants.

## Optional audio and haptics

Inherited starting points, only where feedback is appropriate: routine sound 300–1500Hz; urgent 2000–4000Hz sparingly. Prefer distinct timbres, real-world analogues or short speech; validate with users. Short, crisp, moderate-volume cues.

Use native feedback presets: iOS impact/selection/notification generators; Android `HapticFeedbackConstants`. No cross-platform intensity equivalence; test devices and offer independent off controls.
