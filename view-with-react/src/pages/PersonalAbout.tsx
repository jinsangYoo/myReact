import React, { useEffect, useLayoutEffect } from 'react'
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
import { Button } from '@mui/material'

const title = '대문_about'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function PersonalAbout() {
  useEffect(() => {
    // TODO
    // SDK 와 함께 listener 정리가 필요.
    // return () => {
    //   window.top?.removeEventListener('didMounted')
    // }
  }, [])

  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const iframeRef = React.useRef(null)
  function sendToIframe() {
    console.log('in sendToIframe')
    window.postMessage(
      JSON.stringify({
        type: 'type:sendToIframe',
        datas: {
          aa: 'datas:aa:sendToIframe'
        }
      }),
      'http://localhost:3000'
    )
  }

  return (
    <>
      <p>대문 여긴어디 입니다.</p>
      <div>
        <ul>
          <li>
            <iframe
              title="대문 여긴어디 입니다."
              src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d4806.420002661456!2d-89.87919774410639!3d31.58858477434875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d31.5883935!2d-89.8794326!5e0!3m2!1sen!2sus!4v1581760461224!5m2!1sen!2sus"
              width="1140"
              height="410"
              style={{ border: '0' }}
            />
          </li>
          <li>
            <Button variant="outlined" onClick={sendToIframe}>
              send to Iframe.
            </Button>
          </li>
          <li>
            <iframe
              ref={iframeRef}
              id="cardGame"
              title="cardGame"
              width="500"
              height="200"
              style={{ border: '0' }}
              src="http://localhost:52274/"
            />
          </li>
        </ul>
      </div>
    </>
  )
}
