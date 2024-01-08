import React, { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import logo from '../logo.svg'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { sendCommonWithPromise, getRandomIntInclusive } from '../utils'
import { REACT_FRONT_PART_VERSION } from '../version'

import { ACParams, ACS, ACEResponseToCaller } from '@jinsang/slimer-react'

const _parentOrigin = 'https://rnfornhndata.web.app'
const title = 'FirstPage'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
function FirstPage() {
  const navigate = useNavigate()
  const goToSecondPage = () => {
    navigate('/iframe/second')
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
    //     console.log(`myReact::App::in CB`)
    //     console.log('error: ' + (error as Error).message)
    //     console.log('result: ' + JSON.stringify(result, null, 2))
    //   }
    // )

    const params = ACParams.init(
      ACParams.TYPE.ONLOAD,
      `${title}::iframe 연동, Use useEffect reqReady in App, 1234`
    )
    params.key = '1234'
    params.origin = [_parentOrigin]
    ACS.send(params, (error?: object, result?: ACEResponseToCaller) => {
      console.log(`${title}::in CB`)
      console.log('error: ' + (error as Error).message)
      console.log('result: ' + JSON.stringify(result, null, 2))
    })
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
        <button onClick={goToSecondPage}>go to SecondPage</button>
        <button onClick={onDetails}>onDetails</button>
        <button onClick={resetToOnLoad}>resetToOnLoad</button>
      </header>
    </div>
  )
}

export default FirstPage
