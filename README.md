# Gym Assistant PWA

A mobile-first gym tracker and dynamic training assistant built for iPhone.

## Features
- Dynamic weekly schedule
- Readiness adjustment (green / yellow / red day)
- Sport / travel / heavy-workload overrides
- Workout logging: sets, reps, weight, RIR, notes
- Daily body-weight tracking
- 4-week body measurements
- Strength markers
- Shoulder / knee / ankle-aware exercise notes
- Export / import backup
- Offline-capable PWA
- Installable to iPhone Home Screen

## Run locally
Any static server works.

Example:
```bash
python3 -m http.server 8080
```
Then open:
http://localhost:8080

## Put it on your iPhone
1. Upload this folder to a static host such as GitHub Pages, Netlify, Vercel, or Cloudflare Pages.
2. Open the hosted URL in Safari on your iPhone.
3. Tap Share.
4. Tap "Add to Home Screen".
5. Launch it from the Home Screen like an app.

All workout data is stored locally in the browser on that device. Use Export Backup periodically.

## Important
This app is a training tracker, not a medical diagnostic tool. Pain-based adjustments are conservative rules only.
