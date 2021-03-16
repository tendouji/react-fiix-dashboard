import FirebaseDB from "./firebase-database";


class FirebaseApp {
    firebase: any = null;
    firebaseDB: any = null;
    firebaseMessaging: any = null;
    serviceWorkerInitialised: boolean = false;

    constructor(firebase: any) {
        this.firebase = firebase;

        if (!firebase.apps.length) {
            firebase.initializeApp(window.firebaseInitObj);
        } else {
            firebase.app(); // if already initialized, use that one
        }
        
        firebase.analytics();
        this.firebaseMessaging = firebase.messaging();

        this.firebaseDB = new FirebaseDB(firebase.database().ref());
        window.firebaseDB = this.firebaseDB;
    }

    setupServiceWorker() {
        return navigator.serviceWorker.register(window.appObj.curSWPath)
        .then(registration => {
            this.firebaseMessaging.useServiceWorker(registration);
            this.serviceWorkerInitialised = true;
        
            this.firebaseMessaging
                .requestPermission()
                .then(() => {
                    console.log('Notification permission granted.');
                    return this.firebaseMessaging.getToken()
                })
                .then((token: string) => {
                    // console.log('FCM registration token:', token);
                    this.firebaseDB.addOrUpdateToken('test-user-' + new Date().getTime(), token);
                })
                .catch((error: any) => {
                    console.log('Unable to get permission to notify. Error:', error);
                });
            
            this.firebaseMessaging.onMessage((payload: any) => {
                const notificationData = window.handleFirebaseMessagePayload(payload, 'onMessage');
        
                if(!!notificationData.title) {
                    navigator.serviceWorker.getRegistrations().then(registration => {
                        registration[0].showNotification(
                            notificationData.title, 
                            notificationData.options
                        );
                    });
                }
            });

            return {
                registered: true
            }
        });        
    }
}

export default FirebaseApp;