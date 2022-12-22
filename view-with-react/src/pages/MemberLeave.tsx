import React, { useState, useReducer, useEffect, useLayoutEffect, useCallback, useMemo } from 'react'
import TextField from '@mui/material/TextField'
import { Button, Container, Grid } from '@mui/material'
import { faker } from '@faker-js/faker'

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

const title = 'memeber_회원탈퇴'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const MemberLeave = () => {
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
      type: ACParams.TYPE.LEAVE,
      msg: `${title}_leave`,
      randomValue: randomValueForScreen,
      leave: {
        userId: memberId
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '8%' }}>
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="아이디"
              defaultValue={memberId}
              name="username"
              autoComplete="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMemberId(e.currentTarget.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleAPI}>
              A 회원탈퇴
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default MemberLeave
