module.exports = function () {
  var userDao = require('../../dao/admin/manageUser_dao')
  var ordersDao = require('../../dao/admin/order_dao')
  require('../../utils/common')
  var async = require('async')

  this.userListService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      request.methodType = 'ALL'
      request.queryType = 'TOTAL'
      var userObject = new userDao()
      var totalUser = await userObject.totalAllUserDao(request, 0)
      if (totalUser.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        if (totalUser.data.length > 0) {
          request.queryType = 'LIST'
          request.pageCount = 20

          var result = await userObject.totalAllUserDao(request, 0)
          if (result.error) {
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
          } else {
            var total = totalUser.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }
            if(result.data.length > 0){
              var userList = result.data
              var length = result.data.length
              async.eachOfSeries(userList, async function (item, index) {
                userList[index].latitude = ''
                userList[index].longitude = ''
                userList[index].addressPinDetails = ''
                 var address = await userObject.findUserAddress(item.id)
                 if(address.data.length > 0){
                  userList[index].latitude = address.data[0].latitude
                  userList[index].longitude = address.data[0].longitude
                  userList[index].addressPinDetails = address.data[0].addressPinDetails
                 }
                if (--length === 0) {
                  resp.users = userList
                  response.error = 'false'
                  response.message = 'Success'
                  if(request.limit == '0'){
                    response.pages = total
                  } else {
                    response.pages = 0
                  }

                  response.data = resp
                  callback(response)
                }
              })
            } else {
              resp.users = result.data
              response.error = 'false'
              response.message = 'Success'
              if(request.limit == '0'){
                response.pages = total
              } else {
                response.pages = 0
              }
              response.data = resp
              callback(response)
            }  
          }
        } else {
          resp.users = []
          response.error = 'false'
          response.message = 'Success'
          response.pages = 0
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.viewUserService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      request.methodType = 'ONE'
      var userObject = new userDao()
      var totalUser = await userObject.totalAllUserDao(request, request.id)
      var userDetails = totalUser.data[0]
      var address = await userObject.findUserAddress(request.id)
      userDetailslatitude = ''
      userDetailslongitude = ''
      userDetails.addressPinDetails = ''
      if(address.data.length > 0){
        userDetails.latitude = address.data[0].latitude
        userDetails.longitude = address.data[0].longitude
        userDetails.addressPinDetails = address.data[0].addressPinDetails
       }

      var orders = await this.getUserOrderDetailService(request)
      if (totalUser.error || orders.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.users = totalUser.data[0]
        resp.orderList = orders.data
        resp.userList = totalUser.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getUserOrderDetailService = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      var userObject = new userDao()
      var orderList = await userObject.userViewOrderDetailsDao(data)
      if (orderList.error) {
        response.error = true
        resolve(response)
      } else {
        if (orderList.data.length > 0) {
          var ordersData = orderList.data
          var length = ordersData.length
          var orderObject = new ordersDao()
          async.eachOfSeries(ordersData, async function (item, index) {
            var object = { orderId: item.id }
            var orderShops = await orderObject.getShopDetailsDao(object)
            ordersData[index].stores = orderShops.data
            if (--length === 0) {
              response.error = false
              response.data = ordersData
              resolve(response)
            }
          })
        } else {
          response.error = false
          response.data = []
          resolve(response)
        }
      }
    })
  }

  this.trustUserActiveService = async (request, callback) => {
    try {
      var response = {}
      var userDaoObject = new userDao()
      var packageAmount = request.packageValue
      if(request.trustUser === 'true'){
        request.packageValue = packageAmount
      } else {
        request.packageValue = 0
      }
      var userProfile = await userDaoObject.adminupdateProfileUserDao(request)
      if (userProfile.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.updateUserActiveService = async (request, callback) => {
    try {
      var response = {}
      var userDaoObject = new userDao() 
      var userProfile = await userDaoObject.adminupdateProfileUserDao(request)
      if (userProfile.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }
}
