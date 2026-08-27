# Spencer Action Items

Personal task manager with cloud sync via Firebase Auth + Firestore.

**Live:** https://birria-corp.github.io/Spencer-Action-Items

## Features

- Active tasks sorted: overdue first → today → future → no date
- Stoplight due date badges: red (overdue), yellow (today), green (future), gray (none)
- Completed rows show completion date in plain light gray
- Inline +1/+7 yellow bump buttons on active task rows (business days)
- Task drawer: text, due date + quick date buttons, notes field, Mark Complete / Reopen
- Cloud sync: Google sign-in via Firebase Auth; Firestore sync for skt_todo_v1
- Topbar: ☁ Sign in / email + ☁ Sync + Sign out; ⚙ Settings
- Settings modal: font scaling (A-/A+), version check, export, import
- Auto-export JSON if no export in last 4 days
- PWA: manifest.json + sw.js; SKT icon; GET-only SW filter

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | Full app — React 18 via Babel standalone, all CSS + JS inline |
| `sw.js` | Service worker — cache busting, GET-only filter |
| `manifest.json` | PWA manifest |
| `version.json` | Remote version string for update check |
| `icon-192.png` | PWA icon |
| `icon-512.png` | PWA icon (large) |
| `icon-32.png` | Favicon |
| `README.md` | This file |
| `CONTEXT.md` | Session context for resuming work in Claude |

## Update Workflow

1. Edit files via GitHub web editor
2. Bump version in 3 locations: APP_VERSION in index.html, CACHE_VERSION in sw.js, version.json
3. Unregister SW + hard refresh after deploy

## Firebase Setup

- Project: zeptrack-f8720 (display: birria-corp-apps)
- Auth: Google signInWithPopup — desktop Chrome only
- Firestore path: users/{uid}/data/skt_todo_v1
- skt_last_export and skt_fontsize stay local only

## Version History

| Version | Changes |
|---------|---------|
| v1.7 | Fix font size buttons (HTML entity minus broke Babel compilation) |
| v1.6 | Firebase Auth + Firestore cloud sync; settings modal; auth in topbar |
| v1.5 | New app icon, favicon |
| v1.4 | Font scaling fix |
| v1.3 | Version bump pipeline verify |
| v1.2 | A-/A+ scaling, +1/+7 bump buttons, completed date |
| v1.0 | Initial release |
