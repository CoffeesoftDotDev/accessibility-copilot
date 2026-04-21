# Accessibility Copilot — Setup Guide

Step-by-step instructions to configure and run the neuro-inclusive accessibility agentic workflows on your repository.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Install the gh-aw CLI Extension](#2-install-the-gh-aw-cli-extension)
3. [Create the GitHub App](#3-create-the-github-app)
4. [Install the GitHub App on Your Org/Repo](#4-install-the-github-app-on-your-orgrepo)
5. [Create the Copilot Engine Token (PAT)](#5-create-the-copilot-engine-token-pat)
6. [Configure Repository Secrets and Variables](#6-configure-repository-secrets-and-variables)
7. [Create Required Labels](#7-create-required-labels)
8. [Compile and Push the Workflows](#8-compile-and-push-the-workflows)
9. [Trigger the Workflows](#9-trigger-the-workflows)
10. [Workflow Capabilities Summary](#10-workflow-capabilities-summary)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Prerequisites

- A GitHub repository with [GitHub Actions](https://docs.github.com/en/actions) enabled
- The [`gh` CLI](https://cli.github.com/) installed and authenticated
- A GitHub account with an **active Copilot license** (required for the AI engine)
- Repository admin access (to configure secrets, variables, and labels)

## 2. Install the gh-aw CLI Extension

The agentic workflows are authored as `.md` files and compiled into `.lock.yml` files using the `gh-aw` CLI extension.

```bash
gh extension install github/gh-aw
```

Verify the installation:

```bash
gh aw --version
```

> **Official docs:** [GitHub Agentic Workflows — Getting Started](https://github.github.com/gh-aw/introduction/overview/)

## 3. Create the GitHub App

The workflows use a **GitHub App** for short-lived, scoped authentication to read repo data and write safe outputs (comments, issues, labels). This is more secure than a long-lived PAT.

> **Official docs:** [Using a GitHub App for Authentication](https://github.github.com/gh-aw/reference/auth/#using-a-github-app-for-authentication)

### 3.1 Create the App

1. Go to **[GitHub Developer Settings → New GitHub App](https://github.com/settings/apps/new)**
2. Fill in:
   - **Name:** `a11y-copilot-reviewer` (or your preferred name)
   - **Description:** `Neuro-inclusive accessibility automation for GitHub repositories. Runs WCAG 2.2 AA audits on pull requests and scheduled scans, with cognitive support patterns for autistic (TSA) and ADHD (TDAH) users.`
   - **Homepage URL:** your repository URL
   - **Callback URL:** your repository URL (placeholder — not used)
3. Under **Identifying and authorizing users:**
   - **Uncheck** "Request user authorization (OAuth) during installation"
   - **Uncheck** "Enable Device Flow"
4. Under **Post installation:**
   - Leave Setup URL blank
5. Under **Webhook:**
   - **Uncheck** "Active" (no webhook needed)

### 3.2 Set Repository Permissions

Under **Permissions & events → Repository permissions**, configure:

| Permission | Access Level | Why |
|---|---|---|
| **Actions** | Read-only | Workflow status checks |
| **Contents** | Read and write | Read repository files for audit |
| **Discussions** | Read and write | Status comments on workflow runs |
| **Issues** | Read and write | Create issues, update issues, close older issues |
| **Metadata** | Read-only | Mandatory (auto-selected) |
| **Pull requests** | Read and write | Add review comments, read PR diffs |

No **Organization permissions** or **Account permissions** are needed.

### 3.3 Generate and Download the Private Key

1. After creating the App, go to **General → Private keys**
2. Click **Generate a private key**
3. Save the downloaded `.pem` file securely — you will need it in [step 6](#6-configure-repository-secrets-and-variables)
4. Note the **App ID** displayed on the App's General page

## 4. Install the GitHub App on Your Org/Repo

1. Go to your App's settings page → **Install App** (left sidebar)
2. Select your organization (e.g., `CoffeesoftDotDev`)
3. Choose **"Only select repositories"** and pick your target repo, or **"All repositories"**
4. Click **Install**

### ⚠️ Important: Accept Updated Permissions

If you modify the App's permissions after installation, the org/repo installation must **accept the changes**:

1. Go to **Organization Settings → Third-party Access → GitHub Apps** (or **Integrations → Applications**)
2. Click **Configure** next to your App
3. A banner will appear asking to **review and accept** the updated permissions
4. **Accept** the new permissions

> **The workflow will fail with `422 — The permissions requested are not granted to this installation`** if pending permission changes are not accepted.

## 5. Create the Copilot Engine Token (PAT)

The `COPILOT_GITHUB_TOKEN` authenticates the AI engine (GitHub Copilot) that powers the agentic reasoning. **This must be a fine-grained PAT** — GitHub Apps are not supported for this secret.

> **Official docs:** [COPILOT_GITHUB_TOKEN](https://github.github.com/gh-aw/reference/auth/#copilot_github_token)

1. **[Create a fine-grained PAT](https://github.com/settings/personal-access-tokens/new?name=COPILOT_GITHUB_TOKEN&description=GitHub+Agentic+Workflows+-+Copilot+engine+authentication&user_copilot_requests=read)** (link pre-fills name and permission)
2. Verify these settings:
   - **Resource owner:** Your **personal account** (not the organization)
   - **Repository access:** No repositories needed (this token is for Copilot API only)
   - **Account permissions → Copilot Requests:** **Read**
3. Click **Generate token** and copy the value
4. The PAT owner's account **must have an active Copilot license**

## 6. Configure Repository Secrets and Variables

Store the authentication credentials in your repository:

### Using the CLI (recommended)

```bash
# Store the App ID as a repository variable (not sensitive)
gh variable set APP_ID --body "<your-app-id>" --repo <owner>/<repo>

# Store the App private key as a secret
gh aw secrets set APP_PRIVATE_KEY --value "$(cat path/to/private-key.pem)"

# Store the Copilot engine token
gh aw secrets set COPILOT_GITHUB_TOKEN --value "<your-pat-token>"
```

### Using the GitHub UI

1. Go to **Repository → Settings → Secrets and variables → Actions**
2. Under **Variables**, create:

   | Variable | Value |
   |---|---|
   | `APP_ID` | Your GitHub App's ID (e.g., `3452470`) |

3. Under **Secrets**, create:

   | Secret | Value |
   |---|---|
   | `APP_PRIVATE_KEY` | Full contents of the `.pem` private key file |
   | `COPILOT_GITHUB_TOKEN` | The fine-grained PAT from [step 5](#5-create-the-copilot-engine-token-pat) |

### Summary of All Secrets and Variables

| Name | Type | Purpose |
|---|---|---|
| `APP_ID` | Variable | GitHub App ID for token minting |
| `APP_PRIVATE_KEY` | Secret | GitHub App private key (`.pem`) |
| `COPILOT_GITHUB_TOKEN` | Secret | Fine-grained PAT for Copilot AI engine |

## 7. Create Required Labels

The PR review workflow is triggered by adding a label. Create it on your repo:

```bash
gh label create "run-a11y-review" \
  --description "Triggers the a11y PR accessibility review workflow" \
  --color "0E8A16" \
  --repo <owner>/<repo>
```

Or create it manually in **Repository → Issues → Labels → New label**.

## 8. Compile and Push the Workflows

After any change to the `.md` workflow sources, recompile the `.lock.yml` files:

```bash
# Compile all workflows
gh aw compile

# If new secrets were added, approve the changes
gh aw compile --approve-updates
```

Commit and push both `.md` and `.lock.yml` files:

```bash
git add .github/workflows/*.md .github/workflows/*.lock.yml .github/aw/
git commit -m "feat: compile agentic workflows"
git push
```

> **Important:** The `.lock.yml` files are what GitHub Actions actually runs. Never edit them manually — always edit the `.md` source and recompile.

## 9. Trigger the Workflows

### PR Accessibility Review

| Step | Action |
|---|---|
| 1 | Open or update a pull request |
| 2 | Add the label **`run-a11y-review`** to the PR |
| 3 | The workflow runs automatically (label is consumed) |
| 4 | Results appear as: PR comment + individual issues prefixed `[A11Y]` |

### Full Repository Audit

| Method | How |
|---|---|
| **Automatic** | Runs every Monday (cron schedule) |
| **Manual** | Go to **Actions → a11y-scheduled-audit → Run workflow** |

Manual dispatch accepts optional inputs:

| Input | Description | Default |
|---|---|---|
| `target_url` | URL to audit with Playwright (leave empty to skip E2E) | — |
| `target_scope` | Directory scope to audit | `src/` |
| `primary_flows` | Comma-separated user flows to analyze | — |

## 10. Workflow Capabilities Summary

### PR Review (`a11y-pr-review.md`)

| Capability | Details |
|---|---|
| **Trigger** | `run-a11y-review` label on PR |
| **Reads** | Repository contents, PR diff, issues, pull requests |
| **Writes (safe outputs)** | Add comment (max 2), create issue (max 15, prefix `[A11Y]`), update issue (max 15), add labels (max 3) |
| **Labels created** | `accessibility`, `neurodiversity-check`, `a11y-reviewed` |
| **Tools** | GitHub MCP (remote), Playwright, bash, web-fetch |

### Scheduled Audit (`a11y-scheduled-audit.md`)

| Capability | Details |
|---|---|
| **Trigger** | Weekly cron (Monday) or manual dispatch |
| **Reads** | Repository contents, issues |
| **Writes (safe outputs)** | Add comment (max 2), create issue (max 20, prefix `[A11Y Audit]`), update issue (max 20) |
| **Labels created** | `neurodiversity-check`, `accessibility`, `audit-report` |
| **Tools** | GitHub MCP (remote), Playwright, bash, web-fetch |

Both workflows automatically close older issues from previous runs (`close-older-issues: true`).

## 11. Troubleshooting

### `422 — The permissions requested are not granted to this installation`

The GitHub App installation is missing required permissions. See [step 4](#4-install-the-github-app-on-your-orgrepo) — you need to accept updated permissions on the org installation page.

### `Resource not accessible by personal access token`

The `COPILOT_GITHUB_TOKEN` PAT is missing the **Copilot Requests: Read** permission, or the resource owner is set to the organization instead of your personal account.

### `Copilot license or inference access errors`

The PAT owner's account does not have an active Copilot subscription. Verify locally:

```bash
gh copilot --version
```

### Workflow compiles but never runs

- Ensure the `.lock.yml` files are committed and pushed to the **default branch** (main)
- For scheduled workflows, GitHub Actions only runs cron triggers from the default branch
- Check the **Actions** tab for any disabled workflow warnings

### Label trigger does not start the workflow

- Verify the label name matches exactly: `run-a11y-review`
- The workflow must be on the default branch
- Check if the PR was opened by a bot (bots are skipped by default)

---

## References

- [GitHub Agentic Workflows — Overview](https://github.github.com/gh-aw/introduction/overview/)
- [gh-aw Authentication Reference](https://github.github.com/gh-aw/reference/auth/)
- [gh-aw Safe Outputs Reference](https://github.github.com/gh-aw/reference/safe-outputs/)
- [gh-aw GitHub Tools Reference](https://github.github.com/gh-aw/reference/github-tools/)
- [Creating a GitHub App](https://docs.github.com/en/apps/creating-github-apps)
- [Fine-Grained Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/fr)
