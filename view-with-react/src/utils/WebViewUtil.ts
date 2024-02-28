import { isTopWindow } from './IFrameUtil'

export interface AceWebViewInterface {
  getKey(): string
  getDevice(): string
  getTS(): string
}

export function isIOS(): boolean {
  let _win = window as any | undefined
  if (_win && _win.webkit && _win.webkit.messageHandlers && _win.webkit.messageHandlers.ace_message_handler)
    return true
  return false
}

export function isAOS(): boolean {
  let _win = window as any | undefined
  if (_win && _win.ace_and_interface) return true
  return false
}

function getInterfaceForAOS(ace_and_interface: any) {
  return {
    key: ace_and_interface.getKey(),
    device: ace_and_interface.getDevice(),
    ts: ace_and_interface.getTS(),
    eventName: ace_and_interface.getInjectEventName ? ace_and_interface.getInjectEventName() : '',
    adid: ace_and_interface.getInjectAdid ? ace_and_interface.getInjectAdid() : '',
    adeld: ace_and_interface.getInjectAeld ? ace_and_interface.getInjectAeld() : ''
  }
}

export function isSupportNativeSDK(): boolean {
  return isIOS() && isAOS()
}

export function detectForNative(): void {
  let _win = window as any | undefined
  if (isSupportNativeSDK() && isTopWindow()) {
    if (
      _win &&
      _win.webkit &&
      _win.webkit.messageHandlers &&
      _win.webkit.messageHandlers.ace_message_handler
    ) {
      _win.webkit.messageHandlers.ace_message_handler.postMessage('ACS.loaded')
    } else if (_win && _win.ace_and_interface) {
      self.postMessage(
        {
          type: 'ACS.injectToReact',
          payload: { ...getInterfaceForAOS(_win.ace_and_interface) }
        },
        self.location.origin.toString()
      )
    }
  }
}

export function sendLoadedToIOS(): boolean {
  let _win = window as any | undefined
  if (_win && _win.webkit && _win.webkit.messageHandlers && _win.webkit.messageHandlers.ace_message_handler) {
    _win.webkit.messageHandlers.ace_message_handler.postMessage('loaded')
    return true
  }
  return false
}

export function printInterfaceForAOS(): void {
  let _win = window as any | undefined
  let isAndroid = _win?.ace_and_interface as AceWebViewInterface | undefined
  console.log('isAndroid?.getKey(): ' + isAndroid?.getKey())
  console.log('isAndroid?.getDevice(): ' + isAndroid?.getDevice())
  console.log('isAndroid?.getTS(): ' + isAndroid?.getTS())
}

export function getBrowserName() {
  if (isIOS()) return 'maybe ios'
  else if (isAOS()) {
    printInterfaceForAOS()
    return 'maybe aos'
  }

  return 'browser'
}
