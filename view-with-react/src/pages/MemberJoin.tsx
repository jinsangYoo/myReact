import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { faker } from '@faker-js/faker'
import Avatar from 'react-avatar'

import { CustomizedHook, useACSDK } from '../hooks'

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
import { useMember } from '../hooks'

const Image = styled('img')({
  width: '100%',
  borderRadius: 10
})

const title = 'memeber_회원가입'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const MemberJoin = () => {
  useACSDK({
    type: ACParams.TYPE.EVENT,
    msg: title,
    randomValue: randomValueForScreen
  })

  const { member, isLogin, login } = useMember()
  const [memberId, setMemberId] = useState(member?.id ?? faker.name.lastName)
  const handleAPI = () => {
    useACSDK({
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
          가입
        </Button>
      </div>
    </div>
  )
}

export default MemberJoin
