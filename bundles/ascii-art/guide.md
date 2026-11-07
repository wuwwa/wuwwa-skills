# ASCII / Dot Art

Checked 2026-11-07. Includes upstream instructions, Python scripts, engine, format references, map/example scene files and MIT license at `0968699a97e1807b54e7b7db2603c351490adaed`.

1. Copy `.agents/skills/ascii-art/` after comparing existing files; read SKILL.md and its format references.
2. Prepare Python 3.10+ with numpy, scipy, Pillow, scikit-image and Playwright in the project's chosen isolated environment. Install Playwright Chromium where needed. Video export also needs ffmpeg.
3. Use a supplied or licensed source image. Run the bundled photo-to-map tool, inspect the still, then build a scene. Render a contact sheet before exporting every frame and encoding video.
4. The included scene examples reference third-party photos that are not shipped. Replace those references or work from the bundled dot map; do not describe the examples as runnable unchanged.
5. Check likeness, fixed-grid consistency, loop continuity and actual output dimensions/format. Package requested HTML, stills or video rather than the entire authoring environment into the product.

Source: [0xSero/ascii-art](https://github.com/0xSero/ascii-art). Source files and packaging checked; image conversion/rendering have not been exercised here.
