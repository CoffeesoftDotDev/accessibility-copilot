# 🎵 Accessibility Copilot — Album Viewer

A simple web application with **intentional accessibility issues**, designed to demonstrate how **GitHub Copilot** can assess, identify, and remediate WCAG 2.2 violations through automated workflows.

The app is a Vue.js / TypeScript music store that looks perfectly functional visually but contains **21 WCAG 2.2 violations** — making it a hands-on playground for accessibility auditing and automated remediation with GitHub Copilot.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)
- A GitHub account with access to [GitHub Copilot](https://github.com/features/copilot)

## Run the App Locally

```bash
cd SamplesAndTest/album-viewer
npm install
npm run dev
```

The app starts on `http://localhost:5173` by default (Vite dev server).

---

## Repository Structure

```
├── SamplesAndTest/
│   └── album-viewer/          # Vue.js app with intentional a11y issues
│       ├── src/               # Application source code
│       ├── index.html         # Entry point (missing lang, skip link, etc.)
│       ├── package.json       # Dependencies & scripts
│       └── vite.config.ts     # Vite configuration
├── .github/
│   ├── instructions/
│   │   └── a11y.instructions.md   # Accessibility rules for Copilot
│   └── workflows/                 # Agentic workflows for automated a11y review
├── docs/
│   └── a11y-audit-scenario.md     # Detailed before/after for all 21 violations
└── README.md
```

## Accessibility Instructions

The accessibility rules used by Copilot are defined in [`.github/instructions/a11y.instructions.md`](.github/instructions/a11y.instructions.md). These instructions are based on WCAG 2.2 AA standards and cover semantic HTML, ARIA, keyboard navigation, forms, color contrast, and framework-specific patterns.

> **Keeping instructions up to date:** The community-maintained source of truth is the [awesome-copilot accessibility instructions](https://github.com/github/awesome-copilot/blob/main/instructions/a11y.instructions.md). Check there for the latest updates and contribute improvements.

---

## Demo Scenario

### Goal

Use GitHub Copilot to **automatically audit** a pull request for accessibility issues, **create tracking issues**, and **trigger automated remediation** via the Coding Agent.

### Steps

1. **Create a Pull Request** from the `feat/new-concerts-near-you-feature` branch into `main`

2. **Add the `run-a11y-review` label** on the PR — this triggers the agentic workflow that performs the accessibility audit

3. **Watch the Copilot session** running in the GitHub Actions tab — the agent reviews the changed files against WCAG 2.2 criteria

4. **Check the issues created automatically** once the session ends (approximately 15–20 minutes) — each accessibility violation is filed as an individual issue with severity, WCAG reference, and recommended fix

5. **Assign an issue to the Coding Agent** from the issue panel to trigger an automatic remediation — Copilot will open a PR with the proposed fix

### What Gets Detected

The app contains 21 intentional violations across 4 areas:

| Area | Examples | Count |
|------|----------|-------|
| **Page setup** | Missing `lang`, no skip link, no landmarks, low contrast | 6 |
| **Album cards** | `<div>` instead of `<button>`, no `alt` text, positive `tabindex` | 6 |
| **Album preview modal** | No focus trap, no Escape key, flash animation, non-interactive play button | 4 |
| **Cart & checkout** | No labels on inputs, unlinked errors, enforced time limit, blinking animation | 5 |

> For a detailed before/after breakdown of every violation, see [`docs/a11y-audit-scenario.md`](docs/a11y-audit-scenario.md).

---

## Fork & Setup Guide

If you fork this repo, you need to configure a **GitHub App** and a **Copilot token** for the agentic workflows to run.

### 1. Create a GitHub App

1. Go to **Settings → Developer settings → GitHub Apps → New GitHub App**
2. Fill in the basics:
   - **Name**: e.g. `a11y-copilot-bot`
   - **Homepage URL**: your repo URL
   - **Webhook**: uncheck "Active" (not needed)
3. Set **repository permissions**:

   | Permission | Access | Why |
   |-----------|--------|-----|
   | **Contents** | Read | Read source files during audit |
   | **Issues** | Read & Write | Create issues for findings |
   | **Pull requests** | Read & Write | Post review comments on PRs |
   | **Metadata** | Read | Required by default |

4. Click **Create GitHub App**
5. Note the **App ID** displayed on the app's settings page
6. Scroll to **Private keys** → **Generate a private key** — a `.pem` file downloads

### 2. Install the GitHub App

1. From the app's settings page, click **Install App** in the left sidebar
2. Select your fork's account/org
3. Choose **Only select repositories** → pick your fork
4. Click **Install**

### 3. Configure Repository Secrets & Variables

Go to your fork: **Settings → Secrets and variables → Actions**

#### Variables (tab: Variables)

| Name | Value |
|------|-------|
| `APP_ID` | The App ID from step 1 |

#### Secrets (tab: Secrets)

| Name | Value |
|------|-------|
| `APP_PRIVATE_KEY` | The full contents of the `.pem` file from step 1 |

These are referenced by the agentic workflows in `.github/workflows/a11y-pr-review.md` and `a11y-scheduled-audit.md`:
```yaml
github-app:
  app-id: ${{ vars.APP_ID }}
  private-key: ${{ secrets.APP_PRIVATE_KEY }}
```

### 4. Copilot as the AI Engine

The agentic workflows use **GitHub Copilot** as the default AI engine. This requires:

- **GitHub Copilot** enabled on your account/org (Business or Enterprise plan)
- The repository must have **GitHub Actions** enabled
- No additional secret is needed — Copilot authentication is handled automatically by the `gh-aw` runtime via the `GITHUB_TOKEN` provided by Actions

> **Alternative AI engines**: If you want to use a different model, add the corresponding secret and update the workflow configuration:
>
> | Engine | Secret name | Docs |
> |--------|------------|------|
> | Anthropic (Claude) | `ANTHROPIC_API_KEY` | [gh-aw auth docs](https://github.github.com/gh-aw/reference/auth/) |
> | OpenAI (Codex) | `OPENAI_API_KEY` | [gh-aw auth docs](https://github.github.com/gh-aw/reference/auth/) |

### 5. Compile the Agentic Workflows

After forking and configuring secrets, compile the lock files:

```bash
gh extension install github/gh-aw
gh aw compile
```

The `.lock.yml` files are already committed in this repo. You only need to recompile if you modify the `.md` workflow files.

### Quick Checklist

- [ ] GitHub App created with Contents (read), Issues (read/write), Pull requests (read/write)
- [ ] App installed on the fork
- [ ] `APP_ID` added as repository **variable**
- [ ] `APP_PRIVATE_KEY` added as repository **secret**
- [ ] GitHub Copilot enabled on the account/org
- [ ] GitHub Actions enabled on the fork

---

## References

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2)
- [awesome-copilot accessibility instructions](https://github.com/github/awesome-copilot/blob/main/instructions/a11y.instructions.md)
- [GitHub Agentic Workflows docs](https://github.github.com/gh-aw/)
- [gh-aw authentication reference](https://github.github.com/gh-aw/reference/auth/)
