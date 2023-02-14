import React, { useState, useContext, useEffect } from 'react'

export interface IACSDKUtil {
  enable: boolean
  setEnableInSDK: (argEnable: boolean) => void
  details: any
  setDetailInSDK: (argDetailOfSDK: any) => void
}

const ACSDKUtilContext = React.createContext({} as IACSDKUtil)
export const useACSDKUtil = () => useContext(ACSDKUtilContext)

export function ACSDKUtilProvider(props: any) {
  const [enable, setEnable] = useState(false)
  const setEnableInSDK = (argEnable: boolean) => setEnable(argEnable)
  const [details, setDetails] = useState({ result: 'none' })
  const setDetailInSDK = (argDetailOfSDK: any) => setDetails(argDetailOfSDK)

  return (
    <ACSDKUtilContext.Provider
      value={{
        enable,
        setEnableInSDK,
        details,
        setDetailInSDK
      }}
    >
      {props.children}
    </ACSDKUtilContext.Provider>
  )
}
