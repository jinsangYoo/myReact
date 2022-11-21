// this.addEventListener('activate', function (event) {
//   console.log('service worker activated')
// })
// this.addEventListener('push', async function (event) {
//   const message = await event.data.json()
//   let { title, description, image } = message
//   console.log('message:', { message })
//   await event.waitUntil(
//     this.registration.showNotification(title, {
//       body: description,
//       icon: image,
//       actions: [
//         {
//           action: 'Get',
//           title: 'say hi'
//         }
//       ]
//     })
//   )
// })
// this.addEventListener(
//   'notificationclick',
//   function (event) {
//     if (!event.action) {
//       // Was a normal notification click
//       console.log('Notification Click.')
//       return
//     }

//     switch (event.action) {
//       case 'Get':
//         break
//     }

//     event.notification.close()
//     console.log('event.action:', event.action)
//   },
//   false
// )
