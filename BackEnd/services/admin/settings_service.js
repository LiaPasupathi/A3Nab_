module.exports = function () {
  var async = require('async')
  var settingDao = require('../../dao/admin/settings_dao')

  this.updateSocialLinkService = async (request, callback) => {
    try {
      var response = {}
      var settingObject = new settingDao()
      var result = await settingObject.updateSocialLinkDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getAppSettingService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var settingObject = new settingDao()
      var result = await settingObject.getAppSettingDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.socialLinks = result.data[0]
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getNotificationListSettingService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var settingObject = new settingDao()
      // console.log(request)
      Promise.all([
        settingObject.getNotificationListSettingDao('Customer'),
        settingObject.getNotificationListSettingDao('Manager'),
        settingObject.getNotificationListSettingDao('Delivery')
      ]).then(result => {
        resp.customer = result[0].data
        resp.manager = result[1].data
        resp.delivery = result[2].data
        

        response.error = 'false'
        response.message = 'Success'
        response.data = resp
        callback(response)
      })
      .catch(error => {
        console.log(error)
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
        callback(response)
      })
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.updateNotificationStatusService = async (request, callback) => {
    try {
      var response = {}
      var settingObject = new settingDao()
      var result = await settingObject.updateNotificationStatusDao(request)
      if (result.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.updateNotificationTitleService = async (request, callback) => {
    try {
      var response = {}
      var settingObject = new settingDao()
      var result = await settingObject.updateNotificationTitleDao(request)
      if (result.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.updateOrderSrttingService = async (request, callback) => {
    try {
      var response = {}
      var object = {}
      var settingObject = new settingDao()
      if(request.minimumOrderValue){
        object.minimumOrderValue = request.minimumOrderValue
      }
      if(request.quickDelivery){
        object.quickDelivery = request.quickDelivery
      }
      if(request.walletAmount){
        object.walletAmount = request.walletAmount
      }
      if(request.expiryDate){
        object.expiryDate = request.expiryDate
      }

      if(request.taxAmount){
        object.taxAmount = request.taxAmount
      }

      if(request.expiryDate || request.walletAmount || request.quickDelivery || request.minimumOrderValue){ 
        var result = await settingObject.updateSocialLinkDao(object)
        if (result.error) {
          response.error = 'true'
          response.message = 'OOPS DAO Exception'
        } else {
          response.error = 'false'
          response.message = 'Success'
        }
      } else {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      }

    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.updateWalletSettingService = async (request, callback) => {
    try {
      var response = {}
      var settingObject = new settingDao()
      var result = await settingObject.updateSocialLinkDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.distanceRateServive = async (request, callback) => {
    try {
      var response = {}
      var settingObject = new settingDao()
      // console.log(request)
      var result = await settingObject.updateSocialLinkDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

}
