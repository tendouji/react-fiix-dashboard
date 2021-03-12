self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('fiix-store').then((cache) => cache.addAll([
            process.env.PUBLIC_URL + '/images/logo-site.png',
            process.env.PUBLIC_URL + '/images/profiles/profile.jpg',
            process.env.PUBLIC_URL + '/images/profiles/profile2.jpg',
            process.env.PUBLIC_URL + '/images/profiles/profile3.jpg',
            process.env.PUBLIC_URL + '/images/profiles/profile4.jpg',
            process.env.PUBLIC_URL + '/images/profiles/profile5.jpg',
            process.env.PUBLIC_URL + '/images/profiles/profile6.jpg',
        ])),
    );
});
  
self.addEventListener('fetch', (e) => {
    console.log('fetching...', e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});