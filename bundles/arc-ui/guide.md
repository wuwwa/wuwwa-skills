# Arc UI

Checked 2026-11-07. Includes Collection's local Arc adapter, its agent metadata and practical setup/component notes. Upstream component code is installed from the official registry when needed.

Copy `.agents/skills/arc-ui/` into the project after comparing existing files. Read SKILL.md and `references/setup.md`. The local notes cover components already exercised in Collection, so the agent need not re-read the entire upstream catalog.

For a new component, check its current `/markdown` documentation. Resolve dependencies against the target project's React/framework version. Build and inspect the actual UI; access to Pro components is separate.

Sources: [Arc skill](https://uiarc.dev/r/skills/arc/SKILL.md), [installation](https://uiarc.dev/docs/installation). Collection's React/Vite integration works; another project's compatibility remains to be verified.
