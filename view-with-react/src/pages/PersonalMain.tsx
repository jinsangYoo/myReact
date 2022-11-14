import React, { useLayoutEffect } from 'react'
import { regSw, subscribe } from '../helper'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
  Button
} from '@jinsang/slimer-react'
import { sendCommonWithPromise, sendCommonWithCB, getRandomIntInclusive } from '../utils'

const title = '대문_main'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function PersonalMain() {
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

  return (
    <div>
      <p>대문 메인 입니다.</p>
      <Button label="사이트 첫화면!!" />
      <button onClick={registerAndSubscribe}>subscribe for push notifications</button>
    </div>
  )
}
