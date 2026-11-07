# Arc setup

Checked 2026-11-07. Authored summary of [installation](https://uiarc.dev/docs/installation) and the [upstream skill](https://uiarc.dev/r/skills/arc/SKILL.md).

1. Inspect React, the build tool, aliases and existing `components.json`. Arc supplies React components and CSS modules; retain the host framework.
2. With shadcn configured, install the foundation and required free components using full registry URLs:

```sh
npx shadcn@latest add https://uiarc.dev/r/arc-foundation.json https://uiarc.dev/r/button.json
```

Use the project's package runner. This example installs a button, not the whole library. Review generated changes before accepting replacements.

3. Import `@/components/arc/foundation.css` once at the root. The `@/components` alias must match the existing project's configuration. Load Geist and Inter and expose their family names as `--font-geist` and `--font-inter`.
4. Read only the component page needed for the task: `https://uiarc.dev/components/<id>/markdown`. The full catalog is `https://uiarc.dev/llms.txt`.

Components already used in Collection:

| Need | Registry id | API detail |
| --- | --- | --- |
| Action | `button` | Named `Button`; set `variant` explicitly for secondary actions |
| Search | `search-field` | `label`, `value`, `onValueChange` |
| 2–5 data views | `segmented-control` | Default export; `options`, `value`, `onValueChange` |
| Fixed choice list | `select` | `label`, `options`, `value`, `onValueChange` |
| Centered modal | `dialog` | `Dialog` root and `DialogContent` with title/description |
| Empty results | `empty-state` | Title, description and a useful next action |
| Copyable instructions | `textarea` | Label plus ordinary textarea attributes |

Use `--background`, `--surface`, `--foreground`, `--text-secondary`, `--border` and the `--accent-*` roles. Use the `--text-*` and `--space-*` scales. Weights 400 and 500 suffice. Do not recreate internal component styling.

`data-theme="dark"` and `data-accent` live on `<html>`. Check focus return, Escape, pointer dismissal, reduced motion and long text in overlays. A successful build does not prove the interface is usable.

Collection has exercised these components in its own React/Vite app. Other host frameworks still require their own build and browser checks. The local adapter does not include upstream component source or a Pro entitlement.
