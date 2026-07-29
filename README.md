# Spencer Action Items

> Personal action item tracker with stoplight due date indicators, notes, and PWA support for Android home screen installation.

**Live app:** `https://spencer-thompson-2-vu.github.io/Spencer-Action-Items`  
**Current version:** v1.2

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

### Completed Date
Completed items show their completion date in light gray — no color, no badge.

### Inline Date Bumping
Active task rows show **+1** and **+7** yellow buttons to the right of the due date — bumps 1 or 7 business days from the current due date without opening the drawer.

### Quick Date Buttons
Available both on the add bar and inside the edit drawer:
- Today, Tomorrow, +1 Week, +2 Weeks, +1 Month
- +1 Business Day and +1 Business Week (bumps from current due date)
- Clear

### Notes
Each item has a freetext notes field for context, links, or multi-step details. A preview appears on the task row for active items.

### Font Size
**A−** / **A+** buttons in the topbar adjust font size across 6 steps (85%–125%). Preference persists in localStorage.

### Data
- All state persists in `localStorage` automatically
- **⬇ Export** — downloads a timestamped JSON backup
- **⬆ Import** — restore from any previous export (with validation)
- **Auto-export** — silently downloads a backup on page load if no export in the last 4 days
- **↻** — checks `version.json` on GitHub and prompts to reload if a newer version exists

---

## PWA — Install on Android

1. Open the live app URL in Chrome on Android
2. Tap the browser menu (⋮) → **Add to Home Screen**
3. Name it and tap **Add**
4. The SKT stoplight icon appears on your home screen
5. Opens as a standalone app (no browser chrome), works offline

---

## File Structure

```
/
├── index.html      ← Entire application
├── manifest.json   ← PWA config (name, icon, display mode)
├── sw.js           ← Service worker (caching + auto cache-bust on update)
├── icon-192.png    ← Home screen icon (192×192)
├── icon-512.png    ← Home screen icon (512×512)
├── version.json    ← Current version string (read by update check)
└── README.md       ← This file
```

---

## Updating (pushing a new release)

Three files must change on every release:

1. Bump `APP_VERSION` in `index.html`
2. Bump `CACHE_VERSION` in `sw.js` to match
3. Update `version.json` to match: `{ "version": "X.X" }`

Then commit with a descriptive message. GitHub Pages redeploys in ~60 seconds. On next app open the service worker purges the old cache automatically.

---

## Version History

| Version | Changes |
|---------|---------|
| v1.2 | A−/A+ font size toggle · Inline +1/+7 bump buttons on task rows · Completed rows show completion date in gray |
| v1.1 | Segmented 10-cell progress bar (yellow→green) · No percentage labels · Hover for exact value |
| v1.0 | Initial release — task list, stoplight due dates, notes, drawer editing, quick date buttons, PWA support, export/import/auto-backup |
