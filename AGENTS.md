# Repository instructions

- Do not use the Sites plugin.
- Keep the README a short skill picker: name, purpose, date, and one pull example.
- Keep skills short and easy to scan. Put each independently useful skill in `skills/<name>/SKILL.md`.
- Use `templates/SKILL.md.template`. Track creation, update, review date, and status with quoted `YYYY-MM-DD` dates.
- Preserve source attribution. Record tested models and review outcomes only after actual testing.
- Flag guidance for review when its model/tool assumptions change or its review date passes. Deprecate only with a dated reason.
- Collection is a standalone app in `app/`. Do not deploy it under the personal site or enable GitHub Pages without an explicit request.
- Use Arc UI's free components and foundation for the interface. Preserve upstream files and attribution.
- Apply the collection's relevant skills to the app itself: UI Design for clarity, UI Motion for transitions, and Arc for components. Prefer centered modals with blurred backdrops for details and previews. Use specialist effects only when the task calls for them.
- The catalog lives in `catalog.json`; keep README links in sync. Label external libraries/tools accurately, retain source links and checked dates, and distinguish local demos from external demos.
- Handoffs must specify source, project-local destination or installation steps, compatibility checks, and verification. Preserve existing files. Track handoff review dates separately from actual installation/application tests; never imply copying a handoff installs anything.
- Each entry's prepared bundle is defined by `bundles/<id>/bundle.json`; package canonical source files rather than duplicating them. `npm run bundles` builds downloadable ZIPs locally with source records and file hashes. Keep known working versions and observed incompatibilities in the bundle.
- Saved repositories use kind `Repo`, short notes and source links. Do not imply a repo is an installable skill, automatically star it, or enable monitoring just because it was saved.
