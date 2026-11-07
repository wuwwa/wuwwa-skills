# Handoff checks · 2026-11-07

| Entry | Evidence | Not established |
| --- | --- | --- |
| UI Design, UI Motion | Complete canonical skills packaged locally; Motion includes an authored implementation reference. Metadata and ZIP contents validated | Host discovery and quality in another project |
| Coding Principles | Six screenshot-derived principles, original supplied image and attribution packaged. Metadata validated | Original X post and model performance |
| Arc UI | Local adapter and setup notes packaged; Arc's free components build and run in Collection. Original upstream skill bundle was also download-checked | Installation in another framework/project |
| React Three Fiber | Included scene typechecked, built and rendered in an isolated Vite app. Tested versions recorded in bundle | Target-project integration |
| Liquid Glass JS | Reviewed source-file quick start and dependency/load order | Runtime, cleanup and framework integration |
| Shader Gradient | Included example typechecked, built and rendered using recorded versions. Three.js 0.187.0 failed; 0.170.0 rendered successfully | Target-project integration and future versions |
| Liquid Logo | Reviewed PNG/MP4 export and local authoring workflow | Export with a supplied logo |
| Lot Vulture | Repo metadata, README and license checked at `33440cd1b445623850b4300362ac825adf1aa533`; short brief packaged | Application install, camera input and runtime behavior |

Sources: [Codex project skill locations](https://learn.chatgpt.com/docs/build-skills), [Arc skill](https://uiarc.dev/r/skills/arc/SKILL.md), [Arc installation](https://uiarc.dev/docs/installation), [R3F installation](https://r3f.docs.pmnd.rs/getting-started/installation), [Liquid Glass README](https://github.com/dashersw/liquid-glass-js/blob/main/README.md), [Shader Gradient README](https://github.com/ruucm/shadergradient/blob/main/README.md), [Liquid Logo README](https://github.com/collidingScopes/liquid-logo/blob/main/README.MD).

`npm run bundles` verifies archive file hashes. Downloads contain the prepared skills/guides/examples and a source manifest; they do not install runtime dependencies or run an agent. Another project still needs compatibility and behavior checks. Unavailable sources must be reported, not guessed.
