module.exports = function() {
    var storeService = require('../services/store_service.js')
    require('../utils/common.js')()

    this.loginUserController = async (req, callback) => {
        var response = {}
        var storeServiceObject = new storeService()
        var loginUserService = await storeServiceObject.loginUserService(req)
        if (loginUserService.error == "true") {
            response.error = "true"
            response.message = loginUserService.message
        } else {
            response.error = "false"
            response.message = loginUserService.message
            response.data = loginUserService.result
        }
        callback(response)
    }

    this.createAccountUserController = async (req, callback) => {
        var response = {}
        var storeServiceObject = new storeService()
        var createAccountUserService = await storeServiceObject.createAccountUserService(req)
        if (createAccountUserService.error == "true") {
            response.error = "true"
            response.message = createAccountUserService.message
        } else {
            response.error = "false"
            response.message = createAccountUserService.message
            response.data = createAccountUserService.result
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