import React, { useState, useReducer, useEffect, useLayoutEffect, useCallback, useMemo } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
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

const title = '기타_push'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const EtcPush = () => {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const [newMsg, setNewMsg] = useState(
    `${faker.address.country()}_${getRandomIntInclusive(0, 999).toString()}`
  )

  const handleAPI = () => {
    ACSDK({
      type: ACParams.TYPE.PUSH,
      msg: title,
      push: {
        push: newMsg
      },
      randomValue: randomValueForScreen
    })
  }

  return (
    <div style={{ width: '80%', border: '3px solid #eee', padding: 10 }}>
      <div>
        <>
          <Typography sx={{ display: 'inline', ml: 1 }}>임의 PUSH: </Typography>

          <TextField
            fullWidth
            required
            margin="dense"
            id="filled-required"
            label="Required"
            defaultValue={newMsg}
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMsg(e.currentTarget.value)}
          />
        </>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse'
        }}
      >
        <Button variant="outlined" sx={{ ml: 1 }} onClick={handleAPI}>
          A 전송
        </Button>
      </div>
    </div>
  )
}

export default EtcPush