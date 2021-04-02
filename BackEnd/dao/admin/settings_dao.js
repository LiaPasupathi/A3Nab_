module.exports = function () {
  const db = require('../../db.js')

  this.updateSocialLinkDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('appSettings')
        .update(data)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getAppSettingDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('appSettings')
        // .select('instagramURL', 'facebookURL', 'linkedURL', 'twitterURL')
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }


  this.getNotificationListSettingDao = function (data) {
    var response = {}
    return new Promise(function (resolve, reject) {
        db('notificationSettings')
        .select('id', 'name', 'type', 'emailTitle', 'emailDescription', 'smsTitle', 'smsDescription', 'pushTitle', 'pushDescription', 'email', 'sms', 'push')
        .where('type', data)
        .then((result) => {
          response.error = false
          response.data = result
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }


  this.updateNotificationStatusDao = function (data) {
    var response = {}
    return new Promise(function (resolve) {
        db('notificationSettings')
        .where('type', data.type)
        .where('id', data.id)
        .modify(function (queryBuilder) {
          if (data.sendType == 'email') {
            queryBuilder.update('email', data.status)
          }
        })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.updateNotificationTitleDao = function (data) {
    var response = {}
    return new Promise(function (resolve) {
        db('notificationSettings')
        .where('type', data.type)
        .where('id', data.id)
        .modify(function (queryBuilder) {
          if (data.sendType == 'email') {
            queryBuilder.update({ 'emailTitle': data.title, 'emailDescription': data.description })
          }
          if (data.sendType == 'sms') {
            queryBuilder.update({ 'smsTitle': data.title, 'smsDescription': data.description })
          }
          if (data.sendType == 'push') {
            queryBuilder.update({ 'pushTitle': data.title, 'pushDescription': data.description })
          }
        })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }
}
