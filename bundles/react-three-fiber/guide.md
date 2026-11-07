# React Three Fiber

Checked 2026-11-07. Includes this guide and a minimal React scene example. This is a library integration bundle.

1. Check React/ReactDOM and current package peer dependencies. The reviewed guide pairs Fiber 8 with React 18, Fiber 9 with React 19. Preserve the host framework.
2. Install compatible `three` and `@react-three/fiber` with the project's package manager. Add `@types/three` for TypeScript if needed. Keep the lockfile.
3. Copy/adapt `examples/react-three-fiber/Scene.tsx` only for the requested feature. Its container supplies a height; SSR hosts must render Canvas on the client. The example does not require Drei or external assets.
4. Verify a lit cube renders, the canvas resizes, WebGL failure presents a useful fallback, and the page remains usable with keyboard input. Run the target build and relevant checks.

The example has no continuous animation, so it needs no reduced-motion animation branch. It is a starting scene, not a complete accessible 3D application.

Sources: [installation](https://r3f.docs.pmnd.rs/getting-started/installation), [first scene](https://r3f.docs.pmnd.rs/getting-started/your-first-scene), [repository](https://github.com/pmndrs/react-three-fiber). Recheck peer dependencies when upgrading; the package lock belongs to the receiving project.

The included scene typechecked, built and rendered in an isolated Vite app with React/ReactDOM 19.3.1, Fiber 9.8.2, Three.js 0.170.0 and `@types/three` 0.170.0. This is a tested baseline, not a requirement to downgrade an existing project.
