firebase.initializeApp(firebaseInitObj);
    firebase.analytics();

    const firebaseMessaging = firebase.messaging();

    navigator.serviceWorker.register(curSWPath)
    .then(registration => {
        firebaseMessaging.useServiceWorker(registration)

        firebaseMessaging
            .requestPermission()
            .then(() => {
                console.log("Notification permission granted.");
                return firebaseMessaging.getToken()
            })
            .then((token) => {
                console.log("FCM registration token:", token);
                addFCMData({
                    user: 'test-user-' + new Date().getTime(),
                    token: token
                });
            })
            .catch((err) => {
                console.log("Unable to get permission to notify.", err);
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
    })