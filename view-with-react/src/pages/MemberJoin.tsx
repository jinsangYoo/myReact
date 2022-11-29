import React, { useState, useReducer, useEffect, useLayoutEffect, useCallback, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { faker } from '@faker-js/faker'
import Avatar from 'react-avatar'

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
import { useMember, ACSDK } from '../hooks'

const title = 'memeber_회원가입'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const MemberJoin = () => {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const { member, isLogin, login } = useMember()
  const [memberId, setMemberId] = useState(member?.id ?? faker.name.lastName)
  const handleAPI = () => {
    ACSDK({
      type: ACParams.TYPE.JOIN,
      msg: `${title}_join`,
      randomValue: randomValueForScreen,
      join: {
        userId: memberId
      }
    })
  }

  return (
    <div>
      <div style={{ width: '80%', border: '3px solid #eee', padding: 10 }}>
        <>
          {isLogin() ? <Avatar name={memberId ?? 'new'} /> : <Avatar name={'new'} size="50" round={true} />}
          <Typography sx={{ display: 'inline', ml: 1 }}>ID: </Typography>

          <TextField
            sx={{ ml: 1 }}
            required
            id="filled-required"
            label="Required"
            defaultValue={memberId}
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMemberId(e.currentTarget.value)}
          />
        </>
      </div>
      <div
        style={{
          width: '80%',
          border: '3px solid #eee',
          display: 'flex',
          padding: 10,
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

export default MemberJoin
