import React, { useState, useReducer, useEffect, useCallback, useMemo, useLayoutEffect } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

import { faker } from '@faker-js/faker'
import { ACSDK } from '../hooks'

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

const title = 'mall_기타기능'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const MallEtc = () => {
  // const [link, setLink] = useState(faker.internet.url)
  const [link, setLink] = useState(faker.word.noun)
  const [tel, setTel] = useState(faker.finance.routingNumber)
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const handleLink = () => {
    ACSDK({
      type: ACParams.TYPE.LINK,
      msg: `URL_10`,
      randomValue: randomValueForScreen,
      link: {
        linkName: link
      }
    })
  }

  const handleTel = () => {
    ACSDK({
      type: ACParams.TYPE.TEL,
      msg: `${title}_TEL`,
      randomValue: randomValueForScreen,
      tel: {
        tel: tel
      }
    })
  }

  return (
    <div>
      <h2>Link</h2>
      <div
        style={{ width: '80%', border: '3px solid #eee', display: 'flex', padding: 10, alignItems: 'center' }}
      >
        <div style={{ marginLeft: '20px' }}>
          링크명:
          <TextField
            sx={{ ml: 1 }}
            required
            id="filled-required"
            label="Required"
            defaultValue={link}
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.currentTarget.value)}
          />
        </div>
        <div style={{ marginLeft: '20px' }}>
          <Button variant="outlined" sx={{ ml: 1 }} onClick={handleLink}>
            Link API
          </Button>
        </div>
      </div>
      <h2>Tel</h2>
      <div
        style={{ width: '80%', border: '3px solid #eee', display: 'flex', padding: 10, alignItems: 'center' }}
      >
        <div style={{ marginLeft: '20px' }}>
          연락처:
          <TextField
            sx={{ ml: 1 }}
            required
            id="filled-required"
            label="Required"
            defaultValue={tel}
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTel(e.currentTarget.value)}
          />
        </div>
        <div style={{ marginLeft: '20px' }}>
          <Button variant="outlined" sx={{ ml: 1 }} onClick={handleTel}>
            TEL API
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MallEtc
