module.exports = function () {
  var storeDao = require('../../dao/admin/manageStore_dao')
  var async = require('async')

  this.getAllStoreService = async (request, callback) => {
    var response = {}
    try {
      var storeObject = new storeDao()
      var results = await storeObject.getAllStoreDao(request)
      if (results.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = false
        response.message = 'Success'
        response.data = results.data
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.storeListService = async (request, callback) => {
    var response = {}
    try {
      request.queryType = 'TOTAL'
      var storeObject = new storeDao()
      var totalUser = await storeObject.totalAllStoreDao(request)
      if (totalUser.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if (totalUser.data.length > 0) {
          request.queryType = 'LIST'
          request.pageCount = 20

          var result = await storeObject.totalAllStoreDao(request)
          if (result.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
            callback(response)
          } else {
            var total = totalUser.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }
            var storeList = result.data
            var length = storeList.length
            if (length > 0) {
              async.eachOfSeries(storeList, async function (item, index) {
                var categoryData = await storeObject.findStoreCategory(item.id)
                storeList[index].category = categoryData.data
                if (--length === 0) {
                  response.error = false
                  response.message = 'Success'
                  response.pages = total
                  response.storeList = storeList
                  callback(response)
                }
              })
            } else {
              response.error = false
              response.message = 'Success'
              response.pages = total
              response.storeList = result.data
              callback(response)
            }
          }
        } else {
          response.error = false
          response.message = 'Success'
          response.storeList = totalUser.data
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = true
      response.message = 'Oops'
      callback(response)
    }
  }

  this.addNewStoreService = async (request, callback) => {
    var response = {}
    try {
      var storeObject = new storeDao()
      var checkStore = await storeObject.checkStoreEmailDao(request)
      if (checkStore.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        if (checkStore.data.length == 0) {
          var val = Math.floor(1000 + Math.random() * 9000)
          request.storeID = '#Sto' + val
          var results = await storeObject.saveNewStoreDao(request)
          if (results.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
          } else {
            response.error = false
            response.message = 'Success'
          }
        } else {
          response.error = true
          response.message = 'Email Or Mobile number already exists'
        }
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.editNewStoreService = async (request, callback) => {
    var response = {}
    try {
      var storeObject = new storeDao()
      var checkStore = await storeObject.editStoreEmailMobileDao(request)
      if (checkStore.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        if (checkStore.data.length == 0) {
          var results = await storeObject.updateStoreProfileDao(request)
          if (results.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
          } else {
            response.error = false
            response.message = 'Success'
          }
        } else {
          response.error = true
          response.message = 'Email Or Mobile number already exists'
        }
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.deleteStoreService = async (request, callback) => {
    var response = {}
    try {
      var storeObject = new storeDao()
      var object = { id: request.id, isStoreDelete: 1 }
      var results = await storeObject.updateStoreProfileDao(object)
      if (results.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = false
        response.message = 'Success'
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.uploadStoreBillingCyleService = async (request, callback) => {
    var response = {}
    try {
      var storeObject = new storeDao()
      var results = await storeObject.uploadStoreBillingCyleDao(request)
      if (results.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        response.error = false
        response.message = 'Success'
      }
    } catch (e) {
      response.error = true
      response.message = 'Oops'
    }
    callback(response)
  }

  this.adminViewStoreDetailService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var storeObject = new storeDao()
      var checkStore = await storeObject.adminViewStoreDetailDao(request)
      if (checkStore.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        // console.log(request)
        var manager = await storeObject.getStoreManagerDao(request)
        var revenue = await this.getStoreRevenueService(request)
        var orders = await this.getStoreOrdergraphService(request)

        var storeDuePaid = await this.getStoteBillingCycleService(request, checkStore.data[0].dueDay, 1)

        var storeDueUnPaid = await this.getStoteBillingCycleService(request, checkStore.data[0].dueDay, 0)

        // console.log(storeDueUnPaid)
        // console.log(storeDuePaid)

        var finalArray = storeDueUnPaid.concat(storeDuePaid);

        // console.log(storeDueUnPaid)
        // var storeDue = await storeObject.getStoteDueAmountDao(request)
        var storeTotalOrders = await storeObject.storeOrdergraphCount('TOTAL', 2020, request.storeId)
        var overAllRevunue = await storeObject.overAllRevunueDao(request)
        if (manager.error || revenue.error || orders.error || storeTotalOrders.error || overAllRevunue.error) {
          response.error = 'true'
          response.message = 'Query Error'
        } else {
          resp.storeManager = manager.data
          resp.totalOrders = storeTotalOrders.data.length
          resp.overAllRevenue = overAllRevunue.data[0]
          resp.storeDetails = checkStore.data
          resp.revenueResult = revenue.data.revenue
          resp.orderResult = orders.data.orders
          resp.dueResult = finalArray
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.getStoreOrdergraphService = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      var resp = {}
      var orderObject = {}
      var year = []
      var orders = []
      var storeObject = new storeDao()
      var ordersResult = await storeObject.getStoreRevenueDao(data)
      if (ordersResult.error) {
        response.error = true
        resolve(response)
      } else {
        if (ordersResult.data.length > 0) {
          var orderList = ordersResult.data
          var length = orderList.length
          async.eachOfSeries(orderList, async function (item, index) {
            var orderCount = await storeObject.storeOrdergraphCount('YEAR',item.year, data.storeId)
            orders.push(orderCount.data.length)
            year.push(item.year)
            orderObject.year = year
            orderObject.orders = orders
            resp.orders = orderObject
            if (--length === 0) {
              response.error = false
              response.data = resp
              resolve(response)
            }
          })
        } else {
          orderObject.year = year
          orderObject.orders = orders
          resp.orders = orderObject
          response.error = false
          response.data = resp
          resolve(response)
        }
      }
      // resp.revenue = orderObject
      // response.error = false
      // response.data = resp
      // resolve(response)
    })
  }

  this.getStoteBillingCycleService = (data, dueDay, paid) => {
    return new Promise(async function (resolve) {
      var response = {}
      var year = data.year
      var monthArray = [
        {
          "from": 1,
          "to": 2,
          "fromYear": year,
          "toYear": year
        },
        {
          "from": 2,
          "to": 3,
          "fromYear": year,
          "toYear": year
        },
        {
          "from": 3,
          "to": 4,
          "fromYear": year,
          "toYear": year
        },
        {
          "from": 4,
          "to": 5,
          "fromYear": year,
          "toYear": year
        },
        {
          "from": 5,
          "to": 6,
          "fromYear": year,
          "toYear": year
        },
        {
          "from": 6,
          "to": 7,
          "fromYear": year,
          "toYear": year
        },
        {
          "from": 7,
          "to": 8,
          "fromYear": year,
          "toYear": year
        },
        {
          "from": 8,
          "to": 9,
          "fromYear": year,
          "toYear": year
        },
        {
          "from": 9,
          "to": 10,
          "fromYear": year,
          "toYear": year
        },
        {
          "from": 10,
          "to": 11,
          "fromYear": year,
          "toYear": year
        },
        {
          "from": 11,
          "to": 12,
          "fromYear": year,
          "toYear": year
        },
        // {
        //   "from": 12,
        //   "to": 1,
        //   "fromYear": year,
        //   "toYear": year + 1
        // }
      ]

      if(year == 2020){
        var object = {
          "from": 12,
          "to": 1,
          "fromYear": 2020,
          "toYear": 2021
        }

        monthArray.push(object)
      }
      var storeObject = new storeDao()
      var resultArray  =  []
      var length = monthArray.length
      monthArray.forEach(async function (item) {
        var from = item.fromYear+'-'+item.from+'-'+dueDay
        var to = item.toYear+'-'+item.to+'-'+dueDay
        data.fromDate = from
        data.toDate = to
        // console.log(data)
        // var paidamt =  await storeObject.getStoteDueAmountDao(data, 1)

        var unpaidDuess = await storeObject.getStoteDueAmountDao(data, paid)
        if(unpaidDuess.data.length > 0){
          var dataObject = unpaidDuess.data[0]
          dataObject.from = from
          dataObject.to = to
          // console.log(dataObject)
          resultArray.push(dataObject)
          // resultArray.push(data)
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

  this.getStoreRevenueService = (data) => {
    return new Promise(async function (resolve) {
      // console.log(data)
      var response = {}
      var resp = {}
      var revenueObject = {}
      var year = []
      var amount = []
      var storeObject = new storeDao()
      var revenue = await storeObject.getStoreRevenueDao(data)
      if (revenue.error) {
        response.error = true
      } else {
        if (revenue.data.length > 0) {
          var revenueList = revenue.data
          revenueList.map(item => {
            year.push(item.year)
            amount.push(item.amount)
          })
          revenueObject.year = year
          revenueObject.amount = amount
        } else {
          revenueObject.year = year
          revenueObject.amount = amount
        }
      }
      resp.revenue = revenueObject
      response.error = false
      response.data = resp
      resolve(response)
    })
  }

  this.adminviewStoreStockService = async (request, callback) => {
    try {
      var resp = {}
      var response = {}
      var storeObject = new storeDao()
      request.queryType = 'TOTAL'
      var storeRsult = await storeObject.getStoreStockProductDao(request)
      if (storeRsult.error) {
        response.error = 'true'
        response.message = 'Query Error'
      } else {
        request.queryType = 'LIST'
        request.pageCount = 10
        var stockRsult = await storeObject.getStoreStockProductDao(request)
        if(stockRsult.error){
          response.error = 'true'
          response.message = 'Query Error'
        } else {

          var total = storeRsult.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }
        resp.page = total
        resp.store = stockRsult.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.storOrderListService = async (request, callback) => {
    try {
      var resp = {}
      var response = {}
      var storeObject = new storeDao()
      request.queryType = 'TOTAL'
      var storeRsult = await storeObject.storOrderListDao(request)
      if (storeRsult.error) {
        response.error = 'true'
        response.message = 'Query Error'
      } else {
        request.queryType = 'LIST'
        request.pageCount = 10

        var storeOrder = await storeObject.storOrderListDao(request)
        if(storeOrder.error){
          response.error = 'true'
          response.message = 'Query Error'
        } else {
          var total = storeRsult.data.length / request.pageCount
          if (total % 1 !== 0) {
            total++
            total = Math.trunc(total)
          }
        resp.pages = total
        resp.store = storeOrder.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  this.adminviewStoreProductService = async (request, callback) => {
    try {
      var resp = {}
      var response = {}
      var storeObject = new storeDao()
      request.queryType = 'TOTAL'
      var storeResult = await storeObject.storProductListDao(request)
      if (storeResult.error) {
        response.error = 'true'
        response.message = 'Query Error'
        // callback(response)
      } else {

        request.queryType = 'LIST'
        request.pageCount = 10
        var productResult = await storeObject.storProductListDao(request)
        if(productResult.error){
          response.error = 'true'
          response.message = 'Query Error'
        } else {
          var total = storeResult.data.length / request.pageCount
          if (total % 1 !== 0) {
            total++
            total = Math.trunc(total)
          }
              resp.page = total
              resp.store = productResult.data
              response.error = 'false'
              response.message = 'Success'
              response.data = resp

        }

        // if (storeResult.data.length > 0) {
        //   var productList = storeResult.data
        //   var length = productList.length
        //   async.eachOfSeries(productList, async function (item, index) {
        //     var soldProduct = await storeObject.checkStoreSoldCount(item)
        //     productList[index].sold = soldProduct.data[0].sold

        //     if (--length === 0) {
        //       resp.store = productList
        //       response.error = 'false'
        //       response.message = 'Success'
        //       response.data = resp
        //       callback(response)
        //     }
        //   })
        // } else {
        //   resp.store = storeResult.data
        //   response.error = 'false'
        //   response.message = 'Success'
        //   response.data = resp
        //   callback(response)
        // }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'Oops'
    }
    callback(response)
  }

  // Store Manager
  this.addStoreManagerService = async (request, callback) => {
    var response = {}
    try {
      var storeObject = new storeDao()
      var checkStore = await storeObject.checkStoreManMobileDao(request)
      if (checkStore.error) {
        response.error = 'true'
        response.message = 'Query Error'
      } else {
        if (checkStore.data.length == 0) {
          var results = await storeObject.saveNewStoreManagerDao(request)
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

  this.editStoreManagerService = async (request, callback) => {
    var response = {}
    try {
      var storeObject = new storeDao()
      var checkStore = await storeObject.editcheckStoreManMobileDao(request)
      if (checkStore.error) {
        response.error = 'true'
        response.message = 'Query Error'
      } else {
        if (checkStore.data.length == 0) {
          var results = await storeObject.updateStoreManagerDetailsDao(request)
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

  this.deleteStoreManagerService = async (request, callback) => {
    var response = {}
    try {
      var storeObject = new storeDao()
      var object = { id: request.id, status: 'inactive' }  
      var results = await storeObject.updateStoreManagerDetailsDao(object)
      if (results.error) {
        response.error = 'true'
        response.message = 'Query Error'
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

  this.updateStoreActiveService = async (request, callback) => {
    var response = {}
    try {
      var storeObject = new storeDao()
      var object = { id: request.id, status: request.status }  
      var results = await storeObject.updateStoreProfileDao(object)
      if (results.error) {
        response.error = 'true'
        response.message = 'Query Error'
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

  this.getStoreManagerService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var storeObject = new storeDao()
      var checkStore = await storeObject.getStoreManagerDao(request)
      if (checkStore.error) {
        response.error = 'true'
        response.message = 'Query Error'
      } else {
        resp.storeManager = checkStore.data
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
