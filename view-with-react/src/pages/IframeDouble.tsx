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
import { getBrowserName, isSupportNativeSDK, isTopWindow } from '../utils'

const title = 'IframeDouble'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const _parentOrigin = 'https://rnfornhndata.web.app'
const _0_ip = 'https://rnfornhndata.web.app/iframe/third'
const _1_ip = 'https://rnfornhndata.web.app/iframe/fourth'
export default function IframeDouble() {
  const [isTopParent, setIsTopParent] = useState<boolean>(false)
  const [isWebView, setIsWebView] = useState<boolean>(false)
  const [browser, setBrowser] = useState<string>('Browser')
  const iframeRef_0 = React.useRef<HTMLIFrameElement>(null)
  const iframeRef_1 = React.useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    return () => {
      ACS.removeDependencices()
    }
  }, [])

  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  useEffect(() => {
    setIsTopParent(isTopWindow())
    setIsWebView(isSupportNativeSDK())
    setBrowser(getBrowserName())
  }, [])

  const printDependencies = useCallback(() => {
    console.log('in sendToIframe')
    ACS.printDependencies()
  }, [])

  function onDetails() {
    console.log(`in onDetails in ${title}`)
    console.log(`ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
    console.log('ACS.getDetail(): ' + JSON.stringify(ACS.getSdkDetails(), null, 2))
    console.log('ACS.getSdkVersion(): ' + JSON.stringify(JSON.parse(ACS.getSdkVersion()), null, 2))
    console.log('ACS.getTS(): ' + JSON.stringify(JSON.parse(ACS.getTS()), null, 2))
    console.log('ACS.getKey(): ' + ACS.getKey())
  }

  const handleLoad_0 = () => {
    console.log('Ready for iframeRef_0.')
    console.log(`_parentOrigin: ${_parentOrigin}`)
    console.log(`iframeRef_0: ${iframeRef_0.current?.src}`)
    console.log(`ACS.addRequestReady result: ${ACS.addRequestReady('1234', iframeRef_0, _parentOrigin)}`)
  }

  const handleLoad_1 = () => {
    console.log('Ready for iframeRef_1.')
    console.log(`_parentOrigin: ${_parentOrigin}`)
    console.log(`iframeRef_1: ${iframeRef_1.current?.src}`)
    console.log(`ACS.addRequestReady result: ${ACS.addRequestReady('abcd', iframeRef_1, _parentOrigin)}`)
  }

  return (
    <>
      <p>PL msg: {`>>${title}<< >>${randomValueForScreen}<<`}</p>
      <p>window.location.origin: {window.location.origin}</p>
      <p>window.location: {window.location.toString()}</p>
      <div>
        <ul>
          <li>
            <Typography>isWebView(true/false): {isWebView === true ? 'true' : 'false'}</Typography>
          </li>
          <li>
            <Typography>플랫폼(browser/ios/aos): {browser}</Typography>
          </li>
          <li>
            <Typography>isTopParent(true/false): {isTopParent === true ? 'true' : 'false'}</Typography>
          </li>
          <li>
            <Button variant="outlined" onClick={printDependencies}>
              print Dependencies
            </Button>
          </li>
          <li>
            <Button variant="outlined" onClick={onDetails}>
              onDetails
            </Button>
          </li>
          <li>
            <iframe
              ref={iframeRef_0}
              title="iframeRef_0"
              width="500"
              height="200"
              style={{ border: '0' }}
              src={_0_ip}
              onLoad={handleLoad_0}
            />
          </li>
          <li>
            <iframe
              ref={iframeRef_1}
              title="iframeRef_1"
              width="500"
              height="200"
              style={{ border: '0' }}
              src={_1_ip}
              onLoad={handleLoad_1}
            />
          </li>
        </ul>
      </div>
    </>
  )
}
