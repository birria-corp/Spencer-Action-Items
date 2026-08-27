# Claude Session Context — Spencer Action Items
> Paste as first message in a new chat (or store as Project Document) to resume immediately.

---

## Who I Am
- **Name:** Grandmaster (Spencer Thompson)
- **Role:** Data Product Owner
- **GitHub org:** `birria-corp`
- **Goal:** Build and maintain lightweight single-file HTML apps hosted on GitHub Pages
- **Claude goes by:** Fez

---

## Product

### Spencer Action Items
- **Repo:** `https://github.com/birria-corp/Spencer-Action-Items`
- **Live URL:** `https://birria-corp.github.io/Spencer-Action-Items`
- **Current version:** v1.7
- **Files:** `index.html`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png`, `icon-32.png`, `version.json`, `README.md`, `CONTEXT.md`
- **Stack:** Single-file HTML, React 18 via Babel standalone, localStorage, PWA

**Key features:**
- Active tasks sorted: overdue first → today → future → no date
- Stoplight due date badges: red (overdue), yellow (today), green (future), gray (none)
- Completed rows show completion date in plain light gray
- Inline +1/+7 yellow bump buttons on active task rows (business days)
- Task drawer: text, due date + quick date buttons, notes field, Mark Complete / Reopen
- Cloud sync: Google signInWithPopup; Firestore sync for skt_todo_v1; conflict prompt on login
- Topbar: ☁ Sign in (signed out) / email + ☁ Sync + Sign out (signed in) | ⚙ Settings
- Settings modal: font scaling (A-/A+), version/update check, Export, Import
- Auto-export JSON if no export in last 4 days
- PWA: manifest.json + sw.js; SKT icon; GET-only SW filter

---

## Key Technical Decisions

### localStorage Keys
- `skt_todo_v1` — main data (synced to Firestore)
- `skt_last_export` — last export date (local only)
- `skt_fontsize` — font preference (local only)

### Firebase Auth
- Project: `zeptrack-f8720` (display: birria-corp-apps)
- Firebase Hosting deployed — required for auth handler (`/__/firebase/init.json`)
- Auth: `signInWithPopup` — desktop Chrome only
- Module: `type="module"` ESM with explicit `window.*` assignments
- No `setPersistence`, no redirect fallback
- Firestore path: `users/{uid}/data/skt_todo_v1`
- `window._signIn`, `window._signOut`, `window._syncNow` exposed
- `window._authUser` + `authChanged` CustomEvent bridges module → React
- `window._showToast` + `window._reloadAppState` exposed in useEffect

### Version Bumping (3 files)
- `APP_VERSION` in `index.html`
- `CACHE_VERSION` in `sw.js`
- `version.json`

### SW
- Cache name: `sai-v{CACHE_VERSION}`
- Network-first: `index.html`, `version.json`
- Cache-first: all assets
- GET-only filter required — Firestore makes POST requests

### Known Pitfalls
- Unicode minus or HTML entities in JSX button text silently break Babel — use plain ASCII `A-`
- Firebase Auth requires Hosting deployed on project for `/__/firebase/init.json`
- Always use `signInWithPopup` on desktop, never `signInWithRedirect` (COOP + IndexedDB issue)
- All window-exposed functions must be explicitly assigned inside `type="module"` script

---

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
