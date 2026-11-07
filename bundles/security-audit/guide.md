# Cloudflare Security Audit

Checked 2026-11-07. Includes the complete upstream skill, phase references, schemas, validators and MIT license at `c1c8a8c1471069fb0e188eeaff69b8e8db6564a8`.

Copy `.agents/skills/security-audit/` after comparing an existing installation. Read SKILL.md first; it distinguishes focused guidance from a full audit. Collecting or installing the skill does not run an audit.

The full workflow requires a capable agent with independent subagents, Node.js and the OS-enforced execution controls described upstream. It maps coverage, investigates candidates, independently verifies findings and produces structured records/reports. Preserve unresolved findings as `needs_validation`; do not label a concern confirmed without evidence.

The bundled scripts validate coverage/findings records. No target application or security audit was executed in Collection. Check the receiving agent's capabilities and authorized scope before starting an audit.

Local validator self-tests exposed a platform limitation: on this Windows/Node host the CLI refuses file input because OS no-follow/nonblocking protection is unavailable. The upstream test suite therefore did not fully pass here. Preserve those protections and evaluate the CLI on a supported environment; do not bypass the check to make an audit run. The catalog tags this workflow for macOS/Linux, whose execution requirements still need verification on the receiving host.

Source: [Cloudflare repository](https://github.com/cloudflare/security-audit-skill). Upstream installation also supports `npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit`.
