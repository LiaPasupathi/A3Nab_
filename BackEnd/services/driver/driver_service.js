module.exports = function () {
  require('../../utils/common.js')()
  require('../../utils/error.js')()
  var async = require('async')
  var driverDao = require('../../dao/driver/driver_dao')
  var userDao = require('../../dao/user_dao')

  this.logindriverService = async (data, callback) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      try {
        var loginDriverDao = await driverDaoObject.getDriverDetailsDao(data)
        if (loginDriverDao.error == 'true') {
          response.error = 'true'
          response.message = 'OOPS login later'
        } else {
          if (loginDriverDao.result.length != 0) {
            var genToken = {}
            genToken.id = loginDriverDao.result[0].id
            genToken.mobileNumber = loginDriverDao.result[0].mobileNumber
            genToken.counrtyCode = loginDriverDao.result[0].counrtyCode
            var token = await this.generateToken(genToken)
            loginDriverDao.result[0].token = Buffer.from(token).toString('base64')
            loginDriverDao.result[0].storeExists = 'true'

            resp.loginDetails = loginDriverDao.result[0]

            response.error = 'false'
            response.message = 'login success'
            response.data = resp
          } else {
            resp.loginDetails = { token: null, storeExists: 'false', id: null, firstName: null, lastName: null, email: null, otp: null, latitude: null, longitude: null, counrtyCode: null, mobileNumber: null, profilePic: null }

            response.error = 'false'
            response.message = 'not registered'
            response.data = resp
          }
        }
      } catch (err) {
        response.error = 'true'
        response.message = 'OOPS Service Error'
      }
      callback(response)
    })
  }

  this.driverProfileService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      var profileResult = await driverDaoObject.getDriverDetailByIdDao(request)
      if (profileResult.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        var profileInfo = profileResult.data[0]
        profileInfo.rating = 0
        resp.profile = profileInfo
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.driverupdateDeviceToken = async (request, callback) => {
    try {
      var response = {}
      var driverDaoObject = new driverDao()
      var getMyProfileUserDao = await driverDaoObject.updateDriverProfileUserDao(request)
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

  this.updateDriverProfileService = async (request, callback) => {
    try {
      var response = {}
      var driverDaoObject = new driverDao()
      var checkUser = await driverDaoObject.checkDriverUpdateEmailMobileDao(request)
      if (checkUser.error) {
        response.error = 'true'
        response.message = 'failed to upadte profile details'
      } else {
        if (checkUser.data.length == 0) {
          var getMyProfileUserDao = await driverDaoObject.updateDriverProfileUserDao(request)
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

  this.driverDashboardService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      Promise.all([
        driverDaoObject.getDriverDetailByIdDao(request),
        driverDaoObject.carDamageListDao(request),
        driverDaoObject.currentAssignmentDao(request),
        this.dashboardCarService(request, 'NEW'),
        this.dashboardCarService(request, 'CURRENT')
        // driverDaoObject.newCarAssignDao(request, 'NEW'),
        // driverDaoObject.newCarAssignDao(request, 'CURRENT')
      ]).then(result => {
        // console.log(result)
        var profileInfo = result[0].data[0]
        // console.log(profileInfo)
        profileInfo.rating = 0
        resp.profile = profileInfo
        profileInfo.damage = result[1].data

        // console.log(result[2].data)

        resp.currentAssignment = result[2].data
        resp.newCar = result[3].data
        resp.assignCar = result[4].data

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
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.dashboardCarService = (data, type) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      var cars = await driverDaoObject.newCarAssignDao(data, type)
      if (cars.error) {
        response.error = true
        reject(response)
      } else {
        if (cars.data.length > 0) {
          var damage = await driverDaoObject.carDamageListDao(data)
          resp.car = cars.data
          resp.damage = damage.data
          response.error = false
          response.data = resp
          resolve(response)
        } else {
          resp.car = []
          resp.damage = []

          response.error = false
          response.data = resp
          resolve(response)
        }
      }
    })
  }

  this.updateDriverStatuService = async (request, callback) => {
    try {
      var response = {}
      var driverDaoObject = new driverDao()
      var object = {}
      object.id = request.id
      if(request.isDeleteDriver == 1){
        object.driverActive = 1
      } else {
        object.driverActive = 0
      }
      var getMyProfileUserDao = await driverDaoObject.updateDriverProfileUserDao(object)
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

  this.acceptCarService = async (request, callback) => {
    try {
      var response = {}
      var driverDaoObject = new driverDao()
      request.newCar = 0
      request.returnCar = 0
      var getMyProfileUserDao = await driverDaoObject.updateDriverProfileUserDao(request)
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

  this.updatelatlngService = async (request, callback) => {
    try {
      var response = {}
      var driverDaoObject = new driverDao()
      var getMyProfileUserDao = await driverDaoObject.updateDriverProfileUserDao(request)
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

  this.uploadDocumentDriverService = async (request, callback) => {
    try {
      var response = {}
      var driverDaoObject = new driverDao()
      var object = {}
      object.id = request.id
      if (request.type === 'documentA') {
        object.documentA = request.document
      } else if (request.type === 'documentB') {
        object.documentB = request.document
      } else if (request.type === 'driverLicence') {
        object.driverLicence = request.document
      }
      var getMyProfileUserDao = await driverDaoObject.updateDriverProfileUserDao(object)
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

  this.maintenanceListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      var result = await driverDaoObject.maintenanceListDao(request)
      if (result.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        resp.list = result.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.addMaintenanceService = async (request, callback) => {
    try {
      var response = {}
      var driverDaoObject = new driverDao()
      var object = {}
      object.driverId = request.id
      object.carId = request.carId
      object.maintenanceId = request.maintenanceId

      object.maintenanceAmount = request.maintenanceAmount
      object.currentMileage = request.currentMileage
      object.message = request.message
      var result = await driverDaoObject.addMaintenanceDao(object)
      await driverDaoObject.addMaintenanceNotificationDao(object)
      if (result.error) {
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

  this.returnCarService = async (request, callback) => {
    try {
      var response = {}
      var driverDaoObject = new driverDao()
      // var object = {}
      var damageList = JSON.parse(request.damages)
      if (damageList.length > 0) {
        // var length = damageList.length
        // console.log(length)
        var result = await driverDaoObject.addReturnCarDao(request, damageList)
        if (result.error) {
          response.error = 'true'
          response.message = 'fetch failed'
        } else {
          var obj = { id: request.id, returnCar: 1, isAccepted: 0, carId: null }
          await driverDaoObject.updateDriverProfileUserDao(obj)
          await driverDaoObject.addReturnNotificationDao(request)
          var carObj = { id: request.carId, driverId: null, returnMileage: request.carMileage }
          await driverDaoObject.removeDriverIdFromcar(carObj)
          response.error = 'false'
          response.message = 'Success'
        }
        // console.log(result)
        // async.eachOfSeries(damageList, async function (item, index) {
        //   var object = { DamageReason: item, carId: request.carId, driverId: request.id, addedBy: 'DRIVER', carMileage: request.carMileage }
        //   await driverDaoObject.addReturnCarDao(object, damageList)
        //   if (--length === 0) {
        //     var obj = { id: request.id, returnCar: 1, isAccepted: 0, carId: null }
        //     await driverDaoObject.updateDriverProfileUserDao(obj)
        //     await driverDaoObject.addReturnNotificationDao(request)
        //     var carObj = { id: request.carId, driverId: null }
        //     await driverDaoObject.removeDriverIdFromcar(carObj)
        //     response.error = 'false'
        //     response.message = 'Success'
        //     callback(response)
        //   }
        // })
      } else {
        response.error = 'true'
        response.message = 'fetch failed'
        // callback(response)
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      // callback(response)
    }
    callback(response)
  }

  this.orderDeliveryRoute = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      var getUser = await driverDaoObject.checkDriverRouteDao(request)
      if (getUser.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        if (getUser.result.length > 0) {
          var orderRoute = await this.assignOrderRouteService(request)
          var customer = await this.assignCustomerOrderService(request)

          var checkDelivery = await driverDaoObject.checkDeliveryCount(request)
          if (customer.error == 'true' || orderRoute.error == 'true' || checkDelivery.error == 'true') {
            response.error = 'true'
            response.message = 'fetch failed'
          } else {
            var finalArray = orderRoute.data.route.concat(customer.data.users)
            var finaResult = finalArray.sort((a, b) => a.sortOrder - b.sortOrder)
            resp.adminNumber = '91 7373387128'
            resp.finalDelivery = checkDelivery.data.length
            resp.routeDetail = getUser.result[0]

            resp.routes = finaResult
            response.error = 'false'
            response.message = 'success'
            response.data = resp
            callback(response)
          }
        } else {
          response.error = 'true'
          response.message = 'Invalid ID'
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.vieworderDeliveryRoute = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      var getUser = await driverDaoObject.checkDriverRouteDao(request)
      if (getUser.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        if (getUser.result.length > 0) {
          var orderRoute = await this.viewassignOrderRouteService(request)
          var customer = await this.assignCustomerOrderService(request)

          var checkDelivery = await driverDaoObject.checkDeliveryCount(request)
          if (customer.error == 'true' || orderRoute.error == 'true' || checkDelivery.error == 'true') {
            response.error = 'true'
            response.message = 'fetch failed'
          } else {
            var finalArray = orderRoute.data.route.concat(customer.data.users)
            var finaResult = finalArray.sort((a, b) => a.sortOrder - b.sortOrder)
            resp.adminNumber = '91 7373387128'
            resp.finalDelivery = checkDelivery.data.length
            resp.routeDetail = getUser.result[0]

            resp.routes = finaResult
            response.error = 'false'
            response.message = 'success'
            response.data = resp
            callback(response)
          }
        } else {
          response.error = 'true'
          response.message = 'Invalid ID'
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.viewassignOrderRouteService = function (request) {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      var findStore = await driverDaoObject.findUserRouteDao(request)
      var findOrder = await driverDaoObject.findUserRouteOrdersDao(request)
      // console.log(findOrder)
      var ord = []
      // if(findStore.result.length > 0){}
      if (findStore.error || findOrder.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        resolve(response)
      } else {
        findOrder.result.map(item => {
          ord.push(item.orderId)
        })
        var orderList = findStore.result
        var orlen = orderList.length
        async.eachOfSeries(orderList, async function (item, index) {
          var findOrderStore = await driverDaoObject.viewfindUserStoreDao(item.storeId, ord, request.routeId)
          orderList[index].users = findOrderStore.data

          if (findOrderStore.data.length > 0) {
            var uslen = findOrderStore.data.length

            var userList = findOrderStore.data
            async.eachOfSeries(userList, async function (uitem, uindex) {
              var findProducttore = await driverDaoObject.findOrderProductsDao(uitem.u_id, item.storeId, request.routeId)

              // var deliveryNote = await driverDaoObject.getDliveryNotesDao(uitem.u_id)
              // console.log(deliveryNote)
              // userList[uindex].notes = deliveryNote.data
              userList[uindex].product = findProducttore.data

              var prolen = findProducttore.data.length
              var proList = findProducttore.data

              async.eachOfSeries(proList, async function (uitem, uindex) {
                var image = await driverDaoObject.productImagesDao(uitem.productId)
                proList[uindex].image = image.result[0].productImage
                if (--prolen === 0) {
                  if (--uslen === 0) {
                    if (--orlen === 0) {
                      resp.route = orderList
                      response.error = 'false'
                      response.message = 'success'
                      response.data = resp
                      resolve(response)
                    }
                  }
                }
              })
            })
          } else {
            if (--orlen === 0) {
              resp.route = orderList
              response.error = 'false'
              response.message = 'success'
              response.data = resp
              resolve(response)
            }
          }
        })
      }
    })
  }

  this.assignCustomerOrderService = function (request) {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      var getUser = await driverDaoObject.getuserOrderRoutesDao(request)
      if (getUser.error) {
        response.error = 'true'
        resolve(response)
      } else {
        if (getUser.result.length > 0) {
          var userList = getUser.result
          var uslen = userList.length
          async.eachOfSeries(userList, async function (item, index) {
            var groupSt = await driverDaoObject.routeGroupStoreDao(item.userId, request.routeId)
            userList[index].store = groupSt.result
            var deliveryNote = await driverDaoObject.getDliveryNotesDao(item.userId)
            userList[index].notes = deliveryNote.data
            var gruserList = groupSt.result
            var grus = gruserList.length
            async.eachOfSeries(gruserList, async function (usitem, usindex) {
              var stOrd = await driverDaoObject.storeUserRouteOrderListDao(usitem.storeId, request.routeId, item.userId)

              gruserList[usindex].product = stOrd.result
              var prolen = stOrd.result.length
              var proList = stOrd.result
              async.eachOfSeries(proList, async function (uitem, uindex) {
                var image = await driverDaoObject.productImagesDao(uitem.productId)
                proList[uindex].image = image.result[0].productImage
                if (--prolen === 0) {
                  if (--grus === 0) {
                    if (--uslen === 0) {
                      resp.users = userList
                      response.error = 'false'
                      response.message = 'success'
                      response.data = resp
                      resolve(response)
                    }
                  }
                }
              })
            })
          })
        } else {
          resp.users = []
          response.error = 'false'
          response.message = 'success'
          response.data = resp
          resolve(response)
        }
      }
    })
  }

  this.assignOrderRouteService = function (request) {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      var findStore = await driverDaoObject.findUserRouteDao(request)
      var findOrder = await driverDaoObject.findUserRouteOrdersDao(request)
      // console.log(findOrder)
      var ord = []
      // if(findStore.result.length > 0){}
      if (findStore.error || findOrder.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        resolve(response)
      } else {
        findOrder.result.map(item => {
          ord.push(item.orderId)
        })
        var orderList = findStore.result
        var orlen = orderList.length
        async.eachOfSeries(orderList, async function (item, index) {
          var findOrderStore = await driverDaoObject.findUserStoreDao(item.storeId, ord, request.routeId)
          orderList[index].users = findOrderStore.data

          if (findOrderStore.data.length > 0) {
            var uslen = findOrderStore.data.length

            var userList = findOrderStore.data
            async.eachOfSeries(userList, async function (uitem, uindex) {
              var findProducttore = await driverDaoObject.findOrderProductsDao(uitem.u_id, item.storeId, request.routeId)

              // var deliveryNote = await driverDaoObject.getDliveryNotesDao(uitem.u_id)
              // console.log(deliveryNote)
              // userList[uindex].notes = deliveryNote.data
              userList[uindex].product = findProducttore.data

              var prolen = findProducttore.data.length
              var proList = findProducttore.data

              async.eachOfSeries(proList, async function (uitem, uindex) {
                var image = await driverDaoObject.productImagesDao(uitem.productId)
                proList[uindex].image = image.result[0].productImage
                if (--prolen === 0) {
                  if (--uslen === 0) {
                    if (--orlen === 0) {
                      resp.route = orderList
                      response.error = 'false'
                      response.message = 'success'
                      response.data = resp
                      resolve(response)
                    }
                  }
                }
              })
            })
          } else {
            if (--orlen === 0) {
              resp.route = orderList
              response.error = 'false'
              response.message = 'success'
              response.data = resp
              resolve(response)
            }
          }
        })
      }
    })
  }

  this.driverupdateOrderStatuService = async (request, callback) => {
    try {
      var response = {}
      var object = {}
      var driverDaoObject = new driverDao()
      object.id = request.id
      object.isPickUp = 1
      var result = await driverDaoObject.driverupdateOrderStatuDao(object)
      if (result.error) {
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

  this.driverupdateReceiptService = async (request, callback) => {
    try {
      var response = {}
      var object = {}
      var driverDaoObject = new driverDao()
      object.userId = request.u_id
      object.routeId = request.routeId
      object.storeId = request.storeId
      object.receipt = request.receipt
      var result = await driverDaoObject.driverupdateOrdeReceiptDao(object)
      if (result.error) {
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

  this.driverMoveToLastService = async (request, callback) => {
    try {
      var response = {}
      var object = {}
      var driverDaoObject = new driverDao()
      var findRoute = await driverDaoObject.findDeliveryRouteDao(request)
      if (findRoute.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        if (findRoute.data.length > 0) {
          var lastRoute = findRoute.data[0].sortOrder + 1
          var updateRoute = await driverDaoObject.updateRouteOrderDao(request.id, lastRoute)
          if (updateRoute.error) {
            response.error = 'true'
            response.message = 'fetch failed'
          } else {
            response.error = 'false'
            response.message = 'Success'
          }
        } else {
          response.error = 'true'
          response.message = 'Invalid ID'
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.getAssignmentListService = async (request, callback) => {
    try {
      var response = {}
      var object = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      Promise.all([
        driverDaoObject.getDriverAssignmentDao(request.id, 'Current'),
        driverDaoObject.getDriverAssignmentDao(request.id, 'UpComing'),
        driverDaoObject.getDriverAssignmentDao(request.id, 'Completed')
      ])
        .then(result => {
          // console.log(result)

          resp.completed = result[2].data
          resp.current = result[0].data
          resp.upcoming = result[1].data

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
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.driverViewOrderDetailsService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      var userDaoObject = new userDao()
      var viewOrder = await driverDaoObject.driverViewOrderDao(request)
      if (viewOrder.error) {
        response.error = 'true'
        response.message = 'fetch failed'
        callback(response)
      } else {
        var getStore = await driverDaoObject.getDeliveryStoreDao(request)
        if (getStore.error) {
          response.error = 'true'
          response.message = 'fetch failed'
          callback(response)
        } else {
          var storeList = getStore.data
          var length = storeList.length
          async.eachOfSeries(storeList, async function (item, index) {
            var getproduct = await driverDaoObject.getDriverProductDao(item.storeId, request)
            storeList[index].products = getproduct.result

            var productList = getproduct.result

            var prolen = productList.length
            async.eachOfSeries(productList, async function (proitem, proindex) {
              var req = {
                productId: proitem.productId
              }
              var productImagesDao = await userDaoObject.productImagesDao(req)
              productList[proindex].productImage = productImagesDao.result[0].productImage

              if (--prolen === 0) {
                if (--length === 0) {
                  resp.orderInfo = viewOrder.data[0]
                  resp.orderItems = storeList

                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              }
            })
          })
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
      callback(response)
    }
  }

  this.makeDeliveryService = async (request, callback) => {
    try {
      var response = {}
      var driverDaoObject = new driverDao()
      var checkOrder = await driverDaoObject.driverViewOrderDao(request)
      if (checkOrder.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        if (checkOrder.data[0].orderStatus !== 'COMPLETED') {
          if (checkOrder.data[0].type == 'cash') {
            request.amount = checkOrder.data[0].grandTotal
            await driverDaoObject.updateDriverFloatingCashDao(request)
          }
          var updateDelivery = await driverDaoObject.updateMakeDelivery(request)
          if (request.notes) {
            await driverDaoObject.updateDeliveryNotesDao(request)
          // await driverDaoObject.updateDeliveryNotesOrdersDao(request)
          }

          if (updateDelivery.error) {
            response.error = 'true'
            response.message = 'fetch failed'
          } else {
            response.error = 'false'
            response.message = 'Success'
          }
        } else {
          response.error = 'true'
          response.message = 'Invalid Id'
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.finalDeliveryCallService = async (request, callback) => {
    try {
      var response = {}
      var driverDaoObject = new driverDao()
      var updateDelivery = await driverDaoObject.finalDeliveryCallDao(request)
      if (updateDelivery.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
      // console.log(request)
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.driverNotificationService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var driverDaoObject = new driverDao()
      request.queryType = 'TOTAL'
      var resultDelivery = await driverDaoObject.getDriverNotificationDao(request)
      if (resultDelivery.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        request.queryType = 'LIST'
        request.pageCount = 10
        var result = await driverDaoObject.getDriverNotificationDao(request)
          if(result.error){
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
          } else {

            var total = resultDelivery.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }
            resp.pages = total
            resp.notification = result.data
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
          }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

}
