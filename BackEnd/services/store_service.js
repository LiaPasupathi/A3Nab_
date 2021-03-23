module.exports = function() {
    var storeDao = require('../dao/store_dao.js')
    require('../utils/common.js')()
    require('../utils/error.js')()

    this.loginUserService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var storeDaoObject = new storeDao()
            try {
                var loginUserDao = await storeDaoObject.getStoreDetailsDao(userData)
                if (loginUserDao.error == 'true') {
                    response.error = "true"
                    response.message = "OOPS login later"
                    resolve(response)
                } else {
                    if (loginUserDao.result.length != 0) {
                        var genToken = {}
                        genToken.id = loginUserDao.result[0].id
                        genToken.mobileNumber = loginUserDao.result[0].mobileNumber
                        genToken.counrtyCode = loginUserDao.result[0].counrtyCode
                        var token = await this.generateToken(genToken)
                        loginUserDao.result[0].token = Buffer.from(token).toString('base64')
                        loginUserDao.result[0].userExists = 'true'
                        response.error = "false"
                        response.message = "login success"
                        response.result = loginUserDao.result[0]
                        resolve(response)
                    } else {
                        response.error = "false"
                        response.message = "not registered"
                        response.result = { token: null, userExists: "false", id: null, firstName: null, lastName: null, email: null, otp: null, latitude: null, longitude: null, counrtyCode: null, mobileNumber: null, profilePic: null }
                        resolve(response)
                    }
                }

            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.createAccountUserService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var loginUserDao = await userDaoObject.getUserDetailsDao(userData)
                if (loginUserDao.error == 'true') {
                    response.error = "true"
                    response.message = "OOPS signup later"
                    resolve(response)
                } else {
                    if (loginUserDao.result.length != 0) {
                        response.error = "true"
                        response.message = "already registered"
                        resolve(response)
                    } else {
                        var createUserDao = await userDaoObject.createUserDetailsDao(userData)
                        console.log(createUserDao)
                        if (createUserDao.error == 'true') {
                            response.error = "true"
                            response.message = "OOPS signup later"
                            resolve(response)
                        } else {
                            var resultObj = {}
                            var genToken = {}
                            genToken.id = createUserDao.result.insertId
                            genToken.mobileNumber = userData.mobileNumber
                            genToken.counrtyCode = userData.counrtyCode
                            response.error = "false"
                            response.message = "signup success"
                            resultObj.id = createUserDao.result.insertId
                            resultObj.firstName = userData.firstName
                            resultObj.lastName = userData.lastName
                            resultObj.counrtyCode = userData.counrtyCode
                            resultObj.mobileNumber = userData.mobileNumber
                            var token = await this.generateToken(genToken)
                            resultObj.token = Buffer.from(token).toString('base64')
                            response.result = resultObj
                            resolve(response)
                        }
                    }
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.updateDeviceTokenService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var userDaoObject = new userDao()
            try {
                var updateDeviceTokenDao = await userDaoObject.updateDeviceTokenDao(userData)
                if (updateDeviceTokenDao.error === 'false') {
                    response.error = "false"
                    response.message = "FCM updated successfully"
                    resolve(response)
                } else {
                    response.error = "true"
                    response.message = "failed to upadte FCM"
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }
    
}