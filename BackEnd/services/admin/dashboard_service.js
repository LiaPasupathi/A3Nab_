module.exports = function () {
  var async = require('async')
  var dashboardDao = require('../../dao/admin/dashboard_dao')
  var storeDao = require('../../dao/admin/manageStore_dao')

  this.dashboardService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var dashboardDaoObj = new dashboardDao()
      Promise.all([
        dashboardDaoObj.orderStatusCountDao(request),
        this.dashboardStoreService(request),
        this.dashboardDriverService(request),
        dashboardDaoObj.dashboardOrderGraphDao(request),
        dashboardDaoObj.dashboardGenderGraphDao(request),
        dashboardDaoObj.dashboardAgeGraphDao(request),
        dashboardDaoObj.dashboardLatestCustomerFeedback(request),
        dashboardDaoObj.dashboardAppFeedbackDao(request),
        dashboardDaoObj.adminNotificationDao(request),
        dashboardDaoObj.dashboardPaymentDao(request)
      ]).then(result => {
        resp.orderStatusCount = result[0].data[0]
        resp.stores = result[1].data
        resp.driver = result[2].data

        resp.ordersAndRevenueGraph = result[3].data
        resp.genderGraph = result[4].data
        resp.ageGraph = result[5].data
        resp.payment = result[9].data
        resp.feedback = result[6].data
        resp.appFeedback = result[7].data
        resp.notification = result[8].data

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

  this.dashboardDriverService = function (data) {
    return new Promise(async function (resolve, reject) {
        var response = {}
        var dashboardDaoObj = new dashboardDao()
        var results = await dashboardDaoObj.driverListDao(data)
        if(results.error){
            response.error = true
            reject(response)
        } else {
            response.error = false
            response.data = results.data
            resolve(response)
        }
    })
  }

  this.dashboardStoreService = function (data) {
    return new Promise(async function (resolve, reject) {
        var response = {}
        var storeObject = new storeDao()
        var dashboardDaoObj = new dashboardDao()
        var results = await storeObject.getAllStoreDao(data)
        if(results.error){
            response.error = true
            reject(response)
        } else {
          if(results.data.length > 0){
            var storeList = results.data
            var length = storeList.length
            async.eachOfSeries(storeList, async function (item, index) {
              var orderCount =  await dashboardDaoObj.dashboardStoreRevenue(item)
              var sumValue =  await dashboardDaoObj.dashboardStoreRevenueTotal(item)
              storeList[index].orders = orderCount.data.length
              storeList[index].billing = sumValue.data[0].amount
              if(--length === 0){
                response.error = false
                response.data = storeList
                resolve(response)
              }
            })
          } else {
            response.error = false
            response.data = results.data
            resolve(response)
          }
        }
    })
  }


  this.dashboardOrderService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var dashboardDaoObj = new dashboardDao()
      request.queryType = 'TOTAL'
      var orders = await dashboardDaoObj.dashboardOrderDao(request)
      if(orders.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        if(orders.data.length > 0){
          request.queryType = 'LIST'
          request.pageCount = 10

          var result = await dashboardDaoObj.dashboardOrderDao(request)
          if(result.error){
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
          } else {
            var total = orders.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }
            resp.total = total
            resp.orders = result.data
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
          }
        } else {
          resp.total = 0
          resp.orders = orders.data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.topStatsService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var dashboardDaoObj = new dashboardDao()
      Promise.all([
        dashboardDaoObj.topOrderUserDao(request),
        dashboardDaoObj.topOrderDriverDao(request),
        this.topOrderStoreService(request)
      ]).then(result => {
        resp.customer = result[0].data
        resp.driver = result[1].data
        resp.store = result[2].data

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

  this.topOrderStoreService = function (data) {
    return new Promise(async function (resolve, reject) {
        var response = {}
        var storeObject = new storeDao()
        var dashboardDaoObj = new dashboardDao()
        var results = await storeObject.getAllStoreDao(data)
        if(results.error){
            response.error = true
            reject(response)
        } else {
          if(results.data.length > 0){
            var storeList = results.data
            var length = storeList.length
            async.eachOfSeries(storeList, async function (item, index) {
              var orderCount =  await dashboardDaoObj.topOrderStoreDao(item)
              storeList[index].orders = orderCount.data.length
              if(--length === 0){
                storeList.sort(function(a, b) {
                  return b.orders - a.orders;
                });
                response.error = false
                response.data = storeList
                resolve(response)
              }
            })
          } else {
            response.error = false
            response.data = results.data
            resolve(response)
          }
        }
    })
  }

  this.heatMapService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var dashboardDaoObj = new dashboardDao()
      var result = await dashboardDaoObj.heatMapDao(request)
      if (result.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        resp.map = result.data
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

  this.topSellingItemService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var dashboardDaoObj = new dashboardDao()
      var result = await dashboardDaoObj.topSellingItemDao(request)
      if (result.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        resp.product = result.data
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


}
