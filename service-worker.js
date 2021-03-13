const basePath = '/react-fiix-dashboard';
// const basePath = '';

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('fiix-store').then((cache) => cache.addAll([
            basePath + '/',
            basePath + '/images/logo-site.png',
            basePath + '/images/profiles/profile.jpg',
            basePath + '/images/profiles/profile2.jpg',
            basePath + '/images/profiles/profile3.jpg',
            basePath + '/images/profiles/profile4.jpg',
            basePath + '/images/profiles/profile5.jpg',
            basePath + '/images/profiles/profile6.jpg',
        ])),
    );
});
  
self.addEventListener('fetch', (e) => {
    console.log('fetching...', e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});
