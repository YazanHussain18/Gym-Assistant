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


## V2 Smart Coach
- Trend-aware progression targets based on recent logged performance
- Automatic weight increases when the top of the rep range is achieved
- Conservative load reductions after performance drops / near-failure
- Green / Yellow / Red readiness logic
- High-intensity sport override for lower-body sessions
- Activity logging for football, padel, hiking, etc.
- Pain-aware set/load reductions for shoulder, knee, and ankle-sensitive exercises
- 7-day muscle set and frequency analytics
- Coach explanations shown for each exercise target
- Migrates V1 local data when possible


## V3 Profile Login
- First-run profile creation with your name
- Optional 4–6 digit local PIN
- Persistent remembered profile on the same iPhone/browser
- Logout support
- Saved profile name shown in Settings
- Existing V2 data is migrated when possible

### Important
This is a local-device profile, not a cloud account. It remembers you on the same iPhone/PWA installation. For cross-device login and secure cloud sync, the app would need a backend/auth provider such as Supabase, Firebase, or Sign in with Apple.


## V4 Pain & Soreness Mapping
- Readiness now asks WHERE soreness exists whenever soreness > 0
- Readiness now asks WHERE pain exists whenever pain > 0
- Supports left/right shoulder, arms, elbows, wrists, hips, legs, knees, calves, ankles, and back
- Optional pain note for movement-specific symptoms
- Coach maps pain/soreness locations to affected exercises
- Moderate pain reduces sets/load
- Higher pain can automatically skip affected exercises
- High soreness can reduce volume for the affected region
- Lower-body pain can alter leg-day loading more precisely
