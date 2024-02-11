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
import { onlyAlphabetOrNumberAtStringEndIndex } from '../utils/TextUtils'

const title = '대문_community'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function PersonalCommunity() {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const testString = (value: string) => {
    console.log(`in testString::value: ${value}`)
    let resultOnlyAlphabetOrNumberAtStringEndIndex = onlyAlphabetOrNumberAtStringEndIndex(value)
    console.log(`resultOnlyAlphabetOrNumberAtStringEndIndex: ${resultOnlyAlphabetOrNumberAtStringEndIndex}`)
  }
  testString('sdkjfhasdfj')
  testString('http://localhost:52274/')
  testString('http://localhost:52274')
  testString('http://localhost/')
  testString('http://localhost')
  testString('http://localhost/ss/11#sdsd')
  testString('http://localhost/ss/111')
  testString('http://localhost/ss/1115^%$^$^')
  testString('http://localhost/ss/sdsd%20')
  testString('http://localhost/ss/sdsd%20     ㄴㅇㄴㅇ')

  return <p>대문 커뮤니티 입니다.</p>
}
