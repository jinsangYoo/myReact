import React, { useState, useContext, useEffect } from 'react'

export interface IPush {
  token: string
  setPushToken: (argToken: string) => void
}

const PushContext = React.createContext({} as IPush)
export const usePush = () => useContext(PushContext)

export function PushProvider(props: any) {
  const [token, setToken] = useState('-')
  const setPushToken = (argToken: string) => setToken(argToken)

  return (
    <PushContext.Provider
      value={{
        token,
        setPushToken
      }}
    >
      {props.children}
    </PushContext.Provider>
  )
}
