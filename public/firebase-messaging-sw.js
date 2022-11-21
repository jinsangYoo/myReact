importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: 'AIzaSyD4BPLxZiN6Ikg63_pXXIjJmFNWTw3Rdjs',
  authDomain: 'rnfornhndata.firebaseapp.com',
  projectId: 'rnfornhndata',
  storageBucket: 'rnfornhndata.appspot.com',
  messagingSenderId: '684762241392',
  appId: '1:684762241392:web:177fc37ac723ba274197b5'
}

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(firebaseConfig)

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/logo192.png',
    data: payload.data
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
  console.log('notificationclick', event)
  return event
})
