import React, { useState, useContext, useEffect } from 'react'

import { ACEGender, ACEMaritalStatus } from '@jinsang/slimer-react'
import { isJsxClosingElement } from 'typescript'

export interface MemberProps {
  id: string
  age: number
  gender: ACEGender
  maritalStatus: ACEMaritalStatus
}

export interface IMember {
  member?: MemberProps
  isLogin: () => boolean
  login: (id: string, age: number, gender: ACEGender, maritalStatus: ACEMaritalStatus) => void
  join: (id: string) => void
  leave: (id: string) => void
}

const MemeberContext = React.createContext({} as IMember)
export const useMember = () => useContext(MemeberContext)

export function MemberProvider(props: any) {
  const [logined, setLogined] = useState(false)
  const [member, setMember] = useState<MemberProps | undefined>(undefined)

  const isLogin = () => logined
  const login = (id: string, age: number, gender: ACEGender, maritalStatus: ACEMaritalStatus) =>
    setMember({ id, age, gender, maritalStatus })
  const join = (id: string) => (logined ? { ...member, id } : { id })
  const leave = (id: string) => {
    setLogined(false)
    setMember(undefined)
  }

  return (
    <MemeberContext.Provider
      value={{
        member,
        isLogin,
        login,
        join,
        leave
      }}
    >
      {props.children}
    </MemeberContext.Provider>
  )
}
