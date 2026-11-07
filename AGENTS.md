# Repository instructions

Please do not use the "sites" plugin.

This repository collects personal skills and useful agent workflows.

- Store skills in `skills/<skill-name>/SKILL.md`. Start from `templates/SKILL.md.template` and replace all example content.
- Record `created`, `updated`, `last-reviewed`, `tested-with`, `review-after`, and `status` inside frontmatter `metadata`, following README.md. Use quoted `YYYY-MM-DD` strings for dates; leave unknown review values empty.
- Use the user's current local date. Preserve the original `created` date and source dates. Change `updated` when instructions or supporting resources change.
- Only set `last-reviewed` or claim a model was tested after a real review. A wording edit alone is not behavioral validation.
- Treat an elapsed `review-after` date or changed model/tool assumptions as `needs-review`. A newer model or an old date alone is not evidence to deprecate a skill.
- After review, record the model/tool context, outcome, and evidence in a dated Review history entry. Set the next review date; 90 days is a starting point for model-dependent guidance.
- When evidence supports retirement, set `status: deprecated`, record `deprecated-on`, explain the reason, and link a replacement if available. Preserve useful historical context.
- Keep provenance and applicable license terms when importing skills. Keep instructions concise and include supporting files only when they help the workflow.
- Date other collected notes and include their sources when available.
