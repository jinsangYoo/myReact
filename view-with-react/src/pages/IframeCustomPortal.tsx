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
import CustomIframePortal from '../components/iframe/CustomIframePortal'
import MyComponent from '../components/iframe/MyComponent'

const title = 'IframeCustomPortal'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const _parentOrigin = 'https://rnfornhndata.web.app'
const _0_ip = 'https://rnfornhndata.web.app/iframe/third'
const _1_ip = 'https://rnfornhndata.web.app/iframe/fourth'
export default function IframeCustomPortal() {
  const [isTopParent, setIsTopParent] = useState<boolean>(false)
  const [isWebView, setIsWebView] = useState<boolean>(false)
  const [browser, setBrowser] = useState<string>('Browser')
  const iframeRef_0 = React.useRef<HTMLIFrameElement>(null)
  const iframeRef_1 = React.useRef<HTMLIFrameElement>(null)

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
            <CustomIframePortal>
              <MyComponent />
            </CustomIframePortal>
          </li>
        </ul>
      </div>
    </>
  )
}
