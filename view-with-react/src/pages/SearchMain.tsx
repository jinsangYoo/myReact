import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { faker } from '@faker-js/faker'

import { useACSDK } from '../hooks'

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
  useACSDK({
    type: ACParams.TYPE.EVENT,
    msg: title,
    randomValue: randomValueForScreen
  })

  const [keyword, setKeyword] = useState(
    `${faker.commerce.product()}${getRandomIntInclusive(0, 999).toString()}`
  )
  const handleAPI = () => {
    useACSDK({
      type: ACParams.TYPE.SEARCH,
      msg: `${title}_search`,
      randomValue: randomValueForScreen,
      search: {
        keyword: keyword
      }
    })
  }

  return (
    <div>
      <div style={{ width: '80%', border: '3px solid #eee', padding: 10 }}>
        <>
          <Typography sx={{ display: 'inline', ml: 1 }}>키워드: </Typography>

          <TextField
            sx={{ ml: 1 }}
            required
            id="filled-required"
            label="Required"
            defaultValue={keyword}
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.currentTarget.value)}
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
          검색
        </Button>
      </div>
    </div>
  )
}

export default SearchMain