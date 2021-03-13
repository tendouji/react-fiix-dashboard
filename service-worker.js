importScripts("https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.0/firebase-analytics.js");


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


// FIREBASE
firebase.initializeApp({
    apiKey: "AIzaSyBYmq6SLkRUEa0mTblclScInyKUssD73sI",
    authDomain: "fiix-dashboard.firebaseapp.com",
    projectId: "fiix-dashboard",
    storageBucket: "fiix-dashboard.appspot.com",
    messagingSenderId: "1089880642239",
    appId: "1:1089880642239:web:5d1869b273983720de2c0a",
    measurementId: "G-PX2BD9S4JF"
});

const bgHandleFirebaseMessagePayload = (payload) => {
    console.log('SW bgHandleFirebaseMessagePayload', payload);
    const notificationData = !!payload.data && !!payload.data.notification 
    ? payload.data.notification
    : null;

    if(!!notificationData) {
        // console.log('handleFirebaseMessagePayload', notificationData);
        const {title, ...options} = JSON.parse(notificationData);

        return {
            title: title || 'Test Notification Title',
            options: {
                body: options.body || 'Test Notification Message',
                icon: options.icon || '/images/logo-site.png',
            }
        }
    }

    return {};
};

const firebaseMessaging = firebase.messaging();

firebaseMessaging.setBackgroundMessageHandler(function(payload) {
    const notificationData = bgHandleFirebaseMessagePayload(payload);
    
    if(!!notificationData.title) {
        return self.registration.showNotification(
            notificationData.title,
            notificationData.options,
        );
    }
});
