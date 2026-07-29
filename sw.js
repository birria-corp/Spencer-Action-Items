// sw.js — Spencer Action Items service worker
// Cache name includes version. On every install, old caches are purged automatically.
// To force an update: bump CACHE_VERSION (must match APP_VERSION in index.html).

const CACHE_VERSION = '1.2';
const CACHE_NAME    = `skt-todo-v${CACHE_VERSION}`;

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// ── INSTALL: cache core assets ──────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())  // activate immediately, don't wait for old SW to die
  );
});

// ── ACTIVATE: purge all old caches ──────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)   // delete anything not current version
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())  // take control of all open tabs immediately
  );
});

// ── FETCH: network-first for HTML/version.json, cache-first for assets ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always hit network for version check and main document so updates land immediately
  const networkFirst = url.pathname.endsWith('version.json') ||
                       url.pathname.endsWith('/') ||
                       url.pathname.endsWith('index.html');

  if (networkFirst) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Update cache with fresh copy
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))  // fallback to cache if offline
    );
  } else {
    // Cache-first for icons, manifest, etc.
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
  }
});
