var CACHE = 'madvids-v1';
var FONT_CACHE = 'madvids-fonts-v1';

self.addEventListener('install', function() {
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(k) {
                    return k !== CACHE && k !== FONT_CACHE;
                }).map(function(k) { return caches.delete(k); })
            );
        }).then(function() { return self.clients.claim(); })
    );
});

self.addEventListener('fetch', function(e) {
    var url = new URL(e.request.url);

    /* Skip non-GET */
    if (e.request.method !== 'GET') return;

    /* ── Google Fonts: cache-first ── */
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        e.respondWith(
            caches.open(FONT_CACHE).then(function(cache) {
                return cache.match(e.request).then(function(cached) {
                    if (cached) return cached;
                    return fetch(e.request).then(function(res) {
                        if (res.ok) cache.put(e.request, res.clone());
                        return res;
                    });
                });
            })
        );
        return;
    }

    /* ── Same-origin assets: stale-while-revalidate ── */
    if (url.origin === self.location.origin) {
        e.respondWith(
            caches.open(CACHE).then(function(cache) {
                return cache.match(e.request).then(function(cached) {
                    var fetchPromise = fetch(e.request).then(function(res) {
                        if (res.ok) cache.put(e.request, res.clone());
                        return res;
                    }).catch(function() { return cached; });
                    return cached || fetchPromise;
                });
            })
        );
        return;
    }
});
