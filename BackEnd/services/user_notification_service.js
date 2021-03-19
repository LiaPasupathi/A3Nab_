module.exports = function () {
  var notifyDao = require('../utils/notification')
  var userDao = require('../dao/user_dao')

  this.sendOrderNotification = async (data, type, check) => {
    var userDaoObject = new userDao()
    var notifyObject = new notifyDao()
    var getNotifyUser = await userDaoObject.getUserDeviceToken(data.userId, type)
    if (!getNotifyUser.error) {
      var sendType = await userDaoObject.getAdminNotifyManageDao(check)
      if (!sendType.error) {
        if (sendType.data[0].push == 'true') {
          var notifyMessage = {
            to: getNotifyUser.data[0].fcmToken,
            collapse_key: data.notifyType,
            priority: "high",
            notification: {
            // title: 'ORDER STATUS',
            // body: 'Your order has been placed',
              title: sendType.data[0].pushTitle,
              body: sendType.data[0].pushDescription,
              notifyType: data.notifyType,
              content_available: true
            },
            data: {
              title: sendType.data[0].pushTitle,
              body: sendType.data[0].pushDescription,
              priority: "high",
              notifyType: data.notifyType,
              payload: data
            }
          }
          notifyObject.sendFcm(notifyMessage, () => {})
        }
      }
    }
  }

  this.sendOrderAcceptNotification = async (data, type) => {
    var userDaoObject = new userDao()
    var notifyObject = new notifyDao()
    var getNotifyUser = await userDaoObject.getStoreManagerTokenDao(data.orderId)
    if (!getNotifyUser.error) {
      var fcmTokens = getNotifyUser.data
      if (fcmTokens.length > 0) {
        var ids = []
        fcmTokens.forEach(element => {
          ids.push(element.fcmToken)
        })
        var sendType = await userDaoObject.getAdminNotifyManageDao(7)
        if (!sendType.error) {
          if (sendType.data[0].push == 'true') {
            // console.log(ids)
            var notifyMessage = {
              registration_ids: ids,
              collapse_key: data.notifyType,
              priority: "high",
              notification: {
                title: sendType.data[0].pushTitle,
                body: sendType.data[0].pushDescription,
                notifyType: data.notifyType,
                content_available: true
              },
              data: {
                title: sendType.data[0].pushTitle,
                body: sendType.data[0].pushDescription,
                priority: "high",
                notifyType: data.notifyType,
                payload: data
              }
            }
            notifyObject.sendFcm(notifyMessage, () => {})
          }
        }
      }
    }
  }

  this.sendOrderAssignNotification = async (data) => {
    var userDaoObject = new userDao()
    var notifyObject = new notifyDao()
    var sendType = await userDaoObject.getAdminNotifyManageDao(9)
    if (!sendType.error) {
      if (sendType.data[0].push == 'true') {
        var getToken = await userDaoObject.getDriverFcmToken(data.driverId)
        var notifyMessage = {
          to: getToken.data[0].fcmToken,
          collapse_key: data.notifyType,
          priority: "high",
          notification: {
          // title: 'ORDER STATUS',
          // body: 'Your order has been placed',
            title: sendType.data[0].pushTitle,
            body: sendType.data[0].pushDescription,
            priority: "high",
            notifyType: data.notifyType,
            content_available: true
          },
          data: {
            title: sendType.data[0].pushTitle,
            body: sendType.data[0].pushDescription,
            notifyType: data.notifyType,
            payload: data
          }
        }
        // console.log(notifyMessage)
        notifyObject.sendFcm(notifyMessage, () => {})
      }
    }
  }

  this.sendFloatingCashNotification = async (data) => {
    var userDaoObject = new userDao()
    var notifyObject = new notifyDao()
    // var sendType = await userDaoObject.getAdminNotifyManageDao(9)
    // if (!sendType.error) {
    //   if (sendType.data[0].push == 'true') {
        var getToken = await userDaoObject.getDriverFcmToken(data.driverId)
        // console.log(getToken)
        if(getToken.data.length > 0){
          var notifyMessage = {
            to: getToken.data[0].fcmToken,
            collapse_key: data.notifyType,
            priority: "high",
            notification: {
            // title: 'ORDER STATUS',
            // body: 'Your order has been placed',
              title: 'Floating cash',
              body: data.notifyMessage,
              priority: "high",
              notifyType: data.notifyType,
              content_available: true
            },
            data: {
              title: 'Floating cash',
              body: data.notifyMessage,
              notifyType: data.notifyType,
              payload: data
            }
          }
          // console.log(notifyMessage)
          notifyObject.sendFcm(notifyMessage, () => {})
        }
        
      // }
    // }
  }

}
