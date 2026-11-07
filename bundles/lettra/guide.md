# Lettra

Checked 2026-11-07 at `65c91fc7c29482aac79c23d4b6db82c800af7a16`. A small MSDF text library for Three.js WebGPURenderer and TSL, with baked font atlases and opt-in text effects.

1. Read the host renderer and Three.js version. The reviewed README requires `three >= 0.185` for the renderer integration. Do not reuse Collection's older Shader Gradient version baseline or upgrade a host scene implicitly.
2. Install compatible `lettra` and `three` with the project's package manager. Keep the lockfile. For renderer integration, use `lettra/three`; the core layout/schema entry is renderer-agnostic.
3. Prepare a licensed font atlas and metrics JSON. The README's bake workflow uses optional dev-time `msdf-bmfont-xml` and fontTools; runtime loading expects both JSON and image URLs. Include space and `?`, use a single atlas page and preserve distance-field settings.
4. Load font data and texture, call `createText`, add its mesh, and warm it up off the visible interaction path. Use the documented `dispose()` ownership rules and avoid disposing shared atlas maps accidentally.
5. Verify the target renderer, glyphs, kerning, resize, text changes, cleanup and reduced-motion handling. Keep accessible DOM text for meaningful content.

It targets Latin-style UI/display text; complex shaping, bidi, large CJK sets and color emoji require another approach. Read current source docs before promising those capabilities.

Sources: [repository README](https://github.com/joyco-studio/lettra/blob/65c91fc7c29482aac79c23d4b6db82c800af7a16/README.md), [docs entry](https://lettra.joyco.studio/llms.txt), [specimen](https://lettra.dev). Runtime and atlas baking have not been tested here.
