importScripts("https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.0/firebase-analytics.js");

importScripts("./js/helpers.js");
importScripts("./js/firebase-init.js");


self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('fiix-store').then((cache) => cache.addAll([
            curBasePath + '/',
            curBasePath + '/images/logo-site.png',
            curBasePath + '/images/profiles/profile.jpg',
            curBasePath + '/images/profiles/profile2.jpg',
            curBasePath + '/images/profiles/profile3.jpg',
            curBasePath + '/images/profiles/profile4.jpg',
            curBasePath + '/images/profiles/profile5.jpg',
            curBasePath + '/images/profiles/profile6.jpg',
        ])),
    );
});
  
self.addEventListener('fetch', (e) => {
    console.log('fetching...', e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});


// FIREBASE
firebase.initializeApp(firebaseInitObj);

const firebaseMessaging = firebase.messaging();

firebaseMessaging.setBackgroundMessageHandler(function(payload) {
    const notificationData = handleFirebaseMessagePayload(payload, 'setBackgroundMessageHandler');
    
    if(!!notificationData.title) {
        return self.registration.showNotification(
            notificationData.title,
            notificationData.options,
        );
    }
});
