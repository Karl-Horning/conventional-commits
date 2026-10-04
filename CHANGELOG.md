# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

Add new entries here as they're merged, then rename this section when the release is ready.

## [1.1.0] - 2026-10-04

### Added

- "How commits map to versions" section, linking each kind of commit to a Semantic Versioning release
- Note on where the commit types beyond `feat` and `fix` come from

### Changed

- UK English spelling throughout, with the page language set to `en-GB`

### Fixed

- The dependency example using `chore(deps)` when the commit types table lists dependencies under `build`

## [1.0.3] - 2026-10-04

### Fixed

- Inter showing briefly on page load before switching to the saved font
- A fallback font showing briefly while OpenDyslexic loads
- An invalid saved font leaving no font button selected

## [1.0.2] - 2026-10-04

### Changed

- Active font button and skip link use a light blue fill with dark text in both light and dark mode
- Header colours set through colour tokens

### Fixed

- Light mode contrast below WCAG AAA for the do and don't labels, links, the active font button, the skip link, and the "Font:" label
- Font button borders below the 3:1 contrast needed against the header
- Scrollbars staying light in dark mode
- Sticky header covering the top of the main content after using the skip link

## [1.0.1] - 2026-10-03

### Added

- This changelog

### Fixed

- Copy buttons staying on "Copied!" after a quick second click
- Copy buttons giving no feedback when copying fails
- Screen readers not announcing when an example is copied
- Screen readers reading each "Don't" example as an instruction to avoid the rule it shows
- Screen readers treating each do and don't example as a separate page region
- Screen readers not saying "exclamation mark" for the `!` in the breaking changes rule
- Font buttons repeating the "Font:" label after each button name

## [1.0.0] - 2026-04-15

First tagged release. Earlier work wasn't tagged, so this release gathers everything built so far.

### Added

- Single-page guide covering the basic format, a table of commit types, key rules with do and don't examples, and example messages with copy buttons
- Font switcher for Inter, the system font, and OpenDyslexic, which remembers your choice
- Dark mode that follows the system setting
- Skip link, visible focus outlines, reduced-motion support, and a print layout
- Markdown version of the guide (`GUIDE.md`), downloadable from the footer
- Open Graph, Twitter card, and structured data metadata, plus Google site verification
- GitHub Actions workflow deploying to GitHub Pages on every push to `main`

[Unreleased]: https://github.com/Karl-Horning/conventional-commits/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/Karl-Horning/conventional-commits/releases/tag/v1.1.0
[1.0.3]: https://github.com/Karl-Horning/conventional-commits/releases/tag/v1.0.3
[1.0.2]: https://github.com/Karl-Horning/conventional-commits/releases/tag/v1.0.2
[1.0.1]: https://github.com/Karl-Horning/conventional-commits/releases/tag/v1.0.1
[1.0.0]: https://github.com/Karl-Horning/conventional-commits/releases/tag/v1.0.0
