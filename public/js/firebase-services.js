firebase.initializeApp(firebaseInitObj);
firebase.analytics();

const firebaseDB = new FirebaseDB(firebase.database().ref());
window.firebaseDB = firebaseDB;

const firebaseMessaging = firebase.messaging();

navigator.serviceWorker.register(curSWPath)
.then(registration => {
    firebaseMessaging.useServiceWorker(registration);

    firebaseMessaging
        .requestPermission()
        .then(() => {
            console.log('Notification permission granted.');
            return firebaseMessaging.getToken()
        })
        .then((token) => {
            console.log('FCM registration token:', token);
            firebaseDB.addOrUpdateToken('test-user-' + new Date().getTime(), token);
        })
        .catch((error) => {
            console.log('Unable to get permission to notify. Error:', error);
        });
    
    firebaseMessaging.onMessage((payload) => {
        const notificationData = handleFirebaseMessagePayload(payload, 'onMessage');

        if(!!notificationData.title) {
            navigator.serviceWorker.getRegistrations().then(registration => {
                registration[0].showNotification(
                    notificationData.title, 
                    notificationData.options
                );
            });
        }
    });
});

