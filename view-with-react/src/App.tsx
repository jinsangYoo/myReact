import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import DefaultLayout from './components/layout/DefaultLayout'

import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus
} from '@jinsang/slimer-react'
import { gcodeSelector } from './utils'
import { sendCommonWithPromise, sendCommonWithCB, getRandomIntInclusive } from './utils'

import toast, { Toaster } from 'react-hot-toast'
import { getMessagingHelper, requestForToken, onMessageListener } from './firebase'
import { MessagePayload } from 'firebase/messaging'
import { usePush } from './hooks'

function App() {
  useEffect(() => {
    console.log(`1. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
    console.log(`ACS.getSdkVersion(): ${ACS.getSdkVersion()}`)

    const _config = AceConfiguration.init(gcodeSelector())
    ACS.configure(_config)
      .then((response) => {
        console.log('SDK Promise 초기화::in then!!')
        console.log('response: ' + JSON.stringify(response, null, 2))
        console.log(`1. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
        console.log('ACS.getDetail(): ' + JSON.stringify(ACS.getSdkDetails(), null, 2))
        console.log('ACS.getSdkVersion(): ' + JSON.stringify(JSON.parse(ACS.getSdkVersion()), null, 2))
        console.log('ACS.getTS(): ' + JSON.stringify(JSON.parse(ACS.getTS()), null, 2))
        console.log('ACS.getKey(): ' + ACS.getKey())
      })
      .catch((err) => {
        console.log('SDK Promise 초기화::in reject!!')
        console.log('err: ' + JSON.stringify(err, null, 2))
      })

    // ACS.configure(_config, (error?: object, innerResult?: ACEResponseToCaller) => {
    //   if (error) {
    //     console.log('SDK CB 초기화::in error!!')
    //     console.log(`error: ${error}`)
    //     if (innerResult) {
    //       console.log('innerResult: ' + JSON.stringify(innerResult, null, 2))
    //     }
    //   } else if (innerResult) {
    //     console.log('SDK CB 초기화::in innerResult!!')
    //     console.log('innerResult: ' + JSON.stringify(innerResult, null, 2))
    //     console.log(`2. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
    //     console.log('ACS.getDetail(): ' + JSON.stringify(ACS.getSdkDetails(), null, 2))
    //     console.log('ACS.getSdkVersion(): ' + JSON.stringify(JSON.parse(ACS.getSdkVersion()), null, 2))
    //     console.log('ACS.getTS(): ' + JSON.stringify(JSON.parse(ACS.getTS()), null, 2))
    //     console.log('ACS.getKey(): ' + ACS.getKey())
    //   } else {
    //     console.log('SDK CB 초기화::finally!!')
    //     console.log('error and innerResult is undefined.')
    //   }
    // })
  }, [])

  const isPro = process.env.NODE_ENV === 'production' || false
  const isDev = process.env.NODE_ENV === 'development' || false
  const isTest = process.env.NODE_ENV === 'test' || false
  console.log(`isPro: ${String(isPro)}, isDev: ${String(isDev)}, isTest: ${String(isTest)}`)
  console.log(
    `NODE_ENV: &gt;&gt;${process.env.NODE_ENV}&lt;&lt;, REACT_APP_MODE: &gt;&gt;${process.env.REACT_APP_MODE}&lt;&lt;`
  )

  const [notification, setNotification] = useState({ title: '', body: '' })
  const notify = () => toast(<ToastDisplay />)
  function ToastDisplay() {
    return (
      <div style={{ backgroundColor: 'yellowgreen' }}>
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

  const { setPushToken } = usePush()
  useEffect(() => {
    const messaging = getMessagingHelper()
    requestForToken(messaging)
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken)
          // Perform any other neccessary action with the token
          setPushToken(currentToken)
          toast(
            <div>
              <p>{currentToken}</p>
            </div>
          )
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.')
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
      })

    onMessageListener(messaging)
      .then((result) => {
        console.log('onMessageListener::result: ', JSON.stringify(result, null, 2))
        const payload = result as MessagePayload
        if (payload) {
          setNotification({
            title: payload?.notification?.title ?? 'noTitle',
            body: payload?.notification?.body ?? 'noBody'
          })
          if (payload.data) {
            const msg = payload?.notification?.body ?? 'noBody'
            const params = ACParams.init(ACParams.TYPE.PUSH, msg)
            params.data = payload.data
            sendCommonWithPromise(msg, params)
          } else {
            console.log('payload.data is empty.')
          }
        } else {
          console.log('failed type casting result to MessagePayload.')
        }
      })
      .catch((err) => console.log('failed: ', err))
  }, [])

  return (
    <div>
      <Router>
        <DefaultLayout />
        <Toaster />
      </Router>
    </div>
  )
}

export default App
