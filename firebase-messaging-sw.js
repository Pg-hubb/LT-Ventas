importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCL0d9TQ6rvowsbO7EdJZz1was0zPplwWs",
    authDomain: "lt-ventas-5a5cb.firebaseapp.com",
    databaseURL: "https://lt-ventas-5a5cb-default-rtdb.firebaseio.com",
    projectId: "lt-ventas-5a5cb",
    storageBucket: "lt-ventas-5a5cb.appspot.com",
    messagingSenderId: "21291647077",
    appId: "1:21291647077:web:41657515d9cf2e75a1868c"
});

const messaging = firebase.messaging();

// Mensajes recibidos cuando la app está en BACKGROUND (minimizada o cerrada)
messaging.onBackgroundMessage(payload => {
    const title = payload.notification?.title || 'Legend Travel';
    const body  = payload.notification?.body  || '';
    self.registration.showNotification(title, {
        body,
        icon:    '/icons/icon-192.png',
        badge:   '/icons/icon-192.png',
        vibrate: [200, 100, 200]
    });
});
