# NeurodiversityCopilot Repository Instructions

NeurodiversityCopilot is a documentation and GitHub Action repository focused on neurodiversity-friendly development practices. This repository contains guidelines, prompts, and automation tools to help create more accessible and inclusive development environments.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Repository Setup
- No build process required - this is a documentation and GitHub Action repository
- Clone and start working immediately:
  ```bash
  cd /path/to/NeurodiversityCopilot
  ls -la  # View repository structure
  ```
- Repository contains only text files (Markdown, YAML) - no compilation needed

### Core Repository Structure
```
.
├── .github/
│   ├── workflows/
│   │   └── pr-to-issue.yml        # GitHub Action for PR automation
│   └── prompts/
│       └── code-a11y-review.prompt.md  # Accessibility review template
├── README.md                      # Main documentation (French)
└── test/
    └── my-super-test.md          # Sample test content
```

### Validation Commands
- Validate YAML syntax: `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/pr-to-issue.yml').read()); print('YAML syntax is valid')"`
- Check YAML style (optional): `yamllint .github/workflows/pr-to-issue.yml`
- Verify file access: `ls -la && head -5 README.md`
- Test directory listing: `find . -name "*.md" -o -name "*.yml"`

## Key Components

### GitHub Action Workflow (pr-to-issue.yml)
- **Purpose**: Automatically creates issues for new pull requests and assigns them to Copilot coding agent
- **Trigger**: Runs on `pull_request` events with type `opened`
- **Runtime**: Typically completes in under 30 seconds
- **Dependencies**: Uses `actions/github-script@v8`
- **Functionality**: Creates review issues, attempts multiple methods to assign to Copilot agent

### Documentation Files
- **README.md**: French-language neurodiversity guidelines (31 lines)
- **code-a11y-review.prompt.md**: Comprehensive accessibility audit template for TSA/TDAH (69 lines)
- **my-super-test.md**: Lorem ipsum test content for validation

## Validation Scenarios

### Document Integrity Testing
Always verify that changes preserve document structure and readability:
```bash
# Test French documentation
head -10 README.md
grep -c "🧠\|📐\|📄\|🔕\|🧭\|⏳" README.md  # Should return 6 emoji headers

# Test accessibility prompt
wc -l .github/prompts/code-a11y-review.prompt.md  # Should be 69 lines
grep -c "TSA\|TDAH\|WCAG" .github/prompts/code-a11y-review.prompt.md  # Should find neurodiversity references
```

### GitHub Action Validation
```bash
# Validate YAML syntax
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/pr-to-issue.yml').read()); print('GitHub Action YAML is valid')"

# Check for required permissions
grep -A 5 "permissions:" .github/workflows/pr-to-issue.yml

# Verify Copilot assignment logic
grep -n "copilot\|github-copilot" .github/workflows/pr-to-issue.yml
```

## No Build Process Required
This repository does not require:
- ❌ Node.js/npm installation or build commands
- ❌ Python package installation or virtual environments  
- ❌ Docker containers or deployment procedures
- ❌ Compilation steps or binary generation
- ❌ Database setup or data migration
- ❌ Web server startup or application runtime

## Common Tasks

### Repository Navigation
```bash
# View all documentation
find . -name "*.md" -exec echo "=== {} ===" \; -exec head -5 {} \;

# Check GitHub workflows
ls -la .github/workflows/

# Review prompts and templates
cat .github/prompts/code-a11y-review.prompt.md
```

### Output from Frequently Run Commands

#### Repository Root Listing
```
ls -la
total 24
drwxr-xr-x 5 runner runner 4096 .
drwxr-xr-x 3 runner runner 4096 ..
drwxrwxr-x 7 runner runner 4096 .git
drwxrwxr-x 4 runner runner 4096 .github
-rw-rw-r-- 1 runner runner 1570 README.md
drwxrwxr-x 2 runner runner 4096 test
```

#### Documentation Structure
```
find . -name "*.md"
./README.md
./.github/prompts/code-a11y-review.prompt.md
./test/my-super-test.md
```

#### GitHub Actions Structure
```
find .github -type f
.github/workflows/pr-to-issue.yml
.github/prompts/code-a11y-review.prompt.md
```

## Making Changes

### Documentation Updates
- Edit Markdown files directly with any text editor
- Preserve emoji structure and formatting in README.md
- Maintain French language consistency in main documentation
- Test readability with `head -10 filename.md`

### GitHub Action Modifications
- Always validate YAML syntax after changes
- Test permissions and GitHub API calls carefully
- Consider rate limiting and error handling
- Review Copilot assignment logic for effectiveness

### Adding New Content
- Follow existing naming conventions
- Place prompts in `.github/prompts/`
- Place workflows in `.github/workflows/`
- Add test content to `test/` directory

## No CI/CD Dependencies
- No automated testing beyond YAML validation
- No deployment pipelines or release processes
- No external service dependencies
- Changes take effect immediately upon merge

## Language and Accessibility Notes
- Primary documentation is in French
- Repository focuses on neurodiversity (TSA/TDAH) accessibility
- Accessibility prompt template follows WCAG 2.2 guidelines
- Emoji usage for visual structure and navigation aids

## Performance Expectations
- File operations: Instantaneous (all text files under 10KB)
- YAML validation: Under 1 second
- GitHub Action execution: 10-30 seconds when triggered
- Repository clone: Under 5 seconds (minimal content)

## Common Troubleshooting
- If YAML validation fails: Check indentation and syntax
- If GitHub Action doesn't run: Verify PR trigger conditions
- If files are missing: Check correct branch (copilot/fix-11 vs main)
- If permissions errors: Review GitHub Action permissions block

Always verify changes maintain the neurodiversity-friendly principles outlined in the repository's core documentation.