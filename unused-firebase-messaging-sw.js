importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js");

importScripts("./js/firebase-init.js");

firebaseMessaging.setBackgroundMessageHandler(function(payload) {
    const notificationData = handleFirebaseMessagePayload(payload);
    
    if(!!notificationData.title) {
        return self.registration.showNotification(
            notificationData.title,
            notificationData.options,
        );
    }
});
