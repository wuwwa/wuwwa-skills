# Motion direction

Adapted from the supplied animation screenshot collected on **2026-11-07**. The following table retains all twenty source cues, with implementation interpretations and exceptions. These are visual tuning suggestions, not measured guarantees or mandatory effects.

| Source cue | Apply it in context |
| --- | --- |
| 1. Ease-out entrances | Let an entering surface arrive promptly and settle. Tune the curve to the distance and existing motion system. |
| 2. Dropdowns at 150-250 ms | Start within this range for a small dropdown; shorten or remove motion if it delays repeated use. |
| 3. Stagger rows by 30 ms | A small stagger can explain an entering group. Cap the overall sequence so a long list stays available promptly; avoid replaying it on routine updates. |
| 4. Press scale of 0.97 | Consider a subtle compression for a button that benefits from tactile feedback. Keep its hit area and focus stable; skip scaling tiny controls or text-heavy surfaces if it hurts legibility. |
| 5. Stretch moving knobs by 12% | Optional directional deformation for a playful switch or slider. The source gives no axis or implementation; this is an interpretation. Preserve the control's actual value and hit area, and omit the effect when precision matters. |
| 6. Stagger as details settle | Interpret as sequencing secondary details around the settling of the main surface. Avoid serial waits before essential content becomes usable. |
| 7. Arcs for object movement | Use a curved path when it clarifies an object moving between locations. Keep routine panels and menus on simpler paths unless the relationship benefits. |
| 8. Pulse for success | A brief, optional confirmation can reinforce a completed action. Pair it with a persistent state or message; avoid repeated pulsing or using motion as the only feedback. |
| 9. Ease-in-out for moves | A useful starting curve for moving an already-visible object between positions. Direct manipulation should follow input immediately instead. |
| 10. Popovers start at 0.95 | Consider a small scale-and-opacity entrance, anchored to the trigger. Tune the scale to size; reduce it when text appears blurry or the surface visibly zooms. |
| 11. Enter from the trigger | Set the visual origin to the control that opened the surface, including when the surface is rendered in a portal. Respect collision-aware placement. |
| 12. Exit toward the trigger | Reverse that relationship when the trigger remains present. Use a simple exit when the source disappeared; do not send content toward an unrelated location. |
| 13. Avoid bounce in everyday UI | Prefer controlled settling for routine controls. Reserve obvious bounce for a requested playful interaction with a clear purpose. |
| 14. No tween while held | While dragging, scrubbing, or holding a control, map its visual position directly to input. Ease or spring only after release when settling is needed. |
| 15. Exits about 20% shorter | Try an exit near 0.8 times the entrance duration. Tune for responsiveness and remove unnecessary dismissal delay. |
| 16. Overlap old and new states | Use a brief overlap when it maintains continuity. Ensure only the current state receives input and focus; do not leave both states exposed as duplicate controls. |
| 17. Masks for reveals and color | Consider a clipped reveal when it conveys a meaningful spatial change. Avoid hiding focus, clipping shadows unintentionally, or adding masks to unrelated transitions. |
| 18. Crossfade icons with blur | Prefer a short crossfade when an icon changes state. Blur is optional and should be small or absent if it reduces legibility or costs too much. Preserve the accessible label and final-state clarity. |
| 19. Rubber-band beyond bounds | Optional visual resistance for a bounded draggable surface. Keep the underlying value within its valid range; preserve native scrolling and input behavior. |
| 20. Reuse a shared layout identity | Keep the identity of the same conceptual object across compact and expanded states. In Motion for React, a matching `layoutId` connects shared elements; namespace independent instances so unrelated objects do not morph together. |

## Implementation checks

- Support `prefers-reduced-motion` on the web or the platform equivalent. Reduce or replace nonessential translation, scaling, deformation, blur, and stagger while preserving state changes and feedback. Use an instant update or restrained opacity change when appropriate.
- Keep interrupted or reversed transitions continuous rather than restarting from an unrelated state. Verify that repeated open/close actions do not leave stale surfaces or blocked controls.
- Preserve text readability, final geometry, focus management, and input responsiveness. Use transforms or opacity for simple effects when suitable; check actual rendering rather than assuming any property or library guarantees performance.
- Keep durations and easing consistent with existing tokens. Introduce shared motion tokens only when repeated interactions justify them.

Implementation references checked on **2026-11-07**:

- [Motion for React: layout animation](https://motion.dev/docs/react-layout-animations) supports the `layoutId` note. Read current documentation for the installed version before implementing library-specific behavior.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) explains how the web detects a request to reduce nonessential motion.

The accessibility and implementation checks are additions to the screenshot's shorthand. See [source notes](sources.md).
