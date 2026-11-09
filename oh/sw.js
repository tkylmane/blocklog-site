// Offline cache for Office Hours.
// Bump VERSION on EVERY change to any file in oh/, or phones keep running the old copy.
// Notes: ~/Developer/OfficeHours/README.md on the Mac mini.
const VERSION = "oh-2";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "xlsx.full.min.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // pages: network first so updates arrive, cache when offline; other files: cache first
  if (req.mode === "navigate")
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put("./", copy)); return r; }).catch(() => caches.match("./")));
  else e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
