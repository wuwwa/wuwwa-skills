# Hairline

Interactive isometric line illustrations by Lucas Marques. Checked 2026-11-07 at `37d2e78dcb333ab30c3338e28ed4a690364ea014` (package 0.5.1, MIT). Review after 2027-02-05.

[Live figures and snippet inspector](https://hairline.lucasmarkes.com) · [Custom figure examples](https://hairline.lucasmarkes.com/skills)

## Use an existing figure

Install `@lucasmarkes/hairline@0.5.1` with the project's package manager and retain its lockfile. This is the reviewed version, not a runtime-tested baseline. Check newer releases before changing it. The package is ESM with no runtime dependencies; its optional React entry needs React 18+.

```tsx
import { Terrain } from "@lucasmarkes/hairline/react";

export function Illustration() {
  return <Terrain intensity={0.5} label="Pillars rising around the pointer" />;
}
```

Place it in the project's existing component directory. It fills its parent at a 5:4 aspect ratio. For a non-React page, import `terrain` from `@lucasmarkes/hairline`, mount it into a DOM element after mount, and call the returned `destroy()` on teardown.

Set `--hairline-plate` to the surface's background: plates are opaque so rear lines stay hidden. Keep meaningful content in accessible page text. Autoplay is opt-in with `play`; reduced motion stops autoplay but still permits pointer responses.

## Make a custom figure

The upstream repo also includes two agent skills:

- [hairline-create](https://github.com/lucasmarkes/hairline/tree/37d2e78dcb333ab30c3338e28ed4a690364ea014/skills/hairline-create): an idea becomes a standalone interactive HTML figure.
- [hairline-adopt](https://github.com/lucasmarkes/hairline/tree/37d2e78dcb333ab30c3338e28ed4a690364ea014/skills/hairline-adopt): rebuild an SVG's object as a figure; depends on hairline-create.

For a custom figure request, fetch the complete selected skill directories and root LICENSE from the same upstream commit. Copy them to `.agents/skills/hairline-create/` and, when needed, `.agents/skills/hairline-adopt/`, preserving existing files and the license. Read their SKILL.md files before applying them. The create skill needs its kernel, page template, rules, scripts and examples; copying SKILL.md alone is incomplete.

Node is used for building and validation. The visual-check script uses a browser and can install `playwright-core` outside the skill folder; inspect its setup before running it. Follow the skill's documented fallback when browser checks are unavailable. Output is `hairline-<name>.html`, with no runtime dependency on the npm package. These upstream skills are linked, not included in this download.

## Verify in the receiving project

Check the project's build, sizing, theme, pointer/touch behavior, accessible description, reduced motion and unmount cleanup. For a custom figure, run the upstream validator and inspect the generated visual checks. Record the actual package or skill revision and checks performed here.

Only source documentation, package requirements, license and skill entry points were reviewed in Collection. No Hairline runtime, generation workflow or target-project integration was tested; no incompatibility has been established.

Sources: [README](https://github.com/lucasmarkes/hairline/blob/37d2e78dcb333ab30c3338e28ed4a690364ea014/README.md), [package manifest](https://github.com/lucasmarkes/hairline/blob/37d2e78dcb333ab30c3338e28ed4a690364ea014/packages/hairline/package.json), [license](https://github.com/lucasmarkes/hairline/blob/37d2e78dcb333ab30c3338e28ed4a690364ea014/LICENSE).
