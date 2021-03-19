const storeManager_dao = require('../../dao/store_manager/storeManager_dao')

module.exports = function () {
  var storemanagerDao = require('../../dao/store_manager/storeManager_dao')
  var orderDao = require('../../dao/store_manager/order_dao')
  var storeDao = require('../../dao/store_dao')

  require('../../utils/common.js')()
  require('../../utils/error.js')()

  this.loginstoreService = (storeData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var storemanagerDaoObject = new storemanagerDao()
      try {
        var loginstoremanagerDao = await storemanagerDaoObject.getstoreUserDetailsDao(storeData)
        if (loginstoremanagerDao.error == 'true') {
          response.error = 'true'
          response.message = 'OOPS login later'
          resolve(response)
        } else {
          if (loginstoremanagerDao.result.length != 0) {
            var genToken = {}
            genToken.id = loginstoremanagerDao.result[0].id
            genToken.mobileNumber = loginstoremanagerDao.result[0].mobileNumber
            genToken.counrtyCode = loginstoremanagerDao.result[0].counrtyCode
            var token = await this.generateToken(genToken)
            loginstoremanagerDao.result[0].token = Buffer.from(token).toString('base64')
            loginstoremanagerDao.result[0].storeExists = 'true'
            response.error = 'false'
            response.message = 'login success'
            response.result = loginstoremanagerDao.result[0]
            resolve(response)
          } else {
            response.error = 'false'
            response.message = 'not registered'
            response.result = { token: null, storeExists: 'false', id: null, firstName: null, lastName: null, email: null, otp: null, latitude: null, longitude: null, counrtyCode: null, mobileNumber: null, profilePic: null }
            resolve(response)
          }
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.createAccountstoreService = (storeData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var storemanagerDaoObject = new storemanagerDao()
      try {
        var loginstoremanagerDao = await storemanagerDaoObject.getStoreDetailsDao(storeData)
        if (loginstoremanagerDao.error == 'true') {
          response.error = 'true'
          response.message = 'OOPS signup later'
          resolve(response)
        } else {
          if (loginstoremanagerDao.result.length != 0) {
            response.error = 'true'
            response.message = 'already registered'
            resolve(response)
          } else {
            var createStoremanagerDao = await storemanagerDaoObject.createStoreDetailsDao(storeData)
            console.log('createStoremanagerDao', createStoremanagerDao)
            if (createStoremanagerDao.error == 'true') {
              response.error = 'true'
              response.message = 'OOPS signup later'
              resolve(response)
            } else {
              var resultObj = {}
              var genToken = {}
              genToken.id = createStoremanagerDao.result.insertId
              genToken.mobileNumber = storeData.mobileNumber
              genToken.counrtyCode = storeData.counrtyCode
              response.error = 'false'
              response.message = 'signup success'
              resultObj.id = createstoremanagerDao.result.insertId
              // resultObj.firstName = storeData.firstName
              // resultObj.lastName = storeData.lastName
              resultObj.counrtyCode = storeData.counrtyCode
              resultObj.mobileNumber = storeData.mobileNumber
              var token = await this.generateToken(genToken)
              resultObj.token = Buffer.from(token).toString('base64')
              response.result = resultObj
              resolve(response)
            }
          }
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }

  this.updateProfileStoremanagerService  = async (request, callback) => {
    try {
      var response = {}
      var storemanagerObject = new storemanagerDao()
      var checkUser = await storemanagerObject.checkStoreEmailMobileDao(request)
      if (checkUser.error) {
        response.error = 'true'
        response.message = 'failed to upadte profile details'
      } else {
        if (checkUser.data.length == 0) {
          var getMyProfileUserDao = await storemanagerObject.updateManagerProfileUserDao(request)
          if (getMyProfileUserDao.error === 'false') {
            response.error = 'false'
            response.message = 'profile details updated successfully'
          } else {
            response.error = 'true'
            response.message = 'failed to upadte profile details'
          }
        } else {
          response.error = 'true'
          response.message = 'Mobile or email already exists'
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.updateOnlineStatusService  = async (request, callback) => {
    try {
      var response = {}
      var storemanagerObject = new storemanagerDao()
      var getMyProfileUserDao = await storemanagerObject.updateManagerProfileUserDao(request)
      if (getMyProfileUserDao.error === 'false') {
        response.error = 'false'
        response.message = 'profile details updated successfully'
      } else {
        response.error = 'true'
        response.message = 'failed to upadte profile details'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.updateStoreStatusService  = async (request, callback) => {
    try {
      var response = {}
      var storemanagerObject = new storemanagerDao()
      var getMyProfileUserDao = await storemanagerObject.updateStoreAppStatusDao(request)
      if (getMyProfileUserDao.error === 'false') {
        response.error = 'false'
        response.message = 'Success'
      } else {
        response.error = 'true'
        response.message = 'failed to upadte profile details'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.getMyProfileUserService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var storemanagerObject = new storemanagerDao()
      var orderDaoObject = new orderDao()
      Promise.all([
        // userDaoObject.getOfferDetailsDao(request),
        storemanagerObject.getstoreDetailsDaobyid(request),
        orderDaoObject.managerTotalEarnOrders(request),
        orderDaoObject.managerTotalOrdersDao(request)
      ])
        .then(result => {
          resp.profile = result[0].data[0]
          resp.totalEarn = result[1].data[0].totalEarn
          resp.totalOrders = result[2].data[0].totalOrders

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        })
        .catch(error => {
          response.error = 'true'
          response.message = 'failed to retrive store details'
          callback(response)
        })
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.storemanagerDashboardService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var storemanagerObject = new storemanagerDao()
      var orderDaoObject = new orderDao()
      Promise.all([
        // userDaoObject.getOfferDetailsDao(request),
        orderDaoObject.getOrderDetailsDao(request),
        orderDaoObject.getStoteRevenueGraphDao(request),
        storemanagerObject.storeManagerProfileDao(request),
        storemanagerObject.getStoreProfileDetails(request),
        orderDaoObject.getOutOfProductDao(request),
      ])
        .then(result => {
          resp.orders = result[0].data
          resp.graph = result[1].data
          resp.profile = result[2].result[0]
          resp.store = result[3].result[0]
          resp.stockProduct = result[4].data[0]
          // console.log(result)

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        })
        .catch(error => {
          console.log(error)
          response.error = 'true'
          response.message = 'failed to retrive store details'
          callback(response)
        })
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  // this.homeOrderService = (data) => {
  //   return new Promise(async function (resolve) {
  //     var response = {}
  //     var orderDaoObject = new orderDao()
  //     var order = await orderDaoObject.getOrderDetailsDao(data)
  //     console.log(order)
  //   })
  // }

  this.updateDeviceTokenService = (userData) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var storemanagerDaobject = new storeManager_dao()
      try {
        var updateDeviceTokenDao = await storemanagerDaobject.updateDeviceTokenDao(userData)
        if (updateDeviceTokenDao.error === 'false') {
          response.error = 'false'
          response.message = 'FCM updated successfully'
          resolve(response)
        } else {
          response.error = 'true'
          response.message = 'failed to upadte FCM'
          resolve(response)
        }
      } catch (err) {
        err.error = 'true'
        err.message = 'OOPS Service Error'
        resolve(err)
      }
    })
  }
}
