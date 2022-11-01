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

const title = 'memeber_로그인'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const MemberLogin = () => {
  useACSDK({
    type: ACParams.TYPE.EVENT,
    msg: title,
    randomValue: randomValueForScreen
  })

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
    useACSDK({
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
          <TextField
            sx={{ ml: 1, width: 100 }}
            required
            id="filled-required"
            label="Required"
            defaultValue={memberAge}
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMemberAge(Number(e.currentTarget.value) ?? 1)
            }
          />
        </>
      </div>
      <div style={{ width: '80%', border: '3px solid #eee', display: 'flex', padding: 10 }}>
        <div style={{ marginLeft: '20px' }}>
          <CustomizedHook
            labelName="성별"
            defaultValueIndex={randomValueForGenderIndex}
            minWidth={200}
            samples={genders}
            onSelectedOptions={handleSelectedGender}
          />
        </div>
        <div style={{ marginLeft: '20px' }}>
          <CustomizedHook
            labelName="결혼 여부"
            defaultValueIndex={randomValueForMaritalStatusIndex}
            minWidth={200}
            samples={maritalStatuses}
            onSelectedOptions={handleSelectedMaritalStatus}
          />
        </div>
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
          로그인
        </Button>
      </div>
    </div>
  )
}

export default MemberLogin
