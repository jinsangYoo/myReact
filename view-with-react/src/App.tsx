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
import { usePush, useACSDKUtil } from './hooks'

import toast, { Toaster } from 'react-hot-toast'
import { getMessagingHelper, requestForToken } from './firebase'
import { onMessage } from 'firebase/messaging'

const _ip = 'https://rnfornhndata.web.app/'
function App() {
  const { setEnableInSDK, setDetailInSDK } = useACSDKUtil()
  useEffect(() => {
    const _config = AceConfiguration.init(gcodeSelector())
    ACS.configure(_config)
      .then((response) => {
        console.log('SDK Promise 초기화::in then!!')
        console.log('response: ' + JSON.stringify(response, null, 2))
        setEnableInSDK(ACS.isEnableSDK())
        console.log(`1. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
        setDetailInSDK(Object.assign(ACS.getSdkDetails()))
        console.log('ACS.getDetail(): ' + JSON.stringify(ACS.getSdkDetails(), null, 2))
        console.log('ACS.getSdkVersion(): ' + JSON.stringify(JSON.parse(ACS.getSdkVersion()), null, 2))
        console.log('ACS.getTS(): ' + JSON.stringify(JSON.parse(ACS.getTS()), null, 2))
        console.log('ACS.getKey(): ' + ACS.getKey())
      })
      .catch((err) => {
        console.log('SDK Promise 초기화::in reject!!')
        console.log('error: ' + (err as Error).message)
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

  // const isPro = process.env.NODE_ENV === 'production' || false
  // const isDev = process.env.NODE_ENV === 'development' || false
  // const isTest = process.env.NODE_ENV === 'test' || false
  // console.log(`isPro: ${String(isPro)}, isDev: ${String(isDev)}, isTest: ${String(isTest)}`)
  // console.log(
  //   `NODE_ENV: &gt;&gt;${process.env.NODE_ENV}&lt;&lt;, REACT_APP_MODE: &gt;&gt;${process.env.REACT_APP_MODE}&lt;&lt;`
  // )

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
    try {
      const messaging = getMessagingHelper()
      requestForToken(messaging)
        .then((currentToken) => {
          if (currentToken) {
            console.log('current push token for client: ', currentToken)
            // Perform any other neccessary action with the token
            setPushToken(currentToken)
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.')
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err)
        })

      onMessage(messaging, (payload) => {
        console.log(
          `[${new Date().toLocaleDateString()}] in Ap::onMessage::${JSON.stringify(payload, null, 2)}`
        )
        setNotification({
          title: payload?.notification?.title ?? 'noTitle',
          body: payload?.notification?.body ?? 'noBody'
        })
        console.log(
          `[${new Date().toLocaleDateString()}] in Ap::onMessage::payload.data: ${JSON.stringify(
            payload.data,
            null,
            2
          )}`
        )
        if (payload.data) {
          const msg = payload?.notification?.body ?? 'noBody'
          const params = ACParams.init(ACParams.TYPE.PUSH, msg)
          params.data = payload.data
          sendCommonWithPromise(msg, params)
        } else {
          console.log('in Ap::payload.data is empty.')
        }
      })
    } catch (err) {
      console.error('failed to initialize firebase messaging', err)
    }
  }, [])

  useEffect(() => {
    let parentDomain = [_ip]
    // const _ip = 'http://10.78.104.114'
    // const mobileParent = `${_ip}:3000`
    // let parentDomain = [`${_ip}:3000`, mobileParent]
    // let parentDomain = [`${_ip}:3000`]

    // ACS.send(
    //   {
    //     type: ACParams.TYPE.ONLOAD,
    //     name: 'iframe 연동, Use useEffect reqReady in App, 1234',
    //     key: '1234',
    //     origin: parentDomain
    //   },
    //   (error?: object, result?: ACEResponseToCaller) => {
    //     console.log(`myReact::App::in CB`)
    //     console.log('error: ' + (error as Error).message)
    //     console.log('result: ' + JSON.stringify(result, null, 2))
    //   }
    // )
    // ACS.send(
    //   {
    //     type: ACParams.TYPE.ONLOAD,
    //     key: '1234',
    //     origin: parentDomain
    //   },
    //   (error?: object, result?: ACEResponseToCaller) => {
    //     console.log(`myReact::App::in CB`)
    //     console.log('error: ' + (error as Error).message)
    //     console.log('result: ' + JSON.stringify(result, null, 2))
    //   }
    // )
  }, [])

  useEffect(() => {
    window.addEventListener('message', ACS.handleMessage)
    return () => {
      window.removeEventListener('message', ACS.handleMessage)
      ACS.removeDependencices()
    }
  }, [])

  return (
    <Router>
      <DefaultLayout />
      <Toaster />
    </Router>
  )
}

export default App
