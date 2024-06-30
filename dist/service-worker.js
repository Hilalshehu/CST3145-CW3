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
            return Promise.all(
                CacheFiles.map((file)=>{
                    return cache.add(file).catch((err)=>{
                        console.error(`failed to cache ${file}: ${err}`);
                    });
                })
            )
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r || fetch(e.request).then(function (response){
                return caches.open(CacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            }).catch(function (){
                return caches.match('offline.html');
            })
        })
    )
});