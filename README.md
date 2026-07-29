# Spencer Action Items

> Personal action item tracker with stoplight due date indicators, notes, and PWA support for Android home screen installation.

**Live app:** `https://spencer-thompson-2-vu.github.io/Spencer-Action-Items`  
**Current version:** v1.0

---

## Features

### Task Management
- Add items with title, due date, and notes
- Click any row to open the full edit drawer
- Checkbox to mark complete inline (or use the drawer)
- Reopen completed items from the drawer

### Due Date Stoplight
- 🔴 Red — overdue
- 🟡 Yellow — due today
- 🟢 Green — due in the future
- Gray — no date set

### Quick Date Buttons
Available both on the add bar and inside the edit drawer:
- Today, Tomorrow, +1 Week, +2 Weeks, +1 Month
- +1 Business Day and +1 Business Week (bumps from current due date, not today)
- Clear

### Notes
Each item has a freetext notes field for context, links, or multi-step details. A preview of the note appears on the task row for active items.

### Data
- All state persists in `localStorage` automatically
- **⬇ Export** — downloads a timestamped JSON backup
- **⬆ Import** — restore from any previous export (with validation)
- **Auto-export** — silently downloads a backup on page load if no export in the last 4 days
- **↻ Update** — checks `version.json` on GitHub and prompts to reload if a newer version exists

---

## PWA — Install on Android

1. Open the live app URL in Chrome on Android
2. Tap the browser menu (⋮) → **Add to Home Screen**
3. Name it "Spencer Action Items" or "SKT Todo" → tap **Add**
4. The SKT stoplight icon appears on your home screen
5. Opens as a standalone app (no browser chrome)

### Offline support
The service worker caches all app assets on first load. The app works fully offline. When a new version is deployed, the cache is automatically purged on next load so you always get the latest.

---

## File Structure

```
/
├── index.html      ← Entire application
├── manifest.json   ← PWA config (name, icon, display mode)
├── sw.js           ← Service worker (caching + auto cache-bust on update)
├── icon-192.png    ← Home screen icon (192×192)
├── icon-512.png    ← Home screen icon (512×512)
├── version.json    ← Current version string (read by Update check)
└── README.md       ← This file
```

---

## Updating (pushing a new release)

1. Make changes to `index.html`
2. Bump `APP_VERSION` in `index.html` — e.g. `'1.0'` → `'1.1'`
3. Bump `CACHE_VERSION` in `sw.js` to match — this forces the old cache to clear
4. Update `version.json` to match: `{ "version": "1.1" }`
5. Commit all changed files with a descriptive message — e.g. `v1.1 — add recurring task support`
6. GitHub Pages redeploys in ~60 seconds
7. On next app open, the service worker detects the new cache version, purges the old one, and loads fresh assets

---

## Version History

| Version | Changes |
|---------|---------|
| v1.0 | Initial release — task list, stoplight due dates, notes, drawer editing, quick date buttons, PWA support, export/import/auto-backup |
