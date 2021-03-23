module.exports = function() {
    var mysqlExecute = require('../connection.js')


    this.verifyUserDetails = (auth) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT id FROM users WHERE id = ? AND mobileNumber = ?"
                var queryRequest = [auth.id, auth.mobileNumber]
                var loginUserDaoResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (loginUserDaoResponse.error == 'false') {
                    resolve(loginUserDaoResponse)
                } else {
                    resolve(loginUserDaoResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = message.OOPS_auth_data_access_error
                resolve(err)
            }
        })
    }

    this.verifyAdminDetails = (auth) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT id FROM Admin WHERE id = ? AND email = ?"
                var queryRequest = [auth.id, auth.email]
                var loginUserDaoResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (loginUserDaoResponse.error == 'false') {
                    resolve(loginUserDaoResponse)
                } else {
                    resolve(loginUserDaoResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = message.OOPS_auth_data_access_error
                resolve(err)
            }
        })
    }

    this.verifydriverDetails = (auth) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT id, carId FROM driver WHERE id = ? AND mobileNumber = ?"
                var queryRequest = [auth.id, auth.mobileNumber]
                var loginUserDaoResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (loginUserDaoResponse.error == 'false') {
                    resolve(loginUserDaoResponse)
                } else {
                    resolve(loginUserDaoResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = message.OOPS_auth_data_access_error
                resolve(err)
            }
        })
    }

    this.verifyProviderDetails = (auth) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT id FROM providers WHERE id = ? AND name = ? AND email = ?"
                var queryRequest = [auth.id, auth.name, auth.email]
                var loginUserDaoResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (loginUserDaoResponse.error == 'false') {
                    resolve(loginUserDaoResponse)
                } else {
                    resolve(loginUserDaoResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = message.OOPS_auth_data_access_error
                resolve(err)
            }
        })
    }
    this.verifystoreManagerDetails = (auth) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT id, storeId FROM storemanager WHERE id = ? OR email = ?"
                var queryRequest = [auth.id, auth.name, auth.email]
                var loginUserDaoResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (loginUserDaoResponse.error == 'false') {
                    resolve(loginUserDaoResponse)
                } else {
                    resolve(loginUserDaoResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = message.OOPS_auth_data_access_error
                resolve(err)
            }
        })
    }
}