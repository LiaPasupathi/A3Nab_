module.exports = function () {
  var async = require('async')
  var supportDao = require('../../dao/admin/support_dao')
  var orderDao = require('../../dao/admin/order_dao')

  this.searchOrderIdService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var supportObject = new supportDao()
      var orderid = '#Ord' + request.orderId
      var order = await supportObject.searchOrderIds(orderid)
      if (order.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        resp.orders = order.data
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

  this.addSupportService = async (request, callback) => {
    try {
      var response = {}
      var supportObject = new supportDao()
      var ObjectData = {}
      ObjectData.userId = request.userId
      ObjectData.orderId = request.orderId
      ObjectData.notes = request.notes
      ObjectData.supportID = '#ID'+Math.floor(1000 + Math.random() * 9000)
      ObjectData.status = 'PROGRESS'
      var order = await supportObject.saveSupportDao(ObjectData)
      if (order.error) {
        response.error = true
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

  this.getSupportListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var supportObject = new supportDao()
      var orderObject = new orderDao()
      request.queryType = 'TOTAL'
      var getSupport = await supportObject.getSupportListDao(request)
      var getSupportCount = await supportObject.supportStatusCountDao(request)
      // console.log(getSupportCount)
      if (getSupport.error || getSupportCount.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if (getSupport.data.length > 0) {
          request.queryType = 'LIST'
          request.pageCount = 20
          var supportResult = await supportObject.getSupportListDao(request)
          if (supportResult.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
          } else {
            var supportList = supportResult.data
            var length = supportList.length

            if (length > 0) {
              async.eachOfSeries(supportList, async function (item, index) {
                var obj = { orderId: item.orderId }
                var storeList = await orderObject.getShopDetailsDao(obj)
                supportList[index].store = storeList.data

                if (--length === 0) {
                  resp.support = supportList
                  resp.supportCount = getSupportCount.data[0]
                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              })
            } else {
              resp.support = supportResult.data
              resp.supportCount = getSupportCount.data[0]
              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          }
        } else {
          resp.support = getSupport.data
          resp.supportCount = getSupportCount.data[0]
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.updateSupportStatusService = async (request, callback) => {
    try {
      var response = {}
      var supportObject = new supportDao()
      var order = await supportObject.updateSupportStatusDao(request)
      if (order.error) {
        response.error = true
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

  this.getAppFeedbackListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var supportObject = new supportDao()
      request.queryType = 'TOTAL'
      var getSupport = await supportObject.getAppFeedbackListDao(request)
      if (getSupport.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if (getSupport.data.length > 0) {
          request.queryType = 'LIST'
          request.pageCount = 20
          var supportResult = await supportObject.getAppFeedbackListDao(request)
          if (supportResult.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
          } else {
            resp.support = supportResult.data
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
            callback(response)
          }
        } else {
          resp.support = getSupport.data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.getUserFeedbackListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var supportObject = new supportDao()
      var orderObject = new orderDao()
      request.queryType = 'TOTAL'
      var getSupport = await supportObject.getUserFeedbackListDao(request)
      if (getSupport.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if (getSupport.data.length > 0) {
          request.queryType = 'LIST'
          request.pageCount = 20
          var supportResult = await supportObject.getUserFeedbackListDao(request)
          if (supportResult.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
          } else {
            if(supportResult.data.length > 0){
              var supportList = supportResult.data
              var length = supportList.length
  
              // if (length > 0) {
                async.eachOfSeries(supportList, async function (item, index) {
                  var obj = { orderId: item.orderId }
                  var storeList = await orderObject.getShopDetailsDao(obj)
                  supportList[index].store = storeList.data
  
                  if (--length === 0) {
                    resp.support = supportList
                    // resp.supportCount = getSupportCount.data[0]
                    response.error = 'false'
                    response.message = 'Success'
                    response.data = resp
                    callback(response)
                  }
                })
              // }

            } else {
              resp.support = supportResult.data
              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          }
        } else {
          resp.support = getSupport.data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.getDriverFeedbackListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var supportObject = new supportDao()
      var orderObject = new orderDao()
      request.queryType = 'TOTAL'
      var getSupport = await supportObject.getDriverFeedbackListDao(request)
      if (getSupport.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if (getSupport.data.length > 0) {
          request.queryType = 'LIST'
          request.pageCount = 20
          var supportResult = await supportObject.getDriverFeedbackListDao(request)
          if (supportResult.error) {
            response.error = true
            response.message = 'OOPS DAO Exception'
          } else {
            if(supportResult.data.length > 0){
              var supportList = supportResult.data
              var length = supportList.length
  
              // if (length > 0) {
                async.eachOfSeries(supportList, async function (item, index) {
                  var obj = { orderId: item.orderId }
                  var storeList = await orderObject.getShopDetailsDao(obj)
                  supportList[index].store = storeList.data
  
                  if (--length === 0) {
                    resp.feedback = supportList
                    // resp.supportCount = getSupportCount.data[0]
                    response.error = 'false'
                    response.message = 'Success'
                    response.data = resp
                    callback(response)
                  }
                })
              // }

            } else {
              resp.feedback = supportResult.data
              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          }
        } else {
          resp.feedback = getSupport.data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.getunavailableProductService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var supportObject = new supportDao()
      request.queryType = 'TOTAL'
      var getSupport = await supportObject.getunavailableProductDao(request)
      if (getSupport.error) {
        response.error = true
        response.message = 'OOPS DAO Exception'
      } else {
        request.queryType = 'LIST'
        request.pageCount = 10

        var resultSupport = await supportObject.getunavailableProductDao(request)
        if(resultSupport.error){
          response.error = true
          response.message = 'OOPS DAO Exception'
        } else {
          var total = getSupport.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }

          resp.page = total  
          resp.unavailable = resultSupport.data
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

}
