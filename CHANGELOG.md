# Changelog

## V4.6 chart export repair — 2026-10-02

- Move chart date-range titles right into their own header row, clear of axis headings.
- Add colour-matched duration, interval, intensity and rolling-average data labels.
- Export self-contained SVG styling so HTML and PNG reports preserve the selected theme, grid and trend lines.
- Include colour-keyed legends for both exported charts.
- Load PNG export on the first visit and keep all timeline rows below the charts.
- Dismiss the export backdrop after saving and refresh the offline cache.

## V4.6 — Final project release

ConTrack V4.6 closes the current development cycle and consolidates the production build on `main`.

### UX and tracking
- One-tap contraction start / stop flow.
- Pain-intensity control after each recorded contraction.
- Event logging for pee, pain / discomfort, waters / fluid, bleeding and other events.
- Optional event photos stored locally in IndexedDB.
- Edit support from Track and History.
- Combined history timeline for contractions and events.

### KPI and charts
- Duration and start-to-start interval calculations corrected for selected ranges.
- Rolling averages use the latest available values up to five; new sessions use the available values until five exist.
- Unified pattern chart shows contraction duration, interval, pain intensity and event markers.
- Summary trend chart uses separate vertical scales for average duration and average interval.
- Time-axis ranges support 1 h, 3 h, Day and All.

### Reports and exports
- Theme-aware HTML reports.
- Theme-aware PNG report export.
- Localized report labels and chart labels.
- Timeline output includes timestamps, duration, interval, rolling averages, pain intensity, notes and event photos.
- Creator and ConTrack branding included in report output.
- CSV export and session backup / restore retained.

### Localization
- UI and output localization for English, German, French, Spanish, Farsi, Chinese, Hindi, Arabic, Russian, Korean and Japanese.
- Localized manual and one-tap return from the manual to the More screen.

### Documentation and repository
- README updated from the obsolete V3.1 description to the V4.6 production release.
- Legacy V4.4-and-earlier implementation files and preview documentation removed from the production branch.
- Service-worker cache refreshed for final deployment.

## V4.5 — Foundation release

V4.5 introduced editable records, rolling last-five KPIs, local event photos, the unified pattern chart, report generation, six themes and the printable user manual. V4.6 completes the localization, chart and deployment refinements on top of that stable core.
