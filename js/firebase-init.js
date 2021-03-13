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
    console.log(origin, 'handleFirebaseMessagePayload', payload);
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


const firebaseDB = firebase.database().ref();
var deviceFCM = firebaseDB.child('device-fcm');

const addFCMData = ({user, token}) => {
    deviceFCM.push({token, user});
};