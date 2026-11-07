# Use Collection

This is the entry point for using Collection in another project. Follow the receiving project's instructions. Instructions for editing Collection itself are in [AGENTS.md](AGENTS.md).

1. Find the requested name or ID in [catalog.json](catalog.json). If given a task instead, choose only the entries that help with that task. With no task or selection, offer a short picker.
2. Read `bundles/<id>/bundle.json` and `bundles/<id>/guide.md`. Use one resolved Collection commit for the catalog, manifest, guide and mapped files. If a ZIP was supplied, read its `bundle-manifest.json` and included guide instead.
3. Check the entry's platforms, review date, known versions and limitations. Use the prepared notes first; consult upstream for stale guidance, changed compatibility or missing details. Report inaccessible sources instead of guessing.
4. Compare existing files before copying the selected mappings into the receiving project. Preserve existing work. Skill destinations use `.agents/skills/` for Codex; adapt to another host's documented project-local skill directory. Read the selected `SKILL.md` before applying it.

| Entry | What to do |
| --- | --- |
| Skill | Prepare the selected skill and apply its guidance to the requested work. |
| Library or Tool | Follow its integration guide for the requested feature. Install runtime dependencies only when needed. |
| Reference or Repo | Save the brief and source links. Implement or run it only when requested. |

If asked only to add an entry, prepare it without inventing a feature or starting its workflow. Otherwise, complete the requested implementation and run the relevant project checks. Record sources, versions, dates and checks actually performed in the project reference. Report the result briefly, including anything still unverified.
