# ConTrack V3.0 — by Hanging Sense

A mobile-first, offline-first contraction timer prototype built as a vanilla HTML/CSS/JS PWA.

## Included

- Calm Track screen with one primary timer action
- Persistent timer state across refresh/backgrounding via timestamps
- Optional post-contraction intensity entry (1–10)
- Editable History
- Human-readable Summary with recent pattern visualization
- Share summary
- PNG chart export
- CSV export and JSON backup/restore
- 5 visual themes: Hanging Sense, Calm, Serenity, Minimal, Night
- 11 languages with RTL support for Arabic/Farsi
- Local-only storage by default
- Installable PWA + service worker
- Hanging Sense brand assets supplied by the project owner

## Run locally

Because service workers require an HTTP origin, use any static server, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Data model

Each contraction stores:

- `id`
- `start`
- `end`
- `durationSec`
- `intensity`
- `notes`

All records are stored in `localStorage` under `contrack_v3_state`.

## Safety scope

ConTrack records and summarizes user-entered timing information. It does not diagnose labour stage, predict birth timing, infer cervical dilation, or replace instructions from the maternity team.
