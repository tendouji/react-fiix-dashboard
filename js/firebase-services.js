firebase.initializeApp(firebaseInitObj);
    firebase.analytics();

    const firebaseDB = firebase.database().ref();
    var deviceFCM = firebaseDB.child('device-fcm');
    
    const addFCMData = ({user, token}) => {
        console.log('addFCMData', {user, token});
        deviceFCM.push({token, user});
    };
        

    const firebaseMessaging = firebase.messaging();
    console.log(2, addFCMData);

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
                console.log(3, addFCMData);
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