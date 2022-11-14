import axios from 'axios'
async function regSw() {
  if ('serviceWorker' in navigator) {
    let url = process.env.PUBLIC_URL + '/sw.js'
    const reg = await navigator.serviceWorker.register(url, { scope: '/' })
    console.log('service config is', { reg })
    return reg
  }
  throw Error('serviceworker not supported')
}

async function subscribe(serviceWorkerReg) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription()
  console.log({ subscription })
  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        'BCcrOlHCfMx6DB5qmU0Y0dUbnHAdPV7_V21MxqIaHsS4CrlkCS8EHoUqEJrM7JCjjUfVcXnPCGupqb-IRmi-LU8'
    })
    axios.post('/subscribe', subscription)
  }
}

export { regSw, subscribe }
