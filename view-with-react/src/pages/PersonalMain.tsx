import React, { useEffect, useLayoutEffect, useState } from 'react'
import { regSw, subscribe } from '../helper'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus
} from '@jinsang/slimer-react'
import { sendCommonWithPromise, sendCommonWithCB, getRandomIntInclusive } from '../utils'

import { deleteForToken } from '../firebase'
import { REACT_FRONT_PART_VERSION } from '../version'
import { usePush, useACSDKUtil } from '../hooks'
import { Button, IconButton } from '@mui/material'
import { AutorenewRounded } from '@mui/icons-material'

const title = '대문_main'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function PersonalMain() {
  const { enable, setEnableInSDK, details, setDetailInSDK } = useACSDKUtil()
  const { token } = usePush()

  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  async function registerAndSubscribe() {
    try {
      const serviceWorkerReg = await regSw()
      await subscribe(serviceWorkerReg)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteToken() {
    try {
      const result = await deleteForToken()
        .then((result) => {
          console.log('result: ', result)
        })
        .catch((err) => console.log('failed: ', err))
    } catch (error) {
      console.log(error)
    }
  }
  const handleRenew = () => {
    setEnableInSDK(ACS.isEnableSDK())
    setDetailInSDK(Object.assign(ACS.getSdkDetails()))
  }

  return (
    <div>
      {/* <button onClick={registerAndSubscribe}>subscribe for push notifications</button> */}
      <p>
        <IconButton aria-label="갱신" onClick={() => handleRenew()}>
          <AutorenewRounded />
        </IconButton>
        react QA 웹사이트 버전: {REACT_FRONT_PART_VERSION}
      </p>
      <Button
        variant="outlined"
        onClick={() => {
          navigator.clipboard.writeText(token)
        }}
      >
        FCM token copy to clipboard
      </Button>
      <pre>{token}</pre>
      <pre>ACS SDK 버전: {ACS.getSdkVersion()}</pre>
      <pre>ACS SDK 활성화 여부: {enable.toString()}</pre>
      <pre>ACS SDK 현황: {JSON.stringify(details, null, 2)}</pre>
      <Button variant="outlined" onClick={deleteToken}>
        Delete FCM push token.
      </Button>
    </div>
  )
}
