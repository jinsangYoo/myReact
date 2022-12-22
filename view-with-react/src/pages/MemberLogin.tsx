import React, { useState, useReducer, useEffect, useLayoutEffect, useCallback, useMemo } from 'react'
import TextField from '@mui/material/TextField'
import { Button, Container, Grid } from '@mui/material'
import { faker } from '@faker-js/faker'

import { CustomizedHook, ACSDK, useMember } from '../hooks'

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

const title = 'memeber_로그인'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const MemberLogin = () => {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const { member, isLogin, login } = useMember()
  const [memberId, setMemberId] = useState(member?.id ?? faker.name.lastName)
  const [memberAge, setMemberAge] = useState(member?.age ?? getRandomIntInclusive(1, 80))
  const randomValueForGenderIndex = getRandomIntInclusive(0, 2)
  const genders = React.useMemo(() => ['미선택', '남성', '여성'], [])
  const [gender, setGender] = useState(genders[randomValueForGenderIndex])
  const randomValueForMaritalStatusIndex = getRandomIntInclusive(0, 2)
  const maritalStatuses = React.useMemo(() => ['미선택', '기혼', '미혼'], [])
  const [maritalStatus, setMaritalStatus] = useState(maritalStatuses[randomValueForMaritalStatusIndex])

  const handleSelectedGender = (value: string) => setGender(value)
  const genderToACEGender = () => {
    switch (gender) {
      case genders[1]:
        return ACEGender.Man
      case genders[2]:
        return ACEGender.Woman
      default:
        return ACEGender.Unknown
    }
  }

  const handleSelectedMaritalStatus = (value: string) => setMaritalStatus(value)
  const maritalStatusToACEMaritalStatus = () => {
    switch (maritalStatus) {
      case maritalStatuses[1]:
        return ACEMaritalStatus.Married
      case maritalStatuses[2]:
        return ACEMaritalStatus.Single
      default:
        return ACEMaritalStatus.Unknown
    }
  }

  const handleAPI = () => {
    ACSDK({
      type: ACParams.TYPE.LOGIN,
      msg: `${title}_login`,
      randomValue: randomValueForScreen,
      login: {
        userId: memberId,
        userAge: memberAge,
        userGender: genderToACEGender(),
        userMaritalStatus: maritalStatusToACEMaritalStatus()
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
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              label="패스워드 - 안써도 됨"
              name="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="age"
              label="나이"
              defaultValue={memberAge}
              name="age"
              autoComplete="age"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMemberAge(Number(e.currentTarget.value) ?? 1)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomizedHook
              labelName="성별"
              id="gender"
              minWidth={200}
              defaultValueIndex={randomValueForGenderIndex}
              samples={genders}
              onSelectedOptions={handleSelectedGender}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomizedHook
              labelName="결혼 여부"
              id="marital"
              defaultValueIndex={randomValueForMaritalStatusIndex}
              minWidth={200}
              samples={maritalStatuses}
              onSelectedOptions={handleSelectedMaritalStatus}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleAPI}>
              A 로그인
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default MemberLogin
