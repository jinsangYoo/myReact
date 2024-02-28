import React, { useEffect } from 'react'
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
import { sendCommonWithPromise, sendCommonWithCB, getRandomIntInclusive } from '../../utils'

const title = 'MyComponent'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
function MyComponent() {
  useEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  return (
    <div>
      <p>PL msg: {`>>${title}<< >>${randomValueForScreen}<<`}</p>
      <p style={{ color: 'red' }}>Testing to see if my component renders!</p>
    </div>
  )
}

export default MyComponent
