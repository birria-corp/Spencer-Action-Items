# Claude Session Context — Spencer Action Items
> Paste as first message in a new chat (or store as Project Document) to resume immediately.

---

## Who I Am
- **Name:** Grandmaster (Spencer Thompson)
- **Role:** Data Product Owner
- **GitHub account:** `birria-corp`
- **Goal:** Build and maintain lightweight single-file HTML apps hosted on GitHub Pages
- **Claude goes by:** Fez

---

## Product

### Spencer Action Items
- **Repo:** `https://github.com/birria-corp/Spencer-Action-Items`
- **Live URL:** `https://birria-corp.github.io/Spencer-Action-Items`
- **Current version:** v1.6
- **Files:** `index.html`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png`, `icon-32.png`, `version.json`, `README.md`, `CONTEXT.md`
- **Stack:** Single-file HTML, React 18 via Babel standalone, localStorage, PWA

**Key features:**
- Active tasks sorted: overdue first → today → future → no date
- Stoplight due date badges: red (overdue), yellow (today), green (future), gray (none)
- Completed rows show completion date in plain light gray
- Inline +1/+7 yellow bump buttons on active task rows (business days)
- Task drawer: text, due date + quick date buttons, notes field, Mark Complete / Reopen
- Cloud sync: Google sign-in via Firebase Auth (signInWithPopup); Firestore sync for `skt_todo_v1`; conflict prompt on login
- Topbar: ☁ Sign in (signed out) / email + ☁ Sync + Sign out (signed in); ⚙ Settings
- Settings modal: font scaling (A−/A+), version check, Export, Import
- Auto-export JSON if no export in last 4 days
- PWA: manifest.json + sw.js; SKT icon
- SW: network-first for index.html/version.json, cache-first for assets, GET-only filter

---

## Key Technical Decisions

### localStorage Keys
- `skt_todo_v1` — main data (synced to Firestore)
- `skt_last_export` — last export date (local only)
- `skt_fontsize` — font preference (local only)

### Firebase Auth (Desktop Chrome only)
- Project: `zeptrack-f8720` (Hosting deployed — required for auth handler)
- Auth method: `signInWithPopup` — desktop Chrome, no COOP issues
- Module: `type="module"` ESM imports with explicit `window.*` assignments
- No `setPersistence` — LOCAL (IndexedDB) works fine on desktop Chrome
- No redirect fallback — popup only
- Firestore path: `users/{uid}/data/skt_todo_v1`
- `window._signIn`, `window._signOut`, `window._syncNow` exposed to window
- `window._authUser` + `authChanged` CustomEvent used to bridge module → React state
- `window._showToast` + `window._reloadAppState` exposed in React useEffect

### Version Bumping (3 files every release)
- `APP_VERSION` in `index.html`
- `CACHE_VERSION` in `sw.js`
- `version.json`

### SW Behavior
- Cache name: `sai-v{CACHE_VERSION}`
- Network-first: `index.html`, `version.json`
- Cache-first: all other assets
- GET-only: `if (e.request.method !== 'GET') return;` — Firestore makes POST requests
- Auto-purge old cache on activation

### GitHub Deploy
- Upload via GitHub web editor (no Git CLI needed)
- Unregister SW in browser after deploy to force fresh install

---

## Firebase Auth Lessons (Hard-Won)

- `zeptrack-f8720` must be used — it has Firebase Hosting deployed which serves `/__/firebase/init.json` required by the auth handler. New projects without Hosting deployment will silently fail.
- `birria-corp.github.io` must be in Firebase Console → Authentication → Settings → Authorized domains
- `signInWithPopup` works on desktop Chrome. GitHub Pages COOP headers only affect popup on Android/PWA — not desktop Chrome tabs.
- `type="module"` is fine as long as all functions used by HTML `onclick` are explicitly assigned to `window` inside the module.
- Never use `signInWithRedirect` on GitHub Pages — COOP + IndexedDB combination breaks auth persistence.

---

## Version History

| Version | Changes |
|---------|---------|
| v1.6 | Firebase Auth + Firestore cloud sync; settings modal; auth in topbar |
| v1.5 | New app icon, favicon |
| v1.4 | Font scaling fix — use % on documentElement |
| v1.3 | Version bump to verify deployment pipeline |
| v1.2 | A−/A+ font scaling, inline +1/+7 bump buttons, completed date in gray |
| v1.0 | Initial release |
