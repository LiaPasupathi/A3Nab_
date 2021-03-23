module.exports = function () {
  var storeService = require('../../services/store_manager/storeManager_service')
  require('../../utils/common.js')()

  //login controller 
  this.loginUserController = async (req, callback) => {
    var response = {} 
    var storeServiceObject = new storeService(); 
    var loginstoreService = await storeServiceObject.loginstoreService(req)
    if (loginstoreService.error == 'true') {
      response.error = 'true'
      response.message = loginstoreService.message
    } else {
      response.error = 'false'
      response.message = loginstoreService.message
      response.data = loginstoreService.result
    }
    callback(response)
  }

  //get userprofile 
  this.getMyProfileUserController = async (req, callback) => {
    var response = {}
    var storeServiceObject = new storeService()
    var getMyProfilestoreService = await storeServiceObject.getMyProfilestoreService(req)
    if (getMyProfilestoreService.error == 'true') {
      response.error = 'true'
      response.message = getMyProfilestoreService.message
    } else {
      response.error = 'false'
      response.message = getMyProfilestoreService.message
      response.data = getMyProfilestoreService.result
    }
    callback(response)
  }
  this.homeDashboardstoreController = async (req, callback) => {
    var response = {}
    var storeServiceObject = new storeService()
    var homeDashboardstoremanagerService = await storeServiceObject.storemanagerDashboardService(req)
    console.log("homeDashboardstoremanagerService",homeDashboardstoremanagerService);
    if (homeDashboardstoremanagerService.error == 'true') {
      response.error = 'true'
      response.message = homeDashboardstoremanagerService.message
    } else {
      response.error = 'false'
      response.message = homeDashboardstoremanagerService.message
      response.data = homeDashboardstoremanagerService.data
    }
    callback(response)
  }

  this.updateProfileStoremanagerController = async (req, callback) => {
    var response = {}
    var storeServiceObject = new storeService()
    var updateProfileUser = await storeServiceObject.updatestoreManagerService(req)
    if (updateProfileUser.error == 'true') {
      response.error = 'true'
      response.message = updateProfileUser.message
    } else {
      response.error = 'false'
      response.message = updateProfileUser.message
      response.data = updateProfileUser.result
    }
    callback(response)
  }

  this.updateDeviceTokenController = async (req, callback) => {
    var response = {}
    var storeServiceObject = new storeService()
    var updateDeviceTokenService = await storeServiceObject.updateDeviceTokenService(req)
    if (updateDeviceTokenService.error == "true") {
        response.error = "true"
        response.message = updateDeviceTokenService.message
    } else {
        response.error = "false"
        response.message = updateDeviceTokenService.message
        response.data = updateDeviceTokenService.result
    }
    callback(response)
}
}