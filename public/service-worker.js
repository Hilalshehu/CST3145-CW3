var CacheName = 'Webstore';
var CacheFiles = [
    'index.html',
    'style.css',
    'webstore.webmanifest',
    'bootstrap.css',
    'bootstrap.min.css'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Installing...');
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
            if (r) {
                return r; // Return the cached response if available
            } else {
                // Fetch the request from the network
                return fetch(e.request).then(function (response) {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response; // Do not cache responses that are not successful or not basic
                    }
                    var responseToCache = response.clone();
                    caches.open(CacheName).then(function (cache) {
                        cache.put(e.request, responseToCache).then(function () {
                            console.log('[Service Worker] Cached response:', e.request.url);
                        }).catch(function (error) {
                            console.error('[Service Worker] Cache put error:', error);
                        });
                    });
                    return response; // Return the fetched response to the fetch event
                }).catch(function (error) {
                    console.error('[Service Worker] Fetch failed:', error);
                    throw error;
                });
            }
        }).catch(function (error) {
            console.error('[Service Worker] Cache match failed:', error);
            throw error;
        })
    );
});



