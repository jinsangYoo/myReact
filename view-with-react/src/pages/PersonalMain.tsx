import React, { useEffect, useLayoutEffect, useState } from 'react'
import { regSw, subscribe } from '../helper'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
  Button
} from '@jinsang/slimer-react'
import { sendCommonWithPromise, sendCommonWithCB, getRandomIntInclusive } from '../utils'

import toast, { Toaster } from 'react-hot-toast'
import { getMessagingHelper, initializeHelper, requestForToken, onMessageListener } from '../firebase'
import { MessagePayload } from 'firebase/messaging'

const title = '대문_main'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function PersonalMain() {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const [notification, setNotification] = useState({ title: '', body: '' })
  const notify = () => toast(<ToastDisplay />)
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    )
  }

  useEffect(() => {
    if (notification?.title) {
      notify()
    }
  }, [notification])

  useEffect(() => {
    const messaging = getMessagingHelper(initializeHelper())
    requestForToken(messaging)
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken)
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.')
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
      })

    // onMessageListener(messaging)
    //   .then((payload) => {
    //     let pay = payload as MessagePayload
    //     let noti? = payload?.notification as NotificationPayload
    //     setNotification({ title: payload?.notification?.title, body: payload?.notification?.body })
    //   })
    //   .catch((err) => console.log('failed: ', err))
  }, [])

  async function registerAndSubscribe() {
    try {
      const serviceWorkerReg = await regSw()
      await subscribe(serviceWorkerReg)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <p>대문 메인 입니다.</p>
      <Button label="사이트 첫화면!!" />
      <button onClick={registerAndSubscribe}>subscribe for push notifications</button>
    </div>
  )
}
