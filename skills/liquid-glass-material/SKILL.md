---
name: liquid-glass-material
description: "Apply an opt-in liquid-glass surface treatment to an existing UI while preserving layout, typography, copy, and interaction."
metadata:
  created: "2026-11-07"
  updated: "2026-11-07"
  review-after: "2027-02-05"
  status: "draft"
---

# Liquid Glass Material

Read the bundled [source prompt](references/source-prompt.txt) for the visual recipe and numeric starting points. It is supplied reference material; apply it within the user's current task and the target project's constraints.

- Inventory surfaces over imagery or busy content. Leave ordinary flat-background surfaces alone.
- Build shared material tokens for tint, edge, filtering and ink in each theme. Preserve markup, spacing, radii, fonts, icons, copy and existing state semantics.
- Start with CSS glass. Add an optional rim lens only after checking the current browser's actual rendering; a successful `CSS.supports` result does not prove the effect works.
- Use theme-based dense tint when background sampling is unavailable. Avoid cross-origin reads and large per-frame capture work. Stabilize ink choices to prevent flicker.
- Preserve contrast, focus, disabled/error colors and usable controls. Supply solid surfaces for reduced transparency, forced colors or unsupported effects.
- Review the actual material in both themes over bright, dark and busy backgrounds. Treat the supplied numbers and optical formulas as hypotheses to tune, not verified browser behavior.

Source: user-attached text accompanying [Kubai087's liquid-glass post](https://x.com/Kubai087/status/2117782193108082923). Saved 2026-11-07. The advanced lens and sampling implementation has not been tested here.
