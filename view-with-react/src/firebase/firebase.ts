// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, Messaging, onMessage, deleteToken } from 'firebase/messaging'
const { REACT_APP_VAPID_KEY } = process.env
const publicKey = REACT_APP_VAPID_KEY

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
    vapidKey: publicKey
  })
}

const deleteForToken = async () => {
  return deleteToken(getMessaging())
}

export { getMessagingHelper, requestForToken, deleteForToken }
