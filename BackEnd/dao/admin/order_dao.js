module.exports = function () {
  const db = require('../../db.js')

  this.getAdminOrderListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      if (data.queryType === 'LIST') {
        var pageNumber = data.pageNumber
        if (pageNumber == '0') {
          pageNumber = '0'
        } else {
          pageNumber = pageNumber - 1
        }
        var pageOffset = parseInt(pageNumber * data.pageCount)
      }

      db('orders')
        .select('orders.id', 'orderItems.orderId', 'orderIDs', 'orders.userId', 'customerID', 'firstName', 'lastName', 'mobileNumber', 'addressType', 'addressPinDetails', 'landmark', 'instruction', 'users_address.latitude', 'users_address.longitude', 'buildingName', 'addressId', 'timeId', 'timeText', 'paymentType.type as paytype', 'paymentId', 'orderStatus', 'orderProgress', 'totalAmount', 'discountAmount', 'grandTotal', 'couponDiscount', 'couponDiscountPer', 'totalQuantity', 'fastDelivery', db.raw('DATE_FORMAT(orderOn, "%d/%m/%Y") AS orderOn'), db.raw('DATE_FORMAT(deliveryOn, "%d/%m/%Y") AS deliveryOn'), db.raw('DATE_FORMAT(deliveryDate, "%d/%m/%Y") AS deliveryDate'))
        .leftJoin('orderItems', 'orders.id', '=', 'orderItems.orderId')
        .innerJoin('users', 'orders.userId', '=', 'users.id')
        .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
        .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
        .innerJoin('deliveryTime', 'orders.timeId', '=', 'deliveryTime.id')
        .groupBy('orderItems.orderId', 'orders.id')
        .orderBy('orders.id', 'desc')
        // .orderBy('orderId', 'desc')
        .modify(function (queryBuilder) {
          if (data.orderStatus !== 'ALL') {
            queryBuilder.where('orders.orderStatus', data.orderStatus)
          }
          if (data.queryType === 'LIST' && data.orderStatus === 'ALL') {
            queryBuilder.offset(pageOffset).limit(data.pageCount)
          }
          if (data.deliveryTime != '0') {
            queryBuilder.where('orders.timeId', data.deliveryTime)
          }
          if (data.storeStatus != 'NONE') {
            queryBuilder.where('orderItems.storeStatus', data.storeStatus)
          }
          if(data.orderDate){
            queryBuilder.whereRaw('DATE(orders.orderOn) = ?', [data.orderDate])
          }
        })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.storeOrderStatusDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('managerOrders')
        .select('orders.id', 'orderIDs', 'orders.userId', 'customerID', 'firstName', 'lastName', 'mobileNumber', 'addressType', 'addressPinDetails', 'landmark', 'instruction', 'users_address.latitude', 'users_address.longitude', 'buildingName', 'addressId', 'timeId', 'timeText', 'paymentType.type as paytype', 'paymentId', 'orderStatus', 'totalAmount', 'discountAmount', 'grandTotal', 'couponDiscount', 'couponDiscountPer', 'totalQuantity', 'fastDelivery', db.raw('DATE_FORMAT(orderOn, "%d/%m/%Y") AS orderOn'), db.raw('DATE_FORMAT(deliveryOn, "%d/%m/%Y") AS deliveryOn'), db.raw('DATE_FORMAT(deliveryDate, "%d/%m/%Y") AS deliveryDate'))
        .innerJoin('orders', 'managerOrders.orderId', '=', 'orders.id')
        .innerJoin('users', 'orders.userId', '=', 'users.id')
        .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
        .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
        .innerJoin('deliveryTime', 'orders.timeId', '=', 'deliveryTime.id')
        // .where('managerOrders.status', data.storeStatus)
        // .where('orders.orderStatus', data.orderStatus)
        .orderBy('orders.id', 'desc')
        .groupBy('managerOrders.orderId')
        .modify(function (queryBuilder) {
          if (data.orderStatus !== 'ALL') {
            queryBuilder.where('orders.orderStatus', data.orderStatus)
          }
          if (data.deliveryTime != '0') {
            queryBuilder.where('orders.timeId', data.deliveryTime)
          }

          if (data.storeStatus != 'NONE') {
            // console.log(data.storeStatus)
            queryBuilder.where('managerOrders.status', data.storeStatus)
          }
        })
        .then((result) => {
        // console.log(result)
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.adminViewOrderDetailsDao = (id) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
        .select('orders.id', 'orders.cancelReason', 'orderIDs', 'driver.firstName as driverName', 'drId', 'fromTime', 'toTime', 'driver.profilePic as driverImage', 'orders.userId', 'customerID', 'assignment_ID', 'users.firstName', 'users.lastName', 'users.mobileNumber', 'addressType', 'addressPinDetails', 'landmark', 'instruction', 'users_address.latitude', 'delievryNotes', 'users_address.longitude', 'buildingName', 'addressId', 'timeId', 'timeText', 'paymentType.type as paytype', 'paymentId', 'orderStatus', 'isPlaced', 'ordertax', 'acceptByStore', 'cancelledByUser', 'assignDriver', 'packedByStore', 'packedByDriver', 'onWayToDelivery', 'orderProgress', 'totalAmount', 'discountAmount', 'grandTotal', 'couponDiscount', 'fastDelievryCharge', 'couponDiscountPer', 'totalQuantity', 'fastDelivery', db.raw('DATE_FORMAT(orderOn, "%d/%m/%Y") AS orderOn'), db.raw('DATE_FORMAT(deliveryOn, "%d/%m/%Y") AS deliveryOn'), db.raw('DATE_FORMAT(deliveryDate, "%d/%m/%Y") AS deliveryDate'), db.raw('TIME_FORMAT(orderOn, "%r") AS ordertime'))
        .innerJoin('users', 'orders.userId', '=', 'users.id')
        .innerJoin('paymentType', 'orders.paymentId', '=', 'paymentType.id')
        .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
        .innerJoin('deliveryTime', 'orders.timeId', '=', 'deliveryTime.id')
        .leftJoin('driverOrders', 'orders.orderRouteId', '=', 'driverOrders.id')
        .leftJoin('driver', 'orders.as_driverId', '=', 'driver.id')
        .where('orders.id', id)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getShopDetailsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .select('orderItems.storeId', 'storeName', 'storeImage', 'store.storeID', 'storeStatus')
        .innerJoin('store', 'orderItems.storeId', '=', 'store.id')
        .where(data)
        .groupBy('orderItems.storeId', 'storeStatus')
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getStoreManagerOrderDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .select('storemanager.id', 'orderItems.storeId')
        .innerJoin('store', 'orderItems.storeId', '=', 'store.id')
        .innerJoin('storemanager', 'orderItems.storeId', '=', 'storemanager.id')
        .where(data)
        .groupBy('orderItems.storeId', 'storeStatus')
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.saveOrderAcceptNotificatoion = (data, manager) => {
    if(manager.length > 0){
      return Promise.all(manager.map((item) => {
        return db('notificationList')
            .insert({ stoteManagerId: item.id, storeId: item.storeId, userId: data.userId, orderId: data.orderId, ordIds: data.ordIds, notifyType: data.notifyType, notifyMessage: data.notifyMessage  })
      }))
    }
  }

  this.saveOrderAssignNotificatoion = (data, manager) => {
    var response = {}
    db('notificationList')
      .insert(data)
      .then((result) => {
        response.error = false
        response.data = result
      })
      .catch((error) => {
        console.log(error)
        response.error = true
      })
  }

  this.getStoreProductDao = (storeId, orderId) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orderItems')
        .select('orderItems.id', 'orderId', 'productCode', 'productCategoryName', 'categoryName', 'productSubCategoryName', 'orderItems.productId', 'orderItems.orderInstructions', 'quantity', 'productName', 'price', 'discount', 'supplyPrice', db.raw('supplyPrice / quantity as singlePrice'))
        // .leftJoin('product_image', 'orderItems.productId', '=', 'product_image.productId')
        .innerJoin('product', 'orderItems.productId', '=', 'product.id')
        .innerJoin('category', 'product.categoryId', '=', 'category.id')
        .innerJoin('product_category', 'product.productCategoryId', '=', 'product_category.id')
        .leftJoin('product_sub_category', 'product.productSubCategoryId', '=', 'product_sub_category.id')
        .where({ 'orderItems.storeId': storeId, 'orderItems.orderId': orderId })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.unAssignOrderListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
        .select('orders.id', 'orderIDs', 'fromTime', 'toTime', 'users_address.latitude', 'users_address.longitude', 'addressPinDetails')
        .innerJoin('deliveryTime', 'orders.timeId', '=', 'deliveryTime.id')
        .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
        .innerJoin('orderItems', 'orders.id', '=','orderItems.orderId')
        .where('driverAssign', 0)
        .where('orderStatus', 'ONGOING')
        .where('storeStatus', 'ONGOING')
        .orderBy('orders.id', 'desc')
        .groupBy('orders.id')
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.findDriverAssignOrderDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .select('orderItems.storeId',  'storeName', 'store.storeID', 'latitude', 'longitude', 'storeImage', db.raw('ST_Distance_Sphere(point(store.longitude, store.latitude), point(' + data.longitude + ', ' + data.latitude + ')) / 1000 AS distance'))
        .innerJoin('store', 'orderItems.storeId', '=', 'store.id')
        .whereIn('orderItems.orderId', data.orderId)
        .where('assignDR', 0)
        .groupBy('orderItems.storeId')
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.findDeliveryUsersDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
        // .select('orders.userId', 'orders.addressId', 'firstName', 'users_address.latitude', 'users_address.longitude', 'users_address.addressPinDetails', db.raw('ST_Distance_Sphere(point(users_address.longitude, users_address.latitude), point(' + data.longitude + ', ' + data.latitude + ')) / 1000 AS distance'))
        .select('orders.id', 'orders.id as orderId', 'orders.userId', 'firstName', 'users_address.latitude', 'users_address.longitude')
        .innerJoin('users', 'orders.userId', '=', 'users.id')
        .innerJoin('users_address', 'orders.addressId', '=', 'users_address.id')
        .whereIn('orders.id', data.orderId)
        .where('driverAssign', 0)
        // .groupBy('orders.userId')
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          // console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getUserStoreOrderDao = (id, orderId) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .select('orderItems.storeId', 'orderId',  'storeName', 'store.storeID', 'productId', 'quantity', 'price', 'discount', 'supplyPrice')
        .innerJoin('store', 'orderItems.storeId', '=', 'store.id')
        .where('orderItems.orderId', orderId)
        .where('u_id', id)
        .where('assignDR', 0)
        // .groupBy('orderItems.storeId')
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.checkAdminOrderItemsDao = (data) => {
    return new Promise(async function (resolve, reject) {
      var response = {}
      db('orderItems')
        .select('id', 'orderId', 'productId', 'price', 'supplyPrice')
        .where(data)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
      })
  }

  this.admindeleteOrderItemsDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orderItems')
        .where({ orderId: data.orderId, productId: data.productId })
        .del()
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.checkDeliveryOrdersDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverOrders')
        .where({ id: data.routeId })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.addnewAssignOrderDao = function (routeId, data) {
    var response = {}
    return new Promise(function (resolve) {
      return Promise.all(data.map((item) => {
        if(item.storeId){
          var stId = item.storeId
          var orId = null
          var usId = null
          var type = 'STORE'
          var r_latitude = item.latitude
          var r_longitude = item.longitude
        } else {
          var type = 'ORDER'
          var stId = null
          var orId = item.orderId
          var usId = item.userId
          var r_latitude = item.latitude
          var r_longitude = item.longitude
        } 
        return db.transaction(function (t) {
        return db('driverrRoute')
          .transacting(t)
          .insert({ routeId: routeId, sortOrder: 0, r_latitude: r_latitude, r_longitude: r_longitude, storeId: stId, orderId: orId, userId: usId , type: type })
          .then(function (res) {
            response.error = false
            resolve(response)
          })
          .then(t.commit)
          .catch(t.rollback)
          .then(function (result) {
            response.error = false
            resolve(response)
          })
          .catch(function (error) {
            response.error = true
            resolve(response)
          })

        })
      }))
    })
  }

  this.saveAssignOrderDao = function (data, route) {
    var response = {}
    return new Promise(function (resolve) {
      return db.transaction(function (t) {
        return db('driverOrders')
          .transacting(t)
          .insert(data)
          .then(function (response) {
            var i = 1
            return Promise.all(route.map((item) => {
              if(item.storeId){
                var stId = item.storeId
                var orId = null
                var usId = null
                var type = 'STORE'
                var r_latitude = item.latitude
                var r_longitude = item.longitude
              } else {
                var type = 'ORDER'
                var stId = null
                var orId = item.orderId
                var usId = item.userId
                var r_latitude = item.latitude
                var r_longitude = item.longitude
              }
              // console.log(i++)
              // var route = response[0]
              return db('driverrRoute')
              .transacting(t)
              .insert({ routeId: response[0], sortOrder: i++, r_latitude: r_latitude, r_longitude: r_longitude, storeId: stId, orderId: orId, userId: usId , type: type })
              .then(function (response) {
                // if(!item.storeId){
                //   // console.log(item.storeOrder)
                //      return Promise.all(item.storeOrder.map((stitem) => {
                //       return db('deliveryUsers')
                //       .transacting(t)
                //       .insert({ userId:usId, routeId: response[0], orderId: stitem.orderId, storeId: stitem.storeId  })
                //     }))
                // }
              })
            }))
          })
          .then(t.commit)
          .catch(t.rollback)
      })
      .then(function (result) {

        return db('driverOrders').select('id').orderBy('id', 'desc').limit(1)
        .then(function (intId) {
          // console.log(yy)
        // console.log(result)
        response.error = false
        response.routeId = intId[0].id
        resolve(response)
        })
      })
      .catch(function (error) {
        response.error = true
        resolve(response)
      })
    })
  }

  this.saveUserAssignOrderDao = function (route, routeData) {
      return Promise.all(routeData.map((item) => {
        if(!item.storeId){
          return Promise.all(item.storeOrder.map((stitem) => {
            // console.log(stitem)
           return db('deliveryUsers')
            .insert({ userId:item.userId, routeId: route, productId: stitem.productId,  orderId: stitem.orderId, storeId: stitem.storeId, quantity: stitem.quantity, price: stitem.price, supplyPrice: stitem.supplyPrice, discount: stitem.discount  })
          }))
        }
      }))
  }

  // this.saveAssignOrderDao = (data) => {
  //   return new Promise(async function (resolve) {
  //     var response = {}
  //     db('driverOrders')
  //       .insert(data)
  //       .then((result) => {
  //         response.error = false
  //         response.data = result
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //         response.error = true
  //       })
  //       .finally(() => {
  //         resolve(response)
  //       })
  //   })
  // }

  this.updateOrderDeliveryDao = (data, drId) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('orders')
        .where({ id: data })
        .update({driverAssign: 1, as_driverId:  drId })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.updateOrderItemsDeliveryDao = (routeData, drId, routeId) => {
    // return new Promise(async function (resolve) {
      var response = {}

      return Promise.all(routeData.map((item) => {
        if(!item.storeId){
          return Promise.all(item.storeOrder.map((stitem) => {
            // console.log(stitem)
           return db('orderItems')
            .where({ orderId:stitem.orderId }).update('assignDR', 1)
            .then(function (result) {
              // console.log(stitem)
              return db('orders')
              .where({ id:stitem.orderId }).update({driverAssign: 1, assignDriver:1, as_driverId:  drId, orderRouteId: routeId })
            })
          }))
        }
      }))
      console.log(data)
      // db('orderItems')
      //   .where({ orderId: data })
      //   .update({assignDR: 1 })
      //   .then((result) => {
      //     response.error = false
      //     response.data = result
      //   })
      //   .catch((error) => {
      //     response.error = true
      //   })
      //   .finally(() => {
      //     resolve(response)
      //   })
    // })
  }

  this.allAssignmentListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      if (data.queryType === 'LIST') {
        var pageNumber = data.pageNumber
        if (pageNumber == '0') {
          pageNumber = '0'
        } else {
          pageNumber = pageNumber - 1
        }
        var pageOffset = parseInt(pageNumber * data.pageCount)
      }
      db('driverOrders')
       .select('driverOrders.id','driverId', 'firstName', 'drId', 'assignment_ID', db.raw('DATE_FORMAT(assignDate, "%d/%m/%Y") AS assignDate'), db.raw('TIME_FORMAT(assignDate, "%r") AS time'))
       .innerJoin('driver', 'driverOrders.driverId', '=', 'driver.id')
       .modify(function (queryBuilder) {
        if (data.queryType === 'LIST') {
          queryBuilder.offset(pageOffset).limit(data.pageCount)
        }
         if(data.status == '1'){
           queryBuilder.where('isComplete', 1)
         }
         if(data.status == '2'){
          queryBuilder.where('isComplete', 0)
        }
       })
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.getRouteOrderDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('driverrRoute')
       .select('orderId', 'orderIDs', 'firstName', 'orderStatus' ,'customerID', 'driverrRoute.userId', 'type', 'storeName', 'sortOrder')
        .leftJoin('orders', 'driverrRoute.orderId', '=', 'orders.id')
        .leftJoin('users', 'driverrRoute.userId', '=', 'users.id')
        .leftJoin('store', 'driverrRoute.storeId', '=', 'store.id')
        .where('routeId', data.id)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  // Offers
  this.getAdminOfferListDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('offers')
        .select('offers.id', 'image', 'status', 'trustUser', 'title', 'description', 'couponCode', 'discount', 'minimumValue', 'offCategoryId', 'offProductId', 'count', db.raw('DATE_FORMAT(startDate, "%Y-%m-%d") AS startDate'), db.raw('DATE_FORMAT(endDate, "%Y-%m-%d") AS endDate'))
        .where({'offDelete': 0})
        .orderBy('offers.id', 'desc')
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.saveSendPushdao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('pushNotification')
        .insert(data)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.checkOffersDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('offers')
        .where('couponCode', data.couponCode)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.editcheckOffersDao = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('offers')
        .where('couponCode', data.couponCode)
        .where('id', '!=', data.id)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }


  this.saveNewOfferCode = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('offers')
        .insert(data)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  this.updateNewOfferCode = (data) => {
    return new Promise(async function (resolve) {
      var response = {}
      db('offers')
      .where('id', data.id)
        .update(data)
        .then((result) => {
          response.error = false
          response.data = result
        })
        .catch((error) => {
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

}
