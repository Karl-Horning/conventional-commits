# Conventional commits

Conventional commits is a specification for writing consistent, readable commit messages. Following it helps you and your team understand project history at a glance, communicate the impact of changes clearly, and automate changelogs and release notes.

Based on [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/).

## The basic format

`type(scope): description`

- **Type**: What kind of change is this? (for example, `feat`, `fix`).
- **Scope**: (Optional) What part of the project? (for example, `api`, `ui`).
- **Description**: A short command like "add button" instead of "added button".

## Commit types

Use these types to categorise your commits:

| Type | Meaning | When to use it |
| :--- | :--- | :--- |
| `feat` | Feature | Adding new functionality to the code. |
| `fix` | Bug fix | Fixing a mistake or a crash. |
| `docs` | Documentation | README, comments, or help files. |
| `style` | Formatting | Code formatting only — linters, Prettier, whitespace. For UI changes, use `fix(ui)` or `refactor(ui)` instead. |
| `refactor` | Cleanup | Improving code without changing what it does. |
| `perf` | Performance | Making the code run faster or use less memory. |
| `test` | Testing | Adding or fixing automated tests. |
| `build` | System | Changes to npm, dependencies, or scripts. |
| `ci` | Automation | Changes to GitHub Actions or CI config. |
| `chore` | Maintenance | General tasks that don't change source code. |
| `revert` | Revert | Undoing a previous commit. |

The specification defines `feat` and `fix`. The other types come from [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional), which is based on the Angular convention.

## Key rules (Google & Angular style)

### 1. Use the imperative mood

Write your commit as if you are giving a command to the code.

- **Do:** `feat: add video upload`
- **Don't:** `feat: added video upload` or `feat: adds video upload`

### 2. Description format

Keep descriptions lowercase and don't end them with a period.

- **Do:** `fix: resolve alignment on mobile screens`
- **Don't:** `fix: Resolved alignment on mobile screens.`

### 3. Logical scopes

Avoid using filenames in parentheses. Use the name of the feature or module.

- **Do:** `feat(auth): add login`
- **Don't:** `feat(login.ts): add login`

### 4. Breaking changes

If your change will break things for other people, add `!` after the type or scope.

- **Do:** `feat!: change database schema`
- **Do:** `feat(auth)!: remove password login`

### 5. Body and footers

For more context, add a body (separated by a blank line) and optional footers.

```text
feat(editor): add autosave for scripts

Autosave triggers every 30 seconds when the editor is active.

BREAKING CHANGE: removes the manual save shortcut
Fixes #42
```

## How commits map to versions

Each commit tells you which part of the version number to increase. The [Conventional Commits FAQ](https://www.conventionalcommits.org/en/v1.0.0/#how-does-this-relate-to-semver) links each kind of commit to a [Semantic Versioning](https://semver.org/) release:

| Commit | Release | Example |
| :--- | :--- | :--- |
| `fix` | Patch | 1.0.0 to 1.0.1 |
| `feat` | Minor | 1.0.0 to 1.1.0 |
| Any type with `!` or a `BREAKING CHANGE` footer | Major | 1.0.0 to 2.0.0 |

Other types leave the version number unchanged unless they include a breaking change.

## Quick examples to copy

- `feat(editor): add autosave for scripts`
- `fix(ui): resolve alignment on mobile screens`
- `docs: update installation steps in readme`
- `build(deps): update types for typescript`
