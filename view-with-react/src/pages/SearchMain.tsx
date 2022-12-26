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

const title = 'search_키워드'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const SearchMain = () => {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const [keyword, setKeyword] = useState(
    `${faker.commerce.product()}${getRandomIntInclusive(0, 999).toString()}`
  )
  const handleAPI = () => {
    ACSDK({
      type: ACParams.TYPE.SEARCH,
      msg: `${title}_search`,
      randomValue: randomValueForScreen,
      search: {
        keyword: keyword
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
              id="keyword"
              label="키워드"
              defaultValue={keyword}
              name="keyword"
              autoComplete="keyword"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.currentTarget.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleAPI}>
              A 검색
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default SearchMain
