---
name: ui-design-polish
description: "Polish website and app UI through restrained visual hierarchy and purposeful motion. Use for design direction, removing decorative clutter, or refining interaction animations within a project's design system."
metadata:
  created: "2026-11-07"
  updated: "2026-11-07"
  last-reviewed: ""
  tested-with: ""
  review-after: "2027-02-05"
  status: "draft"
  source: "User-supplied screenshots attributed on-screen to Charles Liu; see references/sources.md"
  source-date: ""
---

# UI Design Polish

Create interfaces whose hierarchy, styling, and movement serve the task. This skill adapts two screenshot references into contextual design guidance. It does not prescribe a single visual style.

## Establish the direction

Inspect the relevant screen, project design tokens, and existing components before changing them. Identify the primary action and what users need to understand next. Follow explicit product requirements, supplied visual references, and the existing brand system.

For a new interface, choose a coherent typography, spacing, color, and surface treatment that suits its audience. For an existing interface, improve the weak parts without replacing its visual identity. Do not infer that every interface should become monochrome, sparse, or typographically identical.

## Visual decisions

Use these cues to question decoration that has accumulated without a purpose. Keep a treatment when it communicates meaning, supports usability, or belongs to the requested art direction.

- **Labels and navigation:** Use pills for meaningful filters, selectable categories, or status. Avoid scattering decorative tags across every section. Keep breadcrumbs when they explain a real hierarchy; omit invented code-path breadcrumbs as atmosphere.
- **Typography:** Choose type for its role and the brand. Instrument Serif is a reference example of an overused choice, not a forbidden font. Limit decorative italics, aggressively tight tracking, and large amounts of monospace text; retain monospace where code or data alignment benefits.
- **Headings:** Let size, weight, placement, and wording establish hierarchy. Use eyebrow labels, section numbers, and all-caps subtitles when they help people navigate. Avoid repeating the same information above and below a heading. Prefer no terminal period on a standalone title unless its wording or the established style calls for one.
- **Surfaces:** Establish grouping through layout and spacing before adding more bordered containers or dividers. Retain boundaries that distinguish fields, table rows, controls, or meaningful regions. Avoid repeated nested boxes around content that already reads as a group.
- **Color:** Use a small, legible set of semantic colors and surface levels. Consolidate near-duplicate shades and arbitrary opacity variations. Retain intentional depth and gradients when they support the design; do not sacrifice contrast to make the screen look quiet.
- **Shape and texture:** Choose corners consistently with the design system. Squircles, dithering, ASCII art, and gradient backgrounds are expressive choices, not automatic signs of poor design. Use them when relevant to the product or requested aesthetic rather than as generic embellishment.
- **Density and diagrams:** Match detail to the task. Show the states and controls people need; avoid ornamental dashboard details, fake metrics, and diagrams more complicated than the explanation. Preserve useful density in tools that require it.
- **Copy:** Remove repeated promises, filler, and labels that merely restate nearby text. Preserve instructions, error recovery, and domain details needed to complete the task.

## Interaction motion

When adding or refining animations, read [motion direction](references/motion-direction.md). Use only the patterns relevant to the interaction. The screenshot's timings and scale factors are starting values to tune, not universal requirements.

Prefer movement that explains origin, destination, continuity, or feedback. A panel can emerge from its trigger; a selected card can expand into its detail view. Avoid animating every item merely because animation is available.

Use the project's existing stack. CSS or native platform transitions may be enough. Do not add a motion library solely to satisfy this skill. If shared-element support is already present, preserve an object's identity across its transition.

## Check the result

Inspect the affected UI at relevant screen sizes and with realistic content. Check that the primary action remains clear and secondary information remains readable. For changed interactions, exercise opening, closing, rapid reversal, keyboard use, and reduced-motion behavior as applicable. Check for lag during dragging, distorted text, clipped focus indicators, and duplicate interactive content during transitions.

If the request is an audit, report specific visible issues and their effect before suggesting changes. If it is implementation, make the scoped changes and report what was actually checked. Do not claim rendered or interaction verification when the environment did not permit it.

## Sources and review history

See [source provenance and interpretation](references/sources.md) when attribution or the distinction between source advice and added guidance matters.

- 2026-11-07: Draft created from the two supplied screenshots. Added contextual exceptions, accessibility checks, and framework-neutral implementation guidance. Behavioral usefulness has not yet been evaluated on a representative UI or compared across models; review fields remain empty.
