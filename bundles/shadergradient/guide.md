# Shader Gradient

Checked 2026-11-07. Includes this integration guide and a small React example.

1. Read the project's React version and current package peers. Fiber 8 pairs with React 18; Fiber 9 with React 19 in the reviewed guide. Do not migrate React implicitly.
2. Install compatible `@shadergradient/react`, `@react-three/fiber`, `three`, `three-stdlib`, and `camera-controls`. Add `@types/three` for TypeScript and keep the project's lockfile.
3. Copy/adapt `examples/shadergradient/Gradient.tsx` in a client-rendered feature. The example imports the current renderer and canvas helper; it does not use the legacy bundled store or controls.
4. Run the target build. Check rendering, resizing, no runtime errors, readable foreground and a static result with reduced motion. If WebGL is unavailable, keep the static background and omit the canvas in the host's capability/error handling.

Source: [current README](https://github.com/ruucm/shadergradient/blob/main/README.md). Vue/Nuxt projects should follow [the Vue package guide](https://github.com/ruucm/shadergradient/blob/main/packages/shadergradient-vue/README.md) rather than translating this React example blindly.

Tested here on React/ReactDOM 19.3.1, Fiber 9.8.2, `@shadergradient/react` 2.4.20, Three.js 0.170.0, `@types/three` 0.170.0, three-stdlib 2.36.1 and camera-controls 3.1.2. Typecheck, build and browser rendering passed in an isolated Vite example. Three.js 0.187.0 failed at runtime with a missing `cube_uv_reflection_fragment` shader chunk; do not use that combination without retesting. This result does not establish compatibility with every host or future release.
