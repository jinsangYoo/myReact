import React, { useEffect, useLayoutEffect, useCallback, useState } from 'react'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
  ACSForMessage,
  MessageForIFrame
} from '@jinsang/slimer-react'
import { sendCommonWithPromise, sendCommonWithCB, getRandomIntInclusive } from '../utils'
import { Button, Typography } from '@mui/material'
import { onlyAlphabetOrNumberAtStringEndIndex } from '../utils/TextUtils'
import { AceWebViewInterface } from '../types'

const title = '대문_about'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const mobile = 'http://10.77.100.55:3001'
export default function PersonalAbout() {
  const [isWebView, setIsWebView] = useState<boolean>(false)
  const [browser, setBrowser] = useState<string>('Browser')
  const iframeRef_1 = React.useRef<HTMLIFrameElement>(null)
  const iframeRef_2 = React.useRef<HTMLIFrameElement>(null)
  const iframeRef_3 = React.useRef<HTMLIFrameElement>(null)
  const iframeRef_4 = React.useRef<HTMLIFrameElement>(null)
  const iframeRef_5 = React.useRef<HTMLIFrameElement>(null)

  const handleMessage = useCallback((e: Event) => {
    const _originSet = new Set<string>()
    _originSet.add(onlyAlphabetOrNumberAtStringEndIndex('http://localhost:3001'))
    _originSet.add(onlyAlphabetOrNumberAtStringEndIndex('http://localhost:52274'))
    _originSet.add(onlyAlphabetOrNumberAtStringEndIndex('http://localhost:52275'))

    const _event = e as MessageEvent<ACSForMessage>
    const _callback = (
      params: {
        type: string
      } & MessageForIFrame
    ) => {
      console.log(`in myRect::params: ${JSON.stringify(params, null, 2)}`)
    }

    if (!_originSet.has(_event.origin)) {
      return
    }
    switch (_event.data.type) {
      case 'ACS.didAddByOnLoad':
        _callback(_event.data)
        break
      case 'ACS.reqOnLoad':
        _callback(_event.data)
        break
      case 'ACS.resOnLoad':
        _callback(_event.data)
        break
      default:
        break
    }
  }, [])

  useEffect(() => {
    // window.addEventListener('message', handleMessage)
    // window.addEventListener('message', ACS.handleMessage)
    return () => {
      // window.removeEventListener('message', handleMessage)
      // window.removeEventListener('message', ACS.handleMessage)
      ACS.removeDependencices()
    }
  }, [])

  // useLayoutEffect(() => {
  //   const msg = `>>${title}<< >>${randomValueForScreen}<<`
  //   const params = ACParams.init(ACParams.TYPE.EVENT, msg)
  //   sendCommonWithPromise(msg, params)
  // }, [])

  const isSupportSDK = useCallback(() => {
    console.log('in isWebView')
    let _win = window as any | undefined
    if (
      _win &&
      _win.webkit &&
      _win.webkit.messageHandlers &&
      _win.webkit.messageHandlers.ace_message_handler
    ) {
      console.log('maybe ios')
      return true
    } else if (_win && _win.ace_and_interface) {
      console.log('maybe aos')
      return true
    }

    console.log('maybe not webview')
    return false
  }, [])

  const getBrowserName = useCallback(() => {
    console.log('in getBrowserName')
    let _win = window as any | undefined
    if (
      _win &&
      _win.webkit &&
      _win.webkit.messageHandlers &&
      _win.webkit.messageHandlers.ace_message_handler
    ) {
      console.log('maybe ios')
      _win.webkit.messageHandlers.ace_message_handler.postMessage('ace_message_handler!!!!!')
      return 'maybe ios'
    } else if (_win && _win.ace_and_interface) {
      console.log('maybe aos')
      let isAndroid = _win.ace_and_interface as AceWebViewInterface | undefined
      console.log('isAndroid?.getKey(): ' + isAndroid?.getKey())
      console.log('isAndroid?.getDevice(): ' + isAndroid?.getDevice())
      console.log('isAndroid?.getTS(): ' + isAndroid?.getTS())
      return 'maybe aos'
    }

    console.log('maybe not webview')
    return 'browser'
  }, [])

  useEffect(() => {
    setIsWebView(isSupportSDK())
    setBrowser(getBrowserName())
  }, [])

  const testWindow = () => {
    if (window.parent === window) {
      console.log(`in myReact::window.parent === window: ${window.parent === window}`)
    } else {
      console.log(`in myReact::window.parent !== window: ${window.parent !== window}`)
    }
  }

  useEffect(() => {
    testWindow()
  }, [])

  const printDependencies = useCallback(() => {
    console.log('in sendToIframe')
    ACS.printDependencies()
  }, [])

  function onPrintDetails() {
    console.log('in onPrintDetails in test_postmsg_with_react')
    console.log(`ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
    console.log('ACS.getDetail(): ' + JSON.stringify(ACS.getSdkDetails(), null, 2))
    console.log('ACS.getSdkVersion(): ' + JSON.stringify(JSON.parse(ACS.getSdkVersion()), null, 2))
    console.log('ACS.getTS(): ' + JSON.stringify(JSON.parse(ACS.getTS()), null, 2))
    console.log('ACS.getKey(): ' + ACS.getKey())
  }

  const handleLoad_1 = () => {
    console.log('Ready for iframeRef_1.')
    console.log(`iframeRef_1: ${iframeRef_1.current?.src}`)
    ACS.addDependency(iframeRef_1, 'http://localhost:52274/')
  }

  const handleLoad_2 = () => {
    console.log('Ready for iframeRef_2.')
    console.log(`iframeRef_2: ${iframeRef_2.current?.src}`)
    ACS.addDependency(iframeRef_2, 'http://localhost:52275/')
  }

  const handleLoad_3 = () => {
    console.log('Ready for iframeRef_3.')
    console.log(`iframeRef_3: ${iframeRef_3.current?.src}`)
    ACS.addDependency(iframeRef_3, 'http://localhost:3001/')
  }

  const handleLoad_4 = () => {
    console.log('Ready for iframeRef_4.')
    console.log(`iframeRef_4: ${iframeRef_4.current?.src}`)
    ACS.addRequestReady('1234', iframeRef_4, 'http://localhost:3001/')
  }

  const handleLoad_5 = () => {
    console.log('Ready for iframeRef_5.')
    console.log(`iframeRef_5: ${iframeRef_5.current?.src}`)
    ACS.addRequestReady('1234', iframeRef_5, mobile)
  }

  return (
    <>
      <p>대문 여긴어디 입니다.</p>
      <div>
        <ul>
          <li>
            <Typography>
              isWebView: {isWebView == true ? 'true' : 'false'}, 브라우져명: {browser}
            </Typography>
          </li>
          {/* <li>
            <iframe
              title="대문 여긴어디 입니다."
              src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d4806.420002661456!2d-89.87919774410639!3d31.58858477434875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d31.5883935!2d-89.8794326!5e0!3m2!1sen!2sus!4v1581760461224!5m2!1sen!2sus"
              width="1140"
              height="410"
              style={{ border: '0' }}
            />
          </li> */}
          <li>
            <Button variant="outlined" onClick={printDependencies}>
              print Dependencies
            </Button>
          </li>
          <li>
            <Button variant="outlined" onClick={onPrintDetails}>
              onPrintDetails
            </Button>
          </li>
          <li>
            <iframe
              ref={iframeRef_1}
              id="cardGame_1"
              title="cardGame_1"
              width="500"
              height="200"
              style={{ border: '0' }}
              src="http://localhost:52274/index.html"
              onLoad={handleLoad_1}
            />
          </li>
          <li>
            <iframe
              ref={iframeRef_2}
              id="cardGame_2"
              title="cardGame_2"
              width="500"
              height="200"
              style={{ border: '0' }}
              src="http://localhost:52275/"
              onLoad={handleLoad_2}
            />
          </li>
          {/* <li>
            <iframe
              ref={iframeRef_3}
              id="cardGame_3"
              title="cardGame_3"
              width="500"
              height="200"
              style={{ border: '0' }}
              src="http://localhost:3001/"
              onLoad={handleLoad_3}
            />
          </li>
          <li>
            <iframe
              ref={iframeRef_4}
              id="cardGame_4"
              title="cardGame_4"
              width="500"
              height="200"
              style={{ border: '0' }}
              src="http://localhost:3001/"
              onLoad={handleLoad_4}
            />
          </li> */}
          {/* <li>
            <iframe
              ref={iframeRef_5}
              id="mobile"
              title="mobile"
              width="500"
              height="200"
              style={{ border: '0' }}
              src={mobile}
              onLoad={handleLoad_5}
            />
          </li> */}
        </ul>
      </div>
    </>
  )
}
