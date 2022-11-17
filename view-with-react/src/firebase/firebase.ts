// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, Messaging, onMessage, deleteToken } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD4BPLxZiN6Ikg63_pXXIjJmFNWTw3Rdjs',
  authDomain: 'rnfornhndata.firebaseapp.com',
  projectId: 'rnfornhndata',
  storageBucket: 'rnfornhndata.appspot.com',
  messagingSenderId: '684762241392',
  appId: '1:684762241392:web:177fc37ac723ba274197b5'
}

initializeApp(firebaseConfig)

const getMessagingHelper = () => {
  return getMessaging()
}

const requestForToken = async (messaging: Messaging) => {
  return getToken(messaging, {
    vapidKey: 'BNviTz8UP7lfhPSClfcDmSh5e-iv5R2pTqlSSiloZ6GFxFZAM4p4vjMyE1haT_MoBiRd3YiEqwUAPy4vZvN-xlQ'
  })
}

const deleteForToken = async () => {
  return deleteToken(getMessaging())
}

const onMessageListener = (messaging: Messaging) =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload)
      resolve(payload)
    })
  })

export { getMessagingHelper, requestForToken, onMessageListener, deleteForToken }
