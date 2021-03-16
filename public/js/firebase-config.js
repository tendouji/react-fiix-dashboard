// Code here is shared between Service Worker and inside components

const firebaseInitObj = {
    apiKey: "AIzaSyBYmq6SLkRUEa0mTblclScInyKUssD73sI",
    authDomain: "fiix-dashboard.firebaseapp.com",
    databaseURL: "https://fiix-dashboard-default-rtdb.firebaseio.com",    
    projectId: "fiix-dashboard",
    storageBucket: "fiix-dashboard.appspot.com",
    messagingSenderId: "1089880642239",
    appId: "1:1089880642239:web:5d1869b273983720de2c0a",
    measurementId: "G-PX2BD9S4JF"
};

const handleFirebaseMessagePayload = (payload, origin) => {
    // console.log(origin, 'handleFirebaseMessagePayload', payload);
    const notificationData = !!payload.data && !!payload.data.notification 
    ? payload.data.notification
    : null;

    if(!!notificationData) {
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

if(typeof window !== 'undefined') { 
    // NOTE: need to check, as this code is also used in Service Worker, which doesn't have window object
    window.firebaseInitObj = firebaseInitObj;
    window.handleFirebaseMessagePayload = handleFirebaseMessagePayload;
}