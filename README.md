# ConTrack V4.6 — by Hanging Sense

ConTrack is a calm, mobile-first and offline-first contraction timer and labour-preparation companion designed for iPhone and other phone-sized screens.

**Live app:** https://benyimaai.github.io/ConTrack-HangingSense/

## Core capabilities

- One-tap contraction start / stop tracking
- Duration, start-to-start interval and rest-time logic
- Pain-intensity control for every contraction
- Event logging for pee, pain / discomfort, waters / fluid, bleeding and other events
- Optional local photo attachments for events
- Combined contraction chart with duration, interval, pain intensity and event markers
- Rolling last-5 averages for contraction duration and interval
- Editable history with contractions and events in one timeline
- Summary and trend charts with 1 h, 3 h, Day and All ranges
- Local HTML and PNG reports with current theme, branding and creator attribution
- Session backup / restore including locally stored photos
- CSV export
- Built-in user manual with print / PDF support
- Six visual themes
- 11 UI languages: English, German, French, Spanish, Farsi, Chinese, Hindi, Arabic, Russian, Korean and Japanese

## Privacy and offline behaviour

ConTrack does not require an account or cloud sync. Session data is stored locally in the browser. Event photos are compressed locally and stored in IndexedDB. Users can edit, export, back up and delete their own session data.

The service worker keeps the app usable offline after the initial load.

## Important limitation

ConTrack records factual timing, intensity and event information. It does **not** diagnose labour, determine labour stage, predict labour progression or replace professional medical advice. Urgent symptoms should be discussed with the maternity team or emergency services as appropriate.

## Current release

**V4.6 — final project release**

V4.6 completes the UX and localization pass with:

- full multilingual UI and report output
- corrected last-5 KPI logic
- dual-axis AVG duration / AVG interval trend chart
- editable contraction and event history
- photo viewing and sharing
- themed HTML and PNG reports
- improved user manual and one-tap return to the app
- repository cleanup and production deployment from `main`

See [CHANGELOG.md](CHANGELOG.md) for the release summary.

## Production files

- `index.html` — application shell
- `styles.css`, `v45.css` — base and current UX styling
- `app-v4.5.js` — stable core application logic
- `app-v4.6-overrides.js` — final V4.6 UX / localization layer
- `i18n-v46.json` — multilingual UI and report strings
- `report-v46.js` — localized HTML report generation
- `png-v46.js` — localized PNG report generation
- `user-manual-v2.html`, `manual-v46.js` — current multilingual manual
- `manifest.webmanifest` — installable web-app metadata
- `service-worker.js` — offline cache and navigation handling
- brand, creator and contact assets

## Deployment

GitHub Pages serves the `main` branch repository root. A push to `main` publishes the updated production package automatically through GitHub Pages.

For iPhone use, open the live app in Safari and choose **Share → Add to Home Screen**.

## Branding

**Product:** ConTrack by Hanging Sense  
**Creator:** BenYimaAI  
**Doula contact:** HangingSense
