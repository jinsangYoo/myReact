import React, { useLayoutEffect } from 'react'
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
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/react-editor'

const title = 'MyReact_main'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function MyReactMain() {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  return (
    <Editor
      initialValue="hello react editor world!"
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
    />
  )
}
