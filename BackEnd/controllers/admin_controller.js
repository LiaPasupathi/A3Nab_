module.exports = function() {
    var adminService = require('../services/admin_service.js')
    require('../utils/common.js')()

    this.loginAdminController = async (req, callback) => {
        var response = {}
        var adminServiceObject = new adminService()
        var loginAdminService = await adminServiceObject.loginAdminService(req)
        if (loginAdminService.error == "true") {
            response.error = "true"
            response.message = loginAdminService.message
        } else {
            response.error = "false"
            response.message = loginAdminService.message
            response.data = loginAdminService.result
        }
        callback(response)
    }
}