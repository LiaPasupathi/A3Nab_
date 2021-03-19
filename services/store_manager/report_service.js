module.exports = function () {
  var async = require('async')

  var storeReportDao = require('../../dao/store_manager/report_dao')
  var storemanagerDao = require('../../dao/store_manager/storeManager_dao')
  // var storeDao = require('../../dao/admin/manageStore_dao')

  this.managerDashboardgetReportService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var storeDao = new storeReportDao()
      //   var storemanagerObject = new storemanagerDao()
      var storeResult = await storeDao.getstoreDetailsGetid(request)
      if (storeResult.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        var dueDay = storeResult.result[0].dueDay
        request.year = 2021
        Promise.all([
          this.getStoteBillingCycleService(request, dueDay, 0),
          this.getStoteBillingCycleService(request, dueDay, 1)
          // categoryObject.activesubCategoryDao(request),
          // categoryObject.activesubsubCategoryDao(request)
        ]).then(result => {
          // console.log(result)
          resp.pending = result[0]
          resp.past = result[1]
          // resp.subsubCate = result[2].data

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
      }
    } catch (e) {
      console.log(e)
      response.error = true
      response.message = 'Oops'
      callback(response)
    }
  }

  this.getStoteBillingCycleService = (data, dueDay, paid) => {
    return new Promise(async function (resolve) {
      var response = {}
      var year = data.year
      var monthArray = [
        {
          from: 1,
          to: 2,
          fromYear: year,
          toYear: year
        },
        {
          from: 2,
          to: 3,
          fromYear: year,
          toYear: year
        },
        {
          from: 3,
          to: 4,
          fromYear: year,
          toYear: year
        },
        {
          from: 4,
          to: 5,
          fromYear: year,
          toYear: year
        },
        {
          from: 5,
          to: 6,
          fromYear: year,
          toYear: year
        },
        {
          from: 6,
          to: 7,
          fromYear: year,
          toYear: year
        },
        {
          from: 7,
          to: 8,
          fromYear: year,
          toYear: year
        },
        {
          from: 8,
          to: 9,
          fromYear: year,
          toYear: year
        },
        {
          from: 9,
          to: 10,
          fromYear: year,
          toYear: year
        },
        {
          from: 10,
          to: 11,
          fromYear: year,
          toYear: year
        },
        {
          from: 11,
          to: 12,
          fromYear: year,
          toYear: year
        }
        // {
        //   "from": 12,
        //   "to": 1,
        //   "fromYear": year,
        //   "toYear": year + 1
        // }
      ]

      if (year == 2020) {
        var object = {
          from: 12,
          to: 1,
          fromYear: 2020,
          toYear: 2021
        }

        monthArray.push(object)
      }
      //   var storeObject = new storeDao()
      var storeDao = new storeReportDao()
      var resultArray = []
      var length = monthArray.length
      async.eachOfSeries(monthArray, async function (item) {
        //   monthArray.forEach(async function (item) {
        var from = item.fromYear + '-' + item.from + '-' + dueDay
        var to = item.toYear + '-' + item.to + '-' + dueDay
        data.fromDate = from
        data.toDate = to

        var unpaidDuess = await storeDao.getStoteDueAmountDao(data, paid)

        var valcount = await storeDao.geDueOrderCountDao(data, paid)

        if (unpaidDuess.data.length > 0) {
          var dataObject = unpaidDuess.data[0]
          dataObject.from = from
          dataObject.to = to
          dataObject.orders = valcount.data.length
          resultArray.push(dataObject)
        }

        //  if(paidamt.data.length > 0){
        //   resultArray.push(paidamt.data)
        // }
        if (--length === 0) {
          response.data = resultArray
          resolve(resultArray)
          // console.log(resultArray)
        }
      })
    })
  }

  this.viewOrderHistoryService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
        console.log(request)
    } catch (e) {
      console.log(e)
      response.error = true
      response.message = 'Oops'
      callback(response)
    }
  }

  this.managerProfileDashBoardService = async (request, callback) => {
    var response = {}
    var resp = {}
    var orderObject = {}
    try {
      var storemanagerObject = new storemanagerDao()
      var storeDao = new storeReportDao()
      //   var storemanagerObject = new storemanagerDao()
      var storeResult = await storeDao.getstoreDetailsGetid(request)
      if (storeResult.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        var dueDay = storeResult.result[0].dueDay
        request.year = 2021

      Promise.all([
        storemanagerObject.getstoreDetailsDaobyid(request),
        storeDao.managerTotalOrdersCountDao(request),
        storeDao.managerTotalOrdersRevenueDao(request),
        this.getStoteBillingCycleService(request, dueDay, 0),
        this.getStoteBillingCycleService(request, dueDay, 1)
      ])
        .then(result => {

          orderObject.orderCount = result[1].result[0].count
          if(result[2].result[0].revenue){
            orderObject.totalAmount = result[2].result[0].revenue
          } else {
            orderObject.totalAmount = 0
          }
          
          resp.orderInfo = orderObject 

          var finalArray = result[3].concat(result[4]);

          resp.profile = result[0].data[0]
          resp.CurrentDue = finalArray
          // console.log(result[1])
          // resp.totalEarn = result[1].data[0].totalEarn
          // resp.totalOrders = result[2].data[0].totalOrders

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
      }
    } catch (e) {
      console.log(e)
      response.error = true
      response.message = 'Oops'
      callback(response)
    }
  }

  this.OrderTransactionLogService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var storeDao = new storeReportDao()
      request.queryType = 'TOTAL'
      var totalOrder = await storeDao.getOrderTransactionDao(request)
      if(totalOrder.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        if(totalOrder.data.length > 0){
          request.queryType = 'LIST'
          request.pageCount = 10
          
          var listOrder = await storeDao.getOrderTransactionDao(request)
          if(listOrder.error){
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
          } else {
            resp.orders = listOrder.data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          }

        } else {
          resp.orders = []
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
        }
      }
    } catch (e) {
      console.log(e)
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.managerNotificationService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var storeDao = new storeReportDao()
      request.queryType = 'TOTAL'
      var resultDelivery = await storeDao.getManagerNotificationDao(request)
      if (resultDelivery.error) {
        response.error = 'true'
        response.message = 'fetch failed'
      } else {
        request.queryType = 'LIST'
        request.pageCount = 10
        var result = await storeDao.getManagerNotificationDao(request)
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
