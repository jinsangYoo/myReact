import React, { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import logo from '../logo.svg'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { sendCommonWithPromise, getRandomIntInclusive } from '../utils'
import { REACT_FRONT_PART_VERSION } from '../version'

import { ACParams, ACS, ACEResponseToCaller } from '@jinsang/slimer-react'

const _parentOrigin = 'https://rnfornhndata.web.app'
const title = 'SecondPage'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
function SecondPage() {
  const navigate = useNavigate()
  const goToFirstPage = () => {
    navigate('/iframe/first')
  }
  const resetToOnLoad = () => {
    ACS.resetToOnLoad()
  }

  useEffect(() => {
    // ACS.send(
    //   {
    //     type: ACParams.TYPE.ONLOAD,
    //     name: 'iframe 연동, Use useEffect reqReady in App, 1234',
    //     key: '1234',
    //     origin: [_parentOrigin]
    //   },
    //   (error?: object, result?: ACEResponseToCaller) => {
    //     console.log(`test_postmsg_with_react::in CB`)
    //     console.log('error: ' + (error as Error).message)
    //     console.log('result: ' + JSON.stringify(result, null, 2))
    //   }
    // )

    // ACS.send(
    //   {
    //     type: ACParams.TYPE.ONLOAD,
    //     name: 'iframe 연동, Use useEffect reqReady in App, 1234',
    //     key: '1234',
    //     origin: [_parentOrigin]
    //   },
    //   (error?: object, result?: ACEResponseToCaller) => {
    //     console.log(`test_postmsg_with_react::in CB`)
    //     console.log('error: ' + (error as Error).message)
    //     console.log('result: ' + JSON.stringify(result, null, 2))
    //   }
    // )

    const params = ACParams.init(ACParams.TYPE.ONLOAD, 'iframe 연동, Use useEffect reqReady in App, 1234')
    params.key = '1234'
    params.origin = [_parentOrigin]

    ACS.send(params)
      .then((response) => {
        if (response) {
          console.log('response: ' + JSON.stringify(response))
        }
        console.log(`success sdk send ${params.name}`)
      })
      .catch((err) => {
        if (err) {
          console.log('error: ' + (err as Error).message)
        }
      })
    // (error?: object, result?: ACEResponseToCaller) => {
    //   console.log(`test_postmsg_with_react::in CB`)
    //   console.log('error: ' + (error as Error).message)
    //   console.log('result: ' + JSON.stringify(result, null, 2))
    // }
  }, [])

  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  function onDetails() {
    console.log(`in onDetails in ${title}`)
    console.log(`ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
    console.log('ACS.getDetail(): ' + JSON.stringify(ACS.getSdkDetails(), null, 2))
    console.log('ACS.getSdkVersion(): ' + JSON.stringify(JSON.parse(ACS.getSdkVersion()), null, 2))
    console.log('ACS.getTS(): ' + JSON.stringify(JSON.parse(ACS.getTS()), null, 2))
    console.log('ACS.getKey(): ' + ACS.getKey())
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <ol>{`>>${title}<< >>${randomValueForScreen}<<`}</ol>
          <ol>window.location.origin: {window.location.origin}</ol>
          <ol>window.location: {window.location.toString()}</ol>
          <ol>react QA 웹사이트 버전: {REACT_FRONT_PART_VERSION}</ol>
          <ol>ACS.getSdkVersion(): {ACS.getSdkVersion()}</ol>
        </div>
        <button onClick={goToFirstPage}>go to FirstPage</button>
        <button onClick={onDetails}>onDetails</button>
        <button onClick={resetToOnLoad}>resetToOnLoad</button>
      </header>
    </div>
  )
}

export default SecondPage
