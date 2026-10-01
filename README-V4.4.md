# ConTrack by Hanging Sense — V4.4 Rebuild

V4.4 replaces the mixed V4.3/V3.1 runtime with one consistent implementation on the `v4-ux-preview` branch.

## Corrected in V4.4
- Working Start/Stop timer with a pain-intensity slider after Stop.
- Recent rhythm shows only recorded contractions, with duration and pain labels.
- Add Event: pee, pain/discomfort, waters/fluid, bleeding, other, optional note and local photo.
- Photos are compressed locally and stored in IndexedDB.
- History uses compact two-row records: timestamp/KPIs first, details/event information second.
- Today / All history filters are wired to the V4.4 state.
- Summary metrics and unified chart support 1 h / 3 h / Day / All.
- Unified chart: duration bars + start-to-start interval line + pain points + event markers.
- Share Full Report generates a self-contained HTML report with embedded photos.
- Download / save opens a format chooser for PNG picture or HTML report.
- Language selector is populated for 11 languages; core navigation/timer labels are localized.
- Six visible design themes: Copper Glow, Terracotta Bloom, Sage & Copper, Plum Ember, Midnight Copper, Ivory Minimal.
- New Session protects history by offering backup or archive first.
- Backup includes event photos.
- Migrates V4.3, V4.2 and V3.1-compatible data without deleting older local storage.
- Service-worker cache and manifest updated to V4.4.

## Test policy
Keep this on `v4-ux-preview` until iPhone smoke testing passes. Do not merge to `main` yet.
