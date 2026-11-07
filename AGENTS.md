# Repository instructions

To use an entry in another project, start with [USE.md](USE.md). The instructions below govern edits to Collection itself.

- Do not use the Sites plugin.
- Keep the README a short skill picker: name, purpose, date, and one pull example.
- Keep skills short and easy to scan. Put each independently useful skill in `skills/<name>/SKILL.md`.
- Use `templates/SKILL.md.template`. Track creation, update, review date, and status with quoted `YYYY-MM-DD` dates.
- Preserve source attribution. Record tested models and review outcomes only after actual testing.
- Flag guidance for review when its model/tool assumptions change or its review date passes. Deprecate only with a dated reason.
- Collection is a standalone app in `app/`. Do not deploy it under the personal site or enable GitHub Pages without an explicit request.
- Use Arc UI's free components and foundation for the interface. Preserve upstream files and attribution.
- Read the relevant local SKILL.md files before implementation: UI Design for clarity, UI Motion for transitions, Arc for components, and Coding Principles for simple implementation. Prefer centered modals with blurred backdrops for details and previews. Use specialist effects only when the task calls for them.
- The catalog lives in `catalog.json`; keep README links in sync. Label external libraries/tools accurately, retain source links and checked dates, and distinguish local demos from external demos.
- Handoffs must specify source, project-local destination or installation steps, compatibility checks, and verification. Preserve existing files. Track handoff review dates separately from actual installation/application tests; never imply copying a handoff installs anything.
- Keep the shared receiving-agent workflow in USE.md. Copied handoffs identify the selected entry and link there; do not repeat the full workflow in each catalog entry.
- Each entry's prepared bundle is defined by `bundles/<id>/bundle.json`; package canonical source files rather than duplicating them. `npm run bundles` builds downloadable ZIPs locally with source records and file hashes. Keep known working versions and observed incompatibilities in the bundle.
- Saved repositories use kind `Repo`, short notes and source links. Do not imply a repo is an installable skill, automatically star it, or enable monitoring just because it was saved.
- Favorites are user-controlled Collection stars, stored in browser local storage, not GitHub stars. Keep platform tags explicit; use `Reference` for inspiration, workflows and saved posts that are not installable skills. Preserve grouped source links and attached material in their bundles.
- Give each entry a concrete `useWhen` cue and `youGet` summary. Keep Add to project compact: title, one sentence, Copy instructions and a download link. Put the handoff, notes and dates behind one Details disclosure.
