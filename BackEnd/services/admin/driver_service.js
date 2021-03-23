module.exports = function () {
  var async = require('async')
  const driverDao = require('../../dao/admin/driverDao')
  var notification = require('../../services/user_notification_service')
  var orderDao = require('../../dao/admin/order_dao')

  this.addNewCarService = async (request, callback) => {
    var response = {}
    try {
      var val = Math.floor(1000 + Math.random() * 9000)
      request.carID = '#Car' + val
      var driverDaoObject = new driverDao()
      var save = await driverDaoObject.addNewCarDao(request)
      if (save.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = 'false'
        response.message = 'Success'
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getCarListService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var driverDaoObject = new driverDao()
      var save = await driverDaoObject.getCarListDao(request, null)
      if (save.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.cars = save.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.viewCarDetailService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var driverDaoObject = new driverDao()
      Promise.all([
        driverDaoObject.getCarListDao(request, request.id),
        driverDaoObject.admincarDamageListDao(request.id),
        driverDaoObject.adminGetMaintenanceDao(request.id),
        this.returnCarServiceList(request.id)
      ]).then(result => {
        // console.log(result[0])
        resp.car = result[0].data[0]
        resp.damages = result[1].data
        resp.maintenance = result[2].data
        resp.returnCar = result[3].data
        
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
      // var result = await driverDaoObject.getCarListDao(request, request.id)
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.returnCarServiceList = (id) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      var driverDaoObject = new driverDao()
      var returnCar = await driverDaoObject.getreturnCarListDao(id)
      if(returnCar.error){
        response.error = true
        reject(response)
      } else {
        if(returnCar.data.length > 0){
          var returnList = returnCar.data
          var length = returnList.length
          async.eachOfSeries(returnList, async function (item, index) {
            var returnDamage = await driverDaoObject.returnDamageListDa0(item.id)
            returnList[index].damages = returnDamage.data
            // console.log(returnDamage)
            if (--length === 0) {
              response.error = false
              response.data = returnList
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

  this.assignDriverService = async (request, callback) => {
    var response = {}
    try {
      var driverDaoObject = new driverDao()
      var cars = await driverDaoObject.updateCarDao(request)
      var driver = await driverDaoObject.updateDriverDao(request)
      if (cars.error || driver.error) {
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

  // Driver

  this.addNewDriverService = async (request, callback) => {
    var response = {}
    try {
      var driverDaoObject = new driverDao()
      var checkStore = await driverDaoObject.checkDriverMobileDao(request)
      if (checkStore.error) {
        response.error = 'true'
        response.message = 'Query Error'
      } else {
        if (checkStore.data.length == 0) {
          request.countryCode = 1
          var val = Math.floor(1000 + Math.random() * 9000)
          request.drId = '#dr' + val
          var results = await driverDaoObject.saveNewDriverDao(request)
          if (results.error) {
            response.error = 'true'
            response.message = 'Query Error'
          } else {
            response.error = 'false'
            response.message = 'Success'
          }
        } else {
          response.error = 'true'
          response.message = 'email already registered'
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.editDriverService = async (request, callback) => {
    var response = {}
    try {
      var driverDaoObject = new driverDao()
      var checkStore = await driverDaoObject.editcheckDriverMobileDao(request)
      if (checkStore.error) {
        response.error = 'true'
        response.message = 'Query Error'
      } else {
        if (checkStore.data.length == 0) {
          
          var results = await driverDaoObject.updateDriverProfileDao(request)
          if (results.error) {
            response.error = 'true'
            response.message = 'Query Error'
          } else {
            response.error = 'false'
            response.message = 'Success'
          }
        } else {
          response.error = 'true'
          response.message = 'email already registered'
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getDriverListService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var driverDaoObject = new driverDao()
      var driverResult = await driverDaoObject.getDriverListDao(request)
      if (driverResult.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if(driverResult.data.length > 0){
          var driverList = driverResult.data
          var length = driverList.length
          async.eachOfSeries(driverList, async function (item, index) {
            driverList[index].paid = 0
            driverList[index].pending = item.floatingCash
             var cashamount =  await driverDaoObject.checkFloatingCashDao(item.id)
             if(cashamount.data.length > 0){
              driverList[index].paid = cashamount.data[0].amt
              driverList[index].pending = item.floatingCash - cashamount.data[0].amt
             }
            //  console.log(cashamount)
            if(--length === 0){
              resp.driver = driverList
              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          })
        } else {
          resp.driver = driverResult.data
          response.error = 'false'
          response.message = 'Success'
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

  this.updateFloatingCashService = async (request, callback) => {
    var response = {}
    try {
      var driverDaoObject = new driverDao()
      var notificationObject = new notification()
      var orderObject = new orderDao()
      var driver = await driverDaoObject.getDriverListDao(request, request.id)
      if(driver.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        var cash = driver.data[0].floatingCash
        if(cash > request.amount){
          var driverResult = await driverDaoObject.updateFloatingCashDao(request)
          if (driverResult.error) {
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
          } else {
            var saveNotification = {}
            saveNotification.driverId = request.id
            saveNotification.notifyType = 'FLOATING_CASH'
            saveNotification.amount = request.amount
            saveNotification.notifyMessage = 'Admin update your floating cash amount SAR '+ request.amount
      
            orderObject.saveOrderAssignNotificatoion(saveNotification, () => {})
            notificationObject.sendFloatingCashNotification(saveNotification, () => {})

            
            response.error = 'false'
            response.message = 'Success'
          }
        } else {
          response.error = 'true'
          response.message = 'Invaild amount'
        }
      }
      // console.log(driver)
      
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.assignDriverListService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var driverDaoObject = new driverDao()
      var save = await driverDaoObject.assignDriverListDao(request)
      if (save.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.driver = save.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.updateDriverActiveService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var driverDaoObject = new driverDao()
      var save = await driverDaoObject.updateDriverProfileDao(request)
      if (save.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.driver = save.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }
}
