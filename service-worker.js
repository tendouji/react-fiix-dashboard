self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('fiix-store').then((cache) => cache.addAll([
            '/images/logo-site.png',
            '/images/profiles/profile.jpg',
            '/images/profiles/profile2.jpg',
            '/images/profiles/profile3.jpg',
            '/images/profiles/profile4.jpg',
            '/images/profiles/profile5.jpg',
            '/images/profiles/profile6.jpg',
        ])),
    );
});
  
self.addEventListener('fetch', (e) => {
    console.log('fetching...', e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});