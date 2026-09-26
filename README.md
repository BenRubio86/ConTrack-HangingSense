# ConTrack @ HangingSense — V3.0

Static, mobile-first, offline-first contraction timer and labor preparation companion.

## Repository structure

```text
contrack-hangingsense-v3/
├── index.html
├── styles.css
├── app.js
├── manifest.webmanifest
├── service-worker.js
├── DESIGN_SYSTEM.md
├── README.md
└── assets/
    ├── logo-app.png
    ├── logo-lockup.png
    ├── icon-192.png
    ├── icon-512.png
    └── favicon.png
```

## Run locally

Because the service worker requires HTTP(S), use any simple local server.

### Python
```bash
python3 -m http.server 8080
```

Then open:
```text
http://localhost:8080
```

## Functional scope
- Start / end contraction timer
- Local browser persistence
- History review
- Optional 0–10 pain intensity after each contraction
- Pain rating can be added or edited later
- Optional notes
- Summary KPIs and chart
- CSV export
- JSON backup export
- 5 visual themes
- 11 language options
- RTL support for Arabic and Farsi
- Offline PWA shell

## Important product boundary
ConTrack records factual timing and self-reported intensity. It does not diagnose labor, predict labor stage, or replace professional maternity advice.

## Branding
The default theme is **HangingSense / Calm** using the approved warm cream / earth / clay identity.

See `DESIGN_SYSTEM.md` for design tokens and visual rules.
