import React, { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import logo from '../logo.svg'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { sendCommonWithPromise, getRandomIntInclusive } from '../utils'
import { REACT_FRONT_PART_VERSION } from '../version'

import { ACParams, ACS } from '@jinsang/slimer-react'

const title = 'FirstPage'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
function FirstPage() {
  const navigate = useNavigate()
  const goToSecondPage = () => {
    navigate('/iframe/second')
  }
  // useEffect(() => {
  //   ACS.send(
  //     {
  //       type: ACParams.TYPE.ONLOAD,
  //       name: `연동, Use useEffect reqReady in ${title}`,
  //       key: '1234',
  //       origin: parentDomain,
  //     },
  //     (error?: object, result?: ACEResponseToCaller) => {
  //       console.log(`test_postmsg_with_react::in CB`)
  //       console.log('error: ' + (error as Error).message)
  //       console.log('result: ' + JSON.stringify(result, null, 2))
  //     }
  //   )
  // }, [])

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
        <p>{`>>${title}<< >>${randomValueForScreen}<<`}</p>
        <p>window.location.origin: {window.location.origin}</p>
        <p>window.location: {window.location.toString()}</p>
        <p>react QA 웹사이트 버전: {REACT_FRONT_PART_VERSION}</p>
        <p>ACS.getSdkVersion(): {ACS.getSdkVersion()}</p>
        <br />
        <button onClick={goToSecondPage}>go to SecondPage</button>
        <button onClick={onDetails}>onDetails</button>
      </header>
    </div>
  )
}

export default FirstPage
