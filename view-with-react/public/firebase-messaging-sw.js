//프로젝트 버전 확인
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging.js')

const config = {
  apiKey: 'AIzaSyD4BPLxZiN6Ikg63_pXXIjJmFNWTw3Rdjs',
  authDomain: 'rnfornhndata.firebaseapp.com',
  projectId: 'rnfornhndata',
  storageBucket: 'rnfornhndata.appspot.com',
  messagingSenderId: '684762241392',
  appId: '1:684762241392:web:177fc37ac723ba274197b5'
}

// Initialize Firebase
firebase.initializeApp(config)

const messaging = firebase.messaging()

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)

  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: payload,
    icon: './logo512.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
