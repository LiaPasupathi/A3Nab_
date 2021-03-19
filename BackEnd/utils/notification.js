module.exports = function () {
  const FCM = require('fcm-node')
  var fcm = new FCM(process.env.FCM_SERVER_KEY)

  this.sendFcm = async (messageData) => {
    fcm.send(messageData, function (err, response) {
      if (err) {
        console.log(err)
        console.log('Something has gone wrong!')
      } else {
        console.log('Successfully sent with response: ', response)
      }
    })
  }
}
