# Agentic Workflows Migration

This directory contains GitHub Agentic Workflows (`.md` files) that replace the previous YAML-based automation.

## Active Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `a11y-pr-review.md` | `run-a11y-review` label on PR | Accessibility review of PR changes with Playwright e2e + static analysis |
| `a11y-scheduled-audit.md` | Weekly schedule / manual dispatch | Full repository accessibility audit |

## How It Works

These workflows use [GitHub Agentic Workflows](https://github.github.com/gh-aw/) — a coding agent runs inside GitHub Actions with read-only permissions. Write operations (comments, issue creation) go through **safe outputs**, a security layer that validates and executes them separately.

### Triggering a PR Review

1. Open or update a pull request
2. Add the label **`run-a11y-review`** to the PR
3. The label triggers the agentic workflow (and is auto-removed so you can re-apply it later)
4. The agent reviews changed files, optionally runs Playwright checks against a preview URL, and:
   - Posts a summary comment on the PR
   - Creates individual issues for High/Medium findings (grouped as sub-issues)

### Running a Full Audit

- **Automatic**: Runs weekly on Monday
- **Manual**: Trigger from GitHub Actions UI with optional inputs:
  - `target_url`: URL to test with Playwright
  - `target_scope`: Directory to audit (default: `src/`)
  - `primary_flows`: Comma-separated user flows to analyze

## Setup Requirements

1. Install the `gh-aw` CLI extension:
   ```bash
   gh extension install github/gh-aw
   ```

2. Compile the lock files:
   ```bash
   gh aw compile
   ```

3. Commit both `.md` and `.lock.yml` files.

4. Configure your AI engine secret (see [Authentication docs](https://github.github.com/gh-aw/reference/auth/)):
   - `COPILOT_GITHUB_TOKEN` for Copilot (default), or
   - `ANTHROPIC_API_KEY` for Claude, or
   - `OPENAI_API_KEY` for Codex

## Disabled Workflows

The following YAML workflows have been replaced and disabled (renamed to `.disabled`):

- `pr-to-issue.yml.disabled` — Previously created issues and assigned Copilot via GraphQL on PR open
- `neuro-split-issues.yml.disabled` — Previously split audit reports into individual issues via gh-models

These are kept as reference during migration. They can be safely deleted once the agentic workflows are validated.

## Prompt Library

The audit prompts in `.github/prompts/` are referenced by the agentic workflows:

| Prompt | Role |
|--------|------|
| `a11y-neuro-uber-flow.prompt.md` | Orchestration guide (sections A→L) |
| `a11y-e2e-review.prompt.md` | Playwright-based e2e testing instructions |
| `a11y-neuro-audit-static-code.prompt.md` | Static semantic & structural scan |
| `a11y-neuro-audit-content.prompt.md` | Microcopy & content clarity audit |
| `a11y-neuro-audit-cognitive-flow.prompt.md` | Cognitive flow analysis |
| `a11y-neuro-audit-overview.prompt.md` | Overview & risk matrix |
| `a11y-backlog.prompt.md` | Backlog & issue card generation |
