import React, { useState, useReducer, useEffect, useLayoutEffect, useCallback, useMemo } from 'react'
import TextField from '@mui/material/TextField'
import { Button, Container, Grid } from '@mui/material'
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

const title = '기타_pl'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const EtcMain = () => {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const [newMsg, setNewMsg] = useState(`${faker.color.human()}_${getRandomIntInclusive(0, 999).toString()}`)

  const handleAPI = () => {
    ACSDK({
      type: ACParams.TYPE.EVENT,
      msg: newMsg
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
              id="custom_pl"
              label="임의 PL"
              defaultValue={newMsg}
              name="custom_pl"
              autoComplete="custom_pl"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMsg(e.currentTarget.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleAPI}>
              A PL
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default EtcMain
