# Applying motion

Checked 2026-11-07. This is an authored implementation note, not a copy of the external manuals.

Start by identifying what changed: appearance, disappearance, selection, position or completion. Use the project's existing animation tool; do not install Motion for a CSS-only transition.

- Animate a menu relative to its trigger; make closed content inert and restore focus on close.
- For layout changes, a shared `layoutId` represents the same object. Unrelated items need distinct identities.
- Use stable React keys. Rapid toggles should reverse the current movement without resetting focus or losing input.
- Let a dragged object follow the pointer directly. Animate after release.
- Confirm a completed action in the control or content itself; motion alone is insufficient feedback.

With Motion already installed:

```tsx
const reduced = useReducedMotion();
<motion.div
  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.12 } }}
  transition={{ duration: reduced ? 0 : 0.16, ease: 'easeOut' }}
/>
```

Use `AnimatePresence` when an exiting React element must remain mounted for its exit. An animation wrapper does not supply modal semantics, focus trapping, or keyboard handling; keep those in the interaction component.

Verification: keyboard open/close and focus return; reduced-motion setting; repeated toggles; long content; mobile input; no invisible element blocking clicks after exit.

Sources: [Motion layout](https://motion.dev/docs/react-layout-animations), [AnimatePresence](https://motion.dev/docs/react-animate-presence), [reduced motion](https://motion.dev/docs/react-use-reduced-motion). Check current APIs when changing the installed version.
