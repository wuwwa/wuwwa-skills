# Liquid Logo

Checked 2026-11-07. A browser authoring workflow, not an agent skill or runtime dependency.

1. Find the intended logo in the target project. Keep the original. Ask for the asset only when it is missing.
2. Open [Liquid Logo](https://collidingscopes.github.io/liquid-logo/), upload the image, choose settings and export PNG or MP4. The reviewed tool supports those formats; do not promise transparent video without checking the actual export.
3. Put approved exports in the project's asset directory. Check dimensions, playback, file size and appearance in the product. Give meaningful logos alternative text; provide a static asset for reduced motion.
4. Record the chosen settings and source. If browser access or a logo is unavailable, report export as pending instead of treating a link as an installed animation.

For local authoring only, clone [the source](https://github.com/collidingScopes/liquid-logo) into a separate tools directory, retain `LICENSE.txt`, and serve it with `python -m http.server`. Do not embed the authoring application into the product unless requested.

Source: [README.MD](https://github.com/collidingScopes/liquid-logo/blob/main/README.MD). Export with a supplied logo has not been tested here.
