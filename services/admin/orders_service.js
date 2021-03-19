module.exports = function () {
  var async = require('async')
  var categoryDao = require('../../dao/admin/category_dao')
  var productDao = require('../../dao/admin/product_dao')
  var userDao = require('../../dao/user_dao')
  var orderDao = require('../../dao/admin/order_dao')
  var StorderDao = require('../../dao/store_manager/order_dao')
  var async = require('async')
  var userproductDao = require('../../dao/products_dao')
  var notification = require('../../services/user_notification_service')

  this.orderListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      // console.log(request)
      var orderObject = new orderDao()
      request.queryType = 'TOTAL'
      var totalOrders = await orderObject.getAdminOrderListDao(request)
      if (totalOrders.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if (totalOrders.data.length > 0) {
          request.queryType = 'LIST'
          request.pageCount = 10
          var result = await orderObject.getAdminOrderListDao(request)
          if (result.error) {
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
            callback(response)
          } else {
            var orderList = result.data
            var length = orderList.length

            var total = totalOrders.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }
            if (length > 0) {
              async.eachOfSeries(orderList, async function (item, index) {
                var obj = { orderId: item.id }
                var storeList = await orderObject.getShopDetailsDao(obj)
                orderList[index].storeList = storeList.data

                if (--length === 0) {
                  resp.pages = total
                  resp.orders = result.data

                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              })
            } else {
              resp.pages = total
              resp.orders = result.data

              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          }
        } else {
          resp.pages = 0
          resp.orders = totalOrders.data

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

  this.calcelledOrderService = async (request, callback) => {
    try {
      // var resp = {}
      var response = {}
      var userproductObject = new userproductDao()
      var orderObject = new orderDao()
      var notificationObject = new notification()
      var update = { id : request.orderId, isApproved: request.status, orderStatus: request.status }

      var orderItem = { orderId : request.orderId, adminApprove: request.status }
      // console.log(request)
      // console.log(orderItem)
      var checkOrder =  await orderObject.adminViewOrderDetailsDao(request.orderId)
      // console.log(checkOrder)

      // if(request.status === 'ACCEPTED'){
      var saveNotification = {}
      var keyStat
      saveNotification.userId = checkOrder.data[0].userId
      saveNotification.orderId = checkOrder.data[0].id
      saveNotification.ordIds = checkOrder.data[0].orderIDs
      if(request.status === 'ACCEPTED'){
        saveNotification.notifyType = 'ADMIN_ACCEPT'
        keyStat = 'accept'
      } else {
        keyStat = 'reject'
        saveNotification.notifyType = 'ADMIN_REJECT'
      }
      saveNotification.notifyMessage = 'Admin '+keyStat+' your order '+ checkOrder.data[0].orderIDs

      var obj = { orderId: request.orderId }
      var storeList = await orderObject.getStoreManagerOrderDao(obj)
      if(!storeList.error){
        orderObject.saveOrderAcceptNotificatoion(saveNotification, storeList.data, '', () => {})
      }
    // }
      
      var order = await userproductObject.updateUserOrderStatus(update)
      var orderItemResult = await userproductObject.updateUserOrderItemsStatus(orderItem)
      if(orderItemResult.error || order.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        var notificationObj = {}
        notificationObj.orderId = request.orderId
        notificationObj.notifyType = 'ACCEPTORDER'
        notificationObject.sendOrderAcceptNotification(notificationObj, 'ORDERS', () => {})
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

  this.orderListStoreStatusService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var orderObject = new orderDao()
      var storeOrders = await orderObject.storeOrderStatusDao(request)
      if (storeOrders.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        resp.orders = storeOrders.data
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

  this.viewOrderDetailService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var obj = { orderId: request.orderId }
      var orderObject = new orderDao()
      var userDaoObject = new userDao()
      var viewOrder = await orderObject.adminViewOrderDetailsDao(request.orderId)
      var storeList = await orderObject.getShopDetailsDao(obj)
      if (storeList.error || viewOrder.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if (storeList.data.length > 0) {
          var orderList = storeList.data
          var length = orderList.length
          async.eachOfSeries(orderList, async function (item, index) {
            var storeProduct = await orderObject.getStoreProductDao(item.storeId, request.orderId)
            orderList[index].products = storeProduct.data

            var storeProductList = storeProduct.data
            var stlength = storeProductList.length
            async.eachOfSeries(storeProductList, async function (stitem, stindex) {
              storeProductList[stindex].productImage = ''
              storeProductList.singlePrice = stitem.supplyPrice % stitem.quantity
              var req = {
                productId: stitem.id
              }
              var productImagesDao = await userDaoObject.productImagesDao(req)
              if (productImagesDao.result.length > 0) {
                storeProductList[stindex].productImage = productImagesDao.result[0].productImage
              }
              if (--stlength === 0) {
                if (--length === 0) {
                  resp.orderDetails = orderList
                  resp.orderInfo = viewOrder.data[0]

                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              }
            })
          })
        } else {
          resp.orderDetails = storeList.data
          resp.orderInfo = viewOrder.data[0]
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

  this.adminDeleteItemService = async (request, callback) => {
    try {
      var response = {}
      var orderDaoObject = new StorderDao()
      var orderObject = new orderDao()

      var checkOrder = await orderObject.checkAdminOrderItemsDao(request)
      if(checkOrder.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        if(checkOrder.data.length > 0){
          request.price = checkOrder.data[0].supplyPrice
          // request.price = 1
          request.orderId = checkOrder.data[0].orderId
          await orderDaoObject.removeOrderPriceDao(request)  
          await orderObject.admindeleteOrderItemsDao(request)  
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

  this.unAssignOrderListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      // console.log(request)
      var orderObject = new orderDao()
      var totalOrders = await orderObject.unAssignOrderListDao(request)
      if (totalOrders.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if (totalOrders.data.length > 0) {
          var orderList = totalOrders.data
            var length = orderList.length
          async.eachOfSeries(orderList, async function (item, index) {
            var obj = { orderId: item.id }
            var storeList = await orderObject.getShopDetailsDao(obj)
            orderList[index].storeList = storeList.data

            if (--length === 0) {
              resp.orders = orderList

              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }
          })
        } else {
          resp.orders = totalOrders.data

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

  this.findDriverAssignOrderService = async (request, callback) => {
    var response = {}
    var resp = {}
    try {
      var ids = []
      var orderObject = new orderDao()
      var orderIds = JSON.parse(request.orderId)
      if(orderIds.length > 0){ 
        orderIds.forEach(async function (data) {
          ids.push(data.id)
        })
        request.orderId = ids
        var result = await orderObject.findDriverAssignOrderDao(request)
        var getUser = await this.getUsersGroupOrderList(request)
        // console.log(getUser)
        if (result.error || getUser.error) {
          response.error = 'true'
          response.message = 'OOPS DAO Exception'
          callback(response)
        } else {
          var finalData = result.data.concat(getUser.data)
          // console.log(finalData)
          resp.pickup = result.data.length
          resp.drop = getUser.data.length
          resp.total = finalData.length
          resp.store = result.data
          resp.distance = finalData
          

          response.error = 'false'
          response.message = 'Success'
          response.data = resp
          callback(response)
        }
      } else {
        resp.store = []
        resp.distance = []
        resp.total = 0
        resp.pickup = 0
        resp.drop = 0
        response.error = 'false'
        response.message = 'Success'
        response.data = resp
        callback(response)
      }
      
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'Oops'
      callback(response)
    }
  }

  this.getUsersGroupOrderList = function (request) {
    return new Promise(async function (resolve) {
      var response = {}
      var orderObject = new orderDao()
      var getUser = await orderObject.findDeliveryUsersDao(request)
      // console.log(getUser)
      if(getUser.error){
        response.error = true
        resolve(response)
      }
      var userList = getUser.data
      var length = userList.length
      async.eachOfSeries(userList, async function (item, index) {
        console.log(item)
        var getUserSt = await orderObject.getUserStoreOrderDao(item.userId, item.id)
        userList[index].storeOrder =  getUserSt.data
        if (--length === 0) {
            response.error = false
            response.data = userList
            resolve(response)
          }
      })
    })
  }

  this.adminassignOrderService = async (request, callback) => {
    try {
      var response = {}
      var orderObject = new orderDao()
      var notificationObject = new notification()
      var assignObject = {}
      var val = Math.floor(1000 + Math.random() * 9000)
      assignObject.driverId = request.driverId
      assignObject.longitude = request.longitude
      assignObject.latitude = request.latitude
      assignObject.orders = parseInt(request.pickup) + parseInt(request.drop)
      assignObject.pickupCount = request.pickup
      assignObject.dropCount = request.drop
      assignObject.assignDate = new Date()
      assignObject.assignment_ID = '#Ass'+val
      var routeData = JSON.parse(request.route)

      
      // this.saveOrderAssignNotificatoion(saveNotification, )
      // return;



      
      var result = await orderObject.saveAssignOrderDao(assignObject, routeData)
      if (result.error) {
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        await orderObject.updateOrderItemsDeliveryDao(routeData, request.driverId, result.routeId)
        await orderObject.saveUserAssignOrderDao(result.routeId, routeData)

        var notificationObj = {}
        notificationObj.assignId = result.routeId
        notificationObj.notifyType = 'ASSIGNORDER'
        notificationObj.driverId = request.driverId
        notificationObject.sendOrderAssignNotification(notificationObj, 'ORDERS', () => {})

        var saveNotification = {}
      saveNotification.driverId = request.driverId
      saveNotification.routeId = result.routeId
      saveNotification.assigId = assignObject.assignment_ID
      saveNotification.notifyType = 'ASSIGN_ORDER'
      saveNotification.notifyMessage = 'Admin assign you orders for delivery ' +assignObject.assignment_ID
      orderObject.saveOrderAssignNotificatoion(saveNotification, () => {})
        
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

  this.addAssignOrderOrderService = async (request, callback) => {
    try {
      var response = {}
      var orderObject = new orderDao()
      var result = await orderObject.checkDeliveryOrdersDao(request)
      if(result.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        if (result.data.length > 0 && result.data[0].isComplete === 0) {
          var routeData = JSON.parse(request.route)
          var resultData =   await orderObject.addnewAssignOrderDao(result.data[0].id, routeData)
          var assignOrder =  await orderObject.saveUserAssignOrderDao(result.data[0].id, routeData)
          if(resultData.error || assignOrder.error){
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
          } else {
            response.error = 'false'
            response.message = 'Success'
          }

        } else {
          response.error = 'true'
          response.message = 'Invalid route'
        }
      }
    } catch (e) {
      console.log(e)
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.adminGetAssignmentListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var orderObject = new orderDao()
      request.queryType = 'TOTAL'
      var assign = await orderObject.allAssignmentListDao(request)
      if(assign.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
        callback(response)
      } else {
        if(assign.data.length > 0){
          request.queryType = 'LIST'
          request.pageCount = 10

          var total = assign.data.length / request.pageCount
            if (total % 1 !== 0) {
              total++
              total = Math.trunc(total)
            }

          var assignResult = await orderObject.allAssignmentListDao(request)
          if(assignResult.error){
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
            callback(response)
          } else {

            if(assignResult.data.length > 0){

              var routeList = assignResult.data
              var length = routeList.length
              async.eachOfSeries(routeList, async function (item, index) {
                var orders =   await orderObject.getRouteOrderDao(item)
                routeList[index].orders = orders.data
                if(--length === 0){
                  resp.page = total
                  resp.assign = routeList
                  response.error = 'false'
                  response.message = 'Success'
                  response.data = resp
                  callback(response)
                }
              })
            } else {
              resp.page = total
              resp.assign = assignResult.data
              response.error = 'false'
              response.message = 'Success'
              response.data = resp
              callback(response)
            }

          }


        } else {
          resp.page = 0
          resp.assign = assign.data
          response.error = 'false'
          response.message = 'Success'
          response.data = resp
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


  // Offers
  this.adminOfferListService = async (request, callback) => {
    try {
      var response = {}
      var resp = {}
      var orderObject = new orderDao()
      var Offers = await orderObject.getAdminOfferListDao(request)
      if(Offers.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
      } else {
        resp.Offers = Offers.data
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

  this.addNewOfferService = async (request, callback) => {
    try {
      var response = {}
      // var resp = {}
      var orderObject = new orderDao()
      if(request.offCategoryId){
        request.offCategoryId = request.offCategoryId
      } else {
        request.offCategoryId = null
        request.offProductId = null
      }
      var checkOffers = await orderObject.checkOffersDao(request)
      if(checkOffers.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        if(checkOffers.data.length === 0){
          var save = await orderObject.saveNewOfferCode(request)
          if(save.error){
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
          } else {
            response.error = 'false'
            response.message = 'Success'
          }
        } else {
          response.error = 'true'
          response.message = 'Offer code already exists'
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.editOfferService = async (request, callback) => {
    try {
      var response = {}
      // var resp = {}
      var orderObject = new orderDao()
      if(request.offCategoryId){
        request.offCategoryId = request.offCategoryId
      } else {
        request.offCategoryId = null
        request.offProductId = null
      }
      var checkOffers = await orderObject.editcheckOffersDao(request)
      if(checkOffers.error){
        response.error = 'true'
        response.message = 'OOPS DAO Exception'
      } else {
        if(checkOffers.data.length === 0){
          var save = await orderObject.updateNewOfferCode(request)
          if(save.error){
            response.error = 'true'
            response.message = 'OOPS DAO Exception'
          } else {
            response.error = 'false'
            response.message = 'Success'
          }
        } else {
          response.error = 'true'
          response.message = 'Offer code already exists'
        }
      }
    } catch (e) {
      response.error = 'true'
      response.message = 'OOPS Service Error'
    }
    callback(response)
  }

  this.adminupdateOfferStatusService = async (request, callback) => {
    try {
      var response = {}
      var obj = {}
      var orderObject = new orderDao()
      obj.id = request.id
      if(request.type === 'status'){
        obj.status = request.status
      } else {
        obj.offDelete = 1
      }
      var Offers = await orderObject.updateNewOfferCode(obj)
      if(Offers.error){
        response.error = 'true'
        response.message = 'failed to retrive store details'
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
