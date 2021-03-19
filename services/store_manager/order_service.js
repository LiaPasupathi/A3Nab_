
module.exports = function () {
  var orderDao = require('../../dao/store_manager/order_dao')
  var cartDao = require('../../dao/store_manager/cart_dao')
  var productDao = require('../../dao/products_dao')
  var userDao = require('../../dao/user_dao')
  var async = require('async')
  var notification = require('../../services/user_notification_service')
  require('../../utils/common.js')()
  require('../../utils/error.js')()

  this.managerOngoingOrderListService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      // console.log(request)
      var orderDaoObject = new orderDao()
      request.queryType = 'TOTAL'
      request.con = [0]
      var orders = await orderDaoObject.managerOrdersDao(request)
      if (orders.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if (orders.data.length > 0) {
          request.pageCount = 10
          request.queryType = 'LIST'
          var result = await orderDaoObject.managerOrdersDao(request)
          if (result.error) {
            response.error = 'true'
            response.message = 'failed to retrive store details'
          } else {
            var total = orders.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }
            resp.pages = total
            resp.orderList = result.data
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
          }
        } else {
          resp.pages = 0
          resp.orderList = []
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

  this.managerOrderListService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var orderDaoObject = new orderDao()
      request.queryType = 'TOTAL'
      if(request.type == 'PICKUP'){
        request.con = ['PICKUP', 'ACCEPTED', 'ONGOING']
      } else {
        request.con = ['COMPLETED', 'REJECTED']
      }
      var orders = await orderDaoObject.managerOrderListDao(request)
      if (orders.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if (orders.data.length > 0) {
          request.pageCount = 10
          request.queryType = 'LIST'
          var result = await orderDaoObject.managerOrderListDao(request)
          if (result.error) {
            response.error = 'true'
            response.message = 'failed to retrive store details'
          } else {
            var total = orders.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }
            resp.pages = total
            resp.orderList = result.data
            response.error = 'false'
            response.message = 'Success'
            response.data = resp
          }
        } else {
          resp.pages = 0
          resp.orderList = []
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

  this.managerUpdateOrderStatusService = async (request, callback) => {
    var response = {}
    try {
      var orderDaoObject = new orderDao()
      var updateObject = { storeId: request.storeId, orderId: request.orderId, storeStatus: request.status }

      var managerObject = { storeId: request.storeId, orderId: request.orderId, managerId: request.id, status: request.status }
      var objectDao = {}
      var notificationObj = {}
      if (request.status == 'ACCEPTED') {
        var sentType = 2
        notificationObj.notifyType = 'ACCEPTORDER'
        managerObject.acceptDate = new Date()
        objectDao.orderProgress = 'ACCEPTSTORE'
        objectDao.acceptByStore = 1
      } else if(request.status == 'REJECTED') {
        var sentType = 6
        managerObject.rejectDate = new Date()
        objectDao.orderProgress = 'REJECTSTORE'
        notificationObj.notifyType = 'REJECTSTORE'
      } else if(request.status == 'ONGOING') {
        var sentType = 3
        notificationObj.notifyType = 'READYTOPICKUP'
        managerObject.pickupDate = new Date()
      }

      var checkOrder =  await orderDaoObject.checkOrderID(request)
      var notificationObject = new notification()

      notificationObj.userId = checkOrder.data[0].userId
      // notificationObj.notifyType = 'ACCEPTORDER'
      notificationObj.orderId = request.orderId
      // console.log(sentType)

      // notificationObject.sendOrderNotification(notificationObj, 'ORDERS', sentType, () => {})

      // console.log(notificationObj)
      // return;

      objectDao.id = request.orderId
      objectDao.orderStatus = request.status
      await orderDaoObject.replaceOrderDao(objectDao)

      var checkStatus = await orderDaoObject.checkOrderStatusDao(updateObject)
      var updateOrderItems = await orderDaoObject.updateOrderItemsDao(updateObject)
      if (checkStatus.error || updateOrderItems.error) {
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if (checkStatus.data.length > 0) {
          var update = await orderDaoObject.updateManagerOrderStatus(managerObject)
          if (update.error) {
            response.error = 'true'
            response.message = 'failed to retrive store details'
          } else {
            notificationObject.sendOrderNotification(notificationObj, 'ORDERS', sentType, () => {})
            response.error = 'false'
            response.message = 'Update order status successfully'
          }
        } else {
          await orderDaoObject.addManagerOrderStatus(managerObject)
          var updateStatus = await orderDaoObject.updateOrderStatusDao(updateObject)
          if (updateStatus.error) {
            response.error = 'true'
            response.message = 'failed to retrive store details'
          } else {
            notificationObject.sendOrderNotification(notificationObj, 'ORDERS', sentType, () => {})
            response.error = 'false'
            response.message = 'Update order status successfully'
          }
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.managerViewOrderService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var orderDaoObject = new orderDao()
      // console.log(request)
      var managerOrders = await this.managerOrdersDao(request)
      if(managerOrders.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        var checkOrderID = await orderDaoObject.checkOrderID(request)
        if(checkOrderID.error){
          response.error = 'true'
          response.message = 'failed to retrive store details'
        } else {
          var orderDetails = checkOrderID.data[0]
          // orderDetails.tax = 20
          resp.totalAmount = managerOrders.orderAmount
          resp.tax = checkOrderID.data[0].ordertax
          resp.ordersInfo = orderDetails
          resp.orderItems = managerOrders.orderItems
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.managerOrdersDao = function (data) {
    return new Promise(async function (resolve) {
      var orderDaoObject = new orderDao()
      var userDaoObject = new userDao()
      var response = {}
      var orderItems = await orderDaoObject.getManagerOrderItems(data)
      if(orderItems.error){
        response.error = true
        resolve(response)
      } else {
        var orderValue = await orderDaoObject.managerOrderValue(data)
        if(orderValue.error){
          response.error = true
          resolve(response)
        } else {
          var itemsList = orderItems.data
          var length = itemsList.length
          async.eachOfSeries(itemsList, async function (item, index) {
            var req = {
              productId: item.productId
            }
            var productImagesDao = await userDaoObject.productImagesDao(req)
            itemsList[index].productImage = productImagesDao.result[0].productImage
            if (--length === 0) {
              response.error = false
              response.orderItems = itemsList
              response.orderAmount = orderValue.data[0].totalvalue
              resolve(response)
            }
          })
        }
      }
    })
  }

  this.deleteOrderItemService = async (request, callback) => {
    try {
      var response = {}
      var orderDaoObject = new orderDao()
      var checkOrder = await orderDaoObject.checkOrderItemsDao(request)
      if(checkOrder.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if(checkOrder.data.length > 0){
          request.price = checkOrder.data[0].supplyPrice
          // request.price = 1
          request.orderId = checkOrder.data[0].orderId
          await orderDaoObject.removeOrderPriceDao(request)  
          await orderDaoObject.deleteOrderItemsDao(request)  
          response.error = 'false'
          response.message = 'Success' 
        } else {
          response.error = 'true'
          response.message = 'Invalid Id' 
        }

      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.replaceOrderItemService = async (request, callback) => {
    try {
      var response = {}
      var orderDaoObject = new orderDao()
      var productDaoObject = new productDao()
      var checkOrderItems = await orderDaoObject.checkReplaceOrderItemsDao(request.id)
      if(checkOrderItems.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        var orderPrice = checkOrderItems.data[0].supplyPrice
        request.orderId = checkOrderItems.data[0].orderId
        var orderResult = await productDaoObject.checkUserOrderDao(request)
        if(orderResult.error){
          response.error = 'true'
          response.message = 'failed to retrive store details'
        } else {
          var decPrice = orderResult.data[0].grandTotal - orderPrice
          var newProduct = await orderDaoObject.viewstoreProductDao(request)
          var newPrice = newProduct.data[0].productPrice
          var qty = newPrice * request.quantity

          request.price = newPrice
          request.supplyPrice = decPrice + qty

          var orderObject = {}
          orderObject.grandTotal = request.supplyPrice
          orderObject.id = request.orderId

          var updateOrder = await orderDaoObject.replaceOrderDao(orderObject)
          request.discount = 0
          var updateOrderItems = await orderDaoObject.replaceOrderItemsDao(request)
          if(updateOrder.error || updateOrderItems.error){
            response.error = 'true'
            response.message = 'failed to retrive store details'
          } else {
            response.error = 'false'
            response.message = 'Success'
          }
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.getStoreVendorListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var orderDaoObject = new orderDao()
      var vendorList = await orderDaoObject.getStoreVendorDao(request)
      if(vendorList.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        resp.vendor = vendorList.data
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.addStoreVendorService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var object = { storeId: request.storeId, vendorName: request.vendorName }
      var orderDaoObject = new orderDao()
      var vendorList = await orderDaoObject.addNewVendorDao(object)
      if(vendorList.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        resp.id = vendorList.data[0]
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }
}
