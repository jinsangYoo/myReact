import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus
} from '@jinsang/slimer-react'

export function gcodeSelector(): string {
  return 'AK3A79964'
}

export function sendCommonWithCB(argMessage: string, params: ACParams): void {
  const msg = `\n\n\n\n CB ${argMessage} 클릭!`
  console.log(msg)
  console.log(JSON.stringify(params, null, 2))

  ACS.send(params, (error?: object, result?: ACEResponseToCaller) => {
    console.log(`${argMessage}::in CB`)
    console.log('error: ' + JSON.stringify(error, null, 2))
    console.log('result: ' + JSON.stringify(result, null, 2))
  })
}

export function sendCommonWithPromise(argMessage: string, params: ACParams): void {
  const msg = `\n\n\n\n Promise ${argMessage} 클릭!`
  console.log(msg)
  console.log(JSON.stringify(params, null, 2))

  ACS.send(params)
    .then((response) => {
      console.log(`${argMessage}::in then!!`)
      if (response) {
        console.log('response: ' + JSON.stringify(response, null, 2))
      } else {
        console.log('response is undefined.')
      }
    })
    .catch((err) => {
      console.log(`${argMessage}::in reject!!`)
      if (err) {
        console.log('err: ' + JSON.stringify(err, null, 2))
      } else {
        console.log('err is undefined.')
      }
    })
}
