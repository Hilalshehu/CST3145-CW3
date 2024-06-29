var CacheName = 'Webstore';
var CacheFiles = [
    'index.html',
    'style.css',
    'webstore.webmanifest',
    'bootstrap.css',
    'bootstrap.min.css'
];

self.addEventListener('install', (e) => {
    console.log('[Service-Worker]');
    e.waitUntil(
        caches.open(CacheName).then((cache) => {
            console.log('[Service Worker] Caching all the Files');
            return cache.addAll(CacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Return the cached response if available
            if (r) {
                return r;
            }

            // Fetch the resource from the network
            return fetch(e.request).then(function (response) {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Clone the response because it can only be consumed once
                var responseToCache = response.clone();

                // Open a cache and put the fetched response in it
                return caches.open(CacheName).then(function (cache) {
                    cache.put(e.request, responseToCache);
                    return response;
                });
            }).catch(function (error) {
                // Network request failed, return a fallback response
                console.error('Fetch failed; returning offline page instead.', error);
                return caches.match('offline.html');
            });
        })
    );
});

