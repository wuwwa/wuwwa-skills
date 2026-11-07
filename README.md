# wuwwa-skills

A personal collection of skills and useful agent workflows.

Started: **2026-11-07**. Guidance belongs to the models and tools it was tested with; keep that context visible as capabilities change.

## Collection

| Skill | Purpose | Added | Status |
| --- | --- | --- | --- |
| [UI Design Polish](skills/ui-design-polish/SKILL.md) | Contextual visual restraint and purposeful interaction motion, adapted from two supplied design screenshots. | 2026-11-07 | Draft; behavioral evaluation pending. |

## Use these skills in projects

Keep the master copies in this repository. For repeatable project work, install or copy the chosen skill folder, including its references, into the project's `.agents/skills/` directory. Record the upstream commit in that project's documentation and update deliberately so later edits here do not silently change ongoing work.

For example:

```text
your-project/
  AGENTS.md
  .agents/skills/ui-design-polish/
    SKILL.md
    agents/openai.yaml
    references/
```

Add a short instruction to that project's `AGENTS.md`:

```markdown
For UI design or interaction polish, read
`.agents/skills/ui-design-polish/SKILL.md` and its relevant linked references.
Apply the guidance within this project's design system and product requirements.
```

Then ask the agent to use the installed skill, for example:

```text
Use $ui-design-polish to refine this screen's hierarchy and interactions.
Preserve the existing brand and focus on the checkout flow.
```

For a personal default across projects, a user-level installation in `~/.agents/skills/ui-design-polish/` is an alternative. Prefer a project copy when collaborators or remote agents need the same version. Avoid installing the same named skill in multiple scopes unintentionally.

A GitHub URL by itself does not install the skill or load its instructions. For a one-off task, explicitly tell the agent to read `skills/ui-design-polish/SKILL.md` and the relevant references from this repository at a chosen commit. That depends on repository access and requires repeating the instruction in other environments.

Project `AGENTS.md` files should hold local requirements such as brand choices, supported devices, accessibility expectations, and build commands. The reusable skill holds the longer design workflow. Links to project screenshots or other visual references provide the direction for a particular product.

Local discovery and invocation details above follow [OpenAI's skills documentation](https://learn.chatgpt.com/docs/build-skills) and [AGENTS.md documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md), checked **2026-11-07**. Other agents may use different skill locations and instruction files.

## Add a skill

1. Create `skills/<skill-name>/SKILL.md` using [the starter template](templates/SKILL.md.template). Replace its example name, description, dates, and instructions.
2. Use lowercase letters, digits, and hyphens for the name. Keep supporting scripts, references, or assets in the same skill folder when needed.
3. Record the source and its original date when importing material. Preserve attribution and applicable license terms.
4. Start with `draft` status. Record an actual review and its model/tool context before marking the skill `active`.

Keep other collected notes in `notes/` when needed, with an added date and source. Add folders as content arrives.

## Dates and model context

Use `YYYY-MM-DD` dates in each skill's frontmatter `metadata`. Leave unknown or unperformed review fields empty; do not invent dates or imply testing.

| Field | Meaning |
| --- | --- |
| `created` | Date added to this collection; preserve it on later edits. |
| `updated` | Date the skill's instructions or supporting resources last changed. |
| `last-reviewed` | Date someone actually checked whether the guidance still helps. |
| `tested-with` | Model identifier and relevant tool/runtime versions used in that review. |
| `review-after` | Next review date; reaching it means review is due. |
| `status` | `draft`, `active`, `needs-review`, or `deprecated`. |
| `source` | Original URL or provenance, if applicable. |
| `source-date` | Original publication or authoring date, if known; distinct from the collection date. |

For an active skill, choose a review date appropriate to its subject. **90 days after review** is a starting point for model-dependent guidance. Review sooner when its model, tool, API, or workflow changes or a failure exposes an assumption.

`active` means useful in the recorded context, not verified against every newer model. If the review date has passed or that context changes, treat it as `needs-review` until checked. Age or a newer model alone does not prove a skill is obsolete.

During review, compare a representative task with and without the skill. Remove instructions the model now handles reliably and retain guidance that still adds value. Update `last-reviewed`, `tested-with`, `review-after`, and `status`; update `updated` when instructions or resources change.

Keep a short, dated **Review history** inside each skill: what was checked, the outcome, and any supporting evidence. When retiring guidance, set `status: deprecated`, add `deprecated-on: "YYYY-MM-DD"` to metadata, and explain why in that history. Link a replacement when one exists. Preserve that context for future readers.

These dates are maintained during collection and review; this repository does not run scheduled model evaluations.
