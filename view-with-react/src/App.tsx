import React, { useEffect } from 'react'
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

  return (
    <div>
      <Router>
        <DefaultLayout />
      </Router>
    </div>
  )
}

export default App
